from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index


class NewsIndexPage(Page):
    """Индекс новостей (список)."""
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro'),
    ]

    subpage_types = ['news.NewsPage']
    parent_page_types = ['home.HomePage']

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context['news_pages'] = NewsPage.objects.live().child_of(self).order_by('-first_published_at')
        return context


class NewsPage(Page):
    """Одна новость."""
    date = models.DateField('Дата публикации')
    intro = models.CharField(max_length=500)
    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('intro'),
        FieldPanel('body'),
    ]

    parent_page_types = ['news.NewsIndexPage']
    subpage_types = []

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]
