"""
Production settings — Path A (Vercel serverless) или отдельный хостинг CMS.
"""
from .base import *

DEBUG = False
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '.vercel.app').split(',')

# Security
SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT', 'True').lower() in ('1', 'true', 'yes')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Static/Media: Whitenoise для static; MEDIA — внешнее хранилище
# Для MEDIA на S3/R2 раскомментируйте в base.py блок AWS_*
# STATIC_ROOT и MEDIA_ROOT должны быть настроены под Vercel (build output)
