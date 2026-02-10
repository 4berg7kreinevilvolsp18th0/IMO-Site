"""
Path A: Vercel serverless entrypoint.
Роутинг в vercel.json направляет сюда; Mangum оборачивает Django ASGI.
"""
import os
import sys

# Корень backend для импорта mysite
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings.prod')

from django.core.asgi import get_asgi_application
from mangum import Mangum

application = get_asgi_application()
handler = Mangum(application, lifespan="off")
