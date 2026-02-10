"""
Development settings — локальная разработка.
"""
from .base import *

DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '[::1]']

# SQLite по умолчанию (уже в base при отсутствии DATABASE_URL)
# Для Postgres локально: задайте DATABASE_URL в .env
