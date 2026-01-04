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
