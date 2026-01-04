"""
Redis caching module for backend
"""
import json
import os
from typing import Optional, Any, Callable
from functools import wraps
import redis
from redis.exceptions import RedisError
import logging

logger = logging.getLogger(__name__)

# Redis client singleton
_redis_client: Optional[redis.Redis] = None


def get_redis_client() -> Optional[redis.Redis]:
    """Get or create Redis client"""
    global _redis_client
    
    if _redis_client:
        return _redis_client
    
    redis_url = os.getenv("REDIS_URL")
    if not redis_url:
        logger.warning("⚠️ REDIS_URL not set, caching disabled")
        return None
    
    try:
        _redis_client = redis.from_url(
            redis_url,
            decode_responses=True,
            socket_connect_timeout=2,
            socket_timeout=2,
            retry_on_timeout=True,
            health_check_interval=30
        )
        # Test connection
        _redis_client.ping()
        logger.info("✅ Redis connected for caching")
        return _redis_client
    except (RedisError, Exception) as e:
        logger.warning(f"⚠️ Redis connection failed: {e}, caching disabled")
        return None


def cache_key(prefix: str, *args, **kwargs) -> str:
    """Generate cache key from prefix and arguments"""
    key_parts = [prefix]
    
    # Add args
    for arg in args:
        if arg is not None:
            key_parts.append(str(arg))
    
    # Add kwargs (sorted for consistency)
    for k, v in sorted(kwargs.items()):
        if v is not None:
            key_parts.append(f"{k}:{v}")
    
    return ":".join(key_parts)


def get_cache(key: str) -> Optional[Any]:
    """Get value from cache"""
    client = get_redis_client()
    if not client:
        return None
    
    try:
        value = client.get(key)
        if value:
            return json.loads(value)
        return None
    except (RedisError, json.JSONDecodeError) as e:
        logger.error(f"Cache get error for key {key}: {e}")
        return None


def set_cache(key: str, value: Any, ttl: int = 3600) -> bool:
    """Set value in cache with TTL (default 1 hour)"""
    client = get_redis_client()
    if not client:
        return False
    
    try:
        serialized = json.dumps(value, default=str)
        client.setex(key, ttl, serialized)
        return True
    except (RedisError, TypeError) as e:
        logger.error(f"Cache set error for key {key}: {e}")
        return False


def delete_cache(key: str) -> bool:
    """Delete key from cache"""
    client = get_redis_client()
    if not client:
        return False
    
    try:
        client.delete(key)
        return True
    except RedisError as e:
        logger.error(f"Cache delete error for key {key}: {e}")
        return False


def invalidate_pattern(pattern: str) -> int:
    """Invalidate all keys matching pattern"""
    client = get_redis_client()
    if not client:
        return 0
    
    try:
        keys = client.keys(pattern)
        if keys:
            return client.delete(*keys)
        return 0
    except RedisError as e:
        logger.error(f"Cache invalidate error for pattern {pattern}: {e}")
        return 0


def cached(prefix: str, ttl: int = 3600, key_func: Optional[Callable] = None):
    """
    Decorator for caching function results
    
    Args:
        prefix: Cache key prefix
        ttl: Time to live in seconds (default 1 hour)
        key_func: Optional function to generate cache key from function arguments
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            # Generate cache key
            if key_func:
                cache_key_str = key_func(*args, **kwargs)
            else:
                cache_key_str = cache_key(prefix, *args, **kwargs)
            
            # Try to get from cache
            cached_value = get_cache(cache_key_str)
            if cached_value is not None:
                logger.debug(f"Cache hit: {cache_key_str}")
                return cached_value
            
            # Call function
            logger.debug(f"Cache miss: {cache_key_str}")
            result = await func(*args, **kwargs)
            
            # Store in cache
            if result is not None:
                set_cache(cache_key_str, result, ttl)
            
            return result
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            # Generate cache key
            if key_func:
                cache_key_str = key_func(*args, **kwargs)
            else:
                cache_key_str = cache_key(prefix, *args, **kwargs)
            
            # Try to get from cache
            cached_value = get_cache(cache_key_str)
            if cached_value is not None:
                logger.debug(f"Cache hit: {cache_key_str}")
                return cached_value
            
            # Call function
            logger.debug(f"Cache miss: {cache_key_str}")
            result = func(*args, **kwargs)
            
            # Store in cache
            if result is not None:
                set_cache(cache_key_str, result, ttl)
            
            return result
        
        # Return appropriate wrapper based on function type
        import asyncio
        if asyncio.iscoroutinefunction(func):
            return async_wrapper
        return sync_wrapper
    
    return decorator


# Cache key prefixes
CACHE_PREFIX_DIRECTIONS = "directions"
CACHE_PREFIX_DIRECTION = "direction"
CACHE_PREFIX_CONTENT = "content"
CACHE_PREFIX_STATS = "stats"
CACHE_PREFIX_APPEALS_STATS = "appeals_stats"


def cache_directions_key(active_only: bool = True) -> str:
    """Generate cache key for directions list"""
    return cache_key(CACHE_PREFIX_DIRECTIONS, active_only=active_only)


def cache_direction_key(direction_id: Optional[str] = None, slug: Optional[str] = None) -> str:
    """Generate cache key for single direction"""
    if direction_id:
        return cache_key(CACHE_PREFIX_DIRECTION, id=direction_id)
    if slug:
        return cache_key(CACHE_PREFIX_DIRECTION, slug=slug)
    raise ValueError("Either direction_id or slug must be provided")


def cache_content_key(content_id: Optional[str] = None, slug: Optional[str] = None) -> str:
    """Generate cache key for content"""
    if content_id:
        return cache_key(CACHE_PREFIX_CONTENT, id=content_id)
    if slug:
        return cache_key(CACHE_PREFIX_CONTENT, slug=slug)
    raise ValueError("Either content_id or slug must be provided")


def cache_stats_key(direction_id: Optional[str] = None) -> str:
    """Generate cache key for statistics"""
    return cache_key(CACHE_PREFIX_STATS, direction_id=direction_id)


def invalidate_directions_cache():
    """Invalidate all directions cache"""
    return invalidate_pattern(f"{CACHE_PREFIX_DIRECTIONS}*")


def invalidate_direction_cache(direction_id: Optional[str] = None, slug: Optional[str] = None):
    """Invalidate specific direction cache"""
    if direction_id:
        delete_cache(cache_direction_key(direction_id=direction_id))
    if slug:
        delete_cache(cache_direction_key(slug=slug))
    # Also invalidate list cache
    invalidate_directions_cache()


def invalidate_content_cache(content_id: Optional[str] = None, slug: Optional[str] = None):
    """Invalidate content cache"""
    if content_id:
        delete_cache(cache_content_key(content_id=content_id))
    if slug:
        delete_cache(cache_content_key(slug=slug))
    # Invalidate all content cache
    invalidate_pattern(f"{CACHE_PREFIX_CONTENT}*")


def invalidate_stats_cache(direction_id: Optional[str] = None):
    """Invalidate statistics cache"""
    if direction_id:
        delete_cache(cache_stats_key(direction_id=direction_id))
    else:
        invalidate_pattern(f"{CACHE_PREFIX_STATS}*")

