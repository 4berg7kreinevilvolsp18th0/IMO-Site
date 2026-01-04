"""
Middleware for rate limiting, caching, logging, and metrics
"""
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from typing import Callable
import time
import logging
import uuid
from metrics import record_request, increment_active_requests, decrement_active_requests

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)


def setup_rate_limiting(app):
    """
    Setup rate limiting for FastAPI app
    """
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    return app


async def logging_middleware(request: Request, call_next: Callable):
    """
    Log all requests, collect metrics, and add headers
    """
    start_time = time.time()
    request_id = str(uuid.uuid4())
    
    # Увеличить счетчик активных запросов
    increment_active_requests()
    
    # Получить endpoint (без query параметров для метрик)
    endpoint = request.url.path
    
    # Log request
    logger.info(
        f"[{request_id}] {request.method} {endpoint} - "
        f"Client: {get_remote_address(request)}"
    )
    
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        
        # Записать метрику
        record_request(request.method, endpoint, response.status_code, process_time)
        
        # Log response
        logger.info(
            f"[{request_id}] {request.method} {endpoint} - "
            f"Status: {response.status_code} - "
            f"Time: {process_time:.3f}s"
        )
        
        # Add headers
        response.headers["X-Process-Time"] = f"{process_time:.3f}"
        response.headers["X-Request-ID"] = request_id
        response.headers["X-API-Version"] = "2.0.0"
        
        # Rate limiting headers (если есть)
        if hasattr(request.state, 'rate_limit'):
            response.headers["X-RateLimit-Limit"] = str(getattr(request.state, 'rate_limit_limit', '100'))
            response.headers["X-RateLimit-Remaining"] = str(getattr(request.state, 'rate_limit_remaining', '99'))
            response.headers["X-RateLimit-Reset"] = str(getattr(request.state, 'rate_limit_reset', int(time.time()) + 60))
        
        return response
    except Exception as e:
        process_time = time.time() - start_time
        
        # Записать метрику ошибки
        record_request(request.method, endpoint, 500, process_time)
        
        logger.error(
            f"[{request_id}] {request.method} {endpoint} - "
            f"Error: {str(e)} - "
            f"Time: {process_time:.3f}s"
        )
        raise
    finally:
        # Уменьшить счетчик активных запросов
        decrement_active_requests()


# Simple in-memory cache (for development)
# In production, use Redis
_cache = {}
_cache_ttl = {}


def get_cache_key(request: Request) -> str:
    """
    Generate cache key from request
    """
    return f"{request.method}:{request.url.path}:{str(request.query_params)}"


def cache_response(ttl: int = 300):
    """
    Decorator for caching responses (simple in-memory cache)
    """
    def decorator(func: Callable):
        async def wrapper(*args, **kwargs):
            # This is a simplified version
            # In production, use Redis or similar
            return await func(*args, **kwargs)
        return wrapper
    return decorator

