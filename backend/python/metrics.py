"""
Метрики для мониторинга API
"""
from typing import Dict
import time
from collections import defaultdict
from datetime import datetime, timedelta

# Простые счетчики (в production использовать Prometheus)
_request_count = defaultdict(int)
_request_duration = defaultdict(list)
_error_count = defaultdict(int)
_active_requests = 0

# Временные окна для метрик (последние 5 минут)
_metrics_window = timedelta(minutes=5)
_metrics_data = []


def record_request(method: str, endpoint: str, status_code: int, duration: float):
    """Записать метрику запроса"""
    key = f"{method} {endpoint}"
    _request_count[key] += 1
    
    if status_code >= 400:
        _error_count[key] += 1
    
    _request_duration[key].append(duration)
    
    # Хранить только последние 1000 записей для каждого endpoint
    if len(_request_duration[key]) > 1000:
        _request_duration[key] = _request_duration[key][-1000:]
    
    # Добавить в временное окно
    _metrics_data.append({
        "timestamp": datetime.utcnow(),
        "method": method,
        "endpoint": endpoint,
        "status_code": status_code,
        "duration": duration
    })
    
    # Очистить старые данные
    cutoff = datetime.utcnow() - _metrics_window
    _metrics_data[:] = [m for m in _metrics_data if m["timestamp"] > cutoff]


def get_metrics() -> Dict:
    """Получить все метрики"""
    now = datetime.utcnow()
    cutoff = now - _metrics_window
    
    # Фильтровать данные за последние 5 минут
    recent_data = [m for m in _metrics_data if m["timestamp"] > cutoff]
    
    # Подсчитать метрики
    total_requests = len(recent_data)
    total_errors = sum(1 for m in recent_data if m["status_code"] >= 400)
    
    # Средняя длительность запросов
    avg_duration = {}
    for key in _request_duration:
        if _request_duration[key]:
            avg_duration[key] = sum(_request_duration[key]) / len(_request_duration[key])
    
    # Топ endpoints
    endpoint_stats = {}
    for m in recent_data:
        key = f"{m['method']} {m['endpoint']}"
        if key not in endpoint_stats:
            endpoint_stats[key] = {
                "count": 0,
                "errors": 0,
                "avg_duration": 0
            }
        endpoint_stats[key]["count"] += 1
        if m["status_code"] >= 400:
            endpoint_stats[key]["errors"] += 1
    
    # Вычислить среднюю длительность
    for key in endpoint_stats:
        if key in avg_duration:
            endpoint_stats[key]["avg_duration"] = round(avg_duration[key] * 1000, 2)  # в мс
    
    # Сортировать по количеству запросов
    top_endpoints = sorted(
        endpoint_stats.items(),
        key=lambda x: x[1]["count"],
        reverse=True
    )[:10]
    
    return {
        "timestamp": now.isoformat(),
        "window_minutes": 5,
        "total_requests": total_requests,
        "total_errors": total_errors,
        "error_rate": round(total_errors / total_requests * 100, 2) if total_requests > 0 else 0,
        "top_endpoints": {
            key: stats for key, stats in top_endpoints
        },
        "active_requests": _active_requests
    }


def increment_active_requests():
    """Увеличить счетчик активных запросов"""
    global _active_requests
    _active_requests += 1


def decrement_active_requests():
    """Уменьшить счетчик активных запросов"""
    global _active_requests
    _active_requests = max(0, _active_requests - 1)

