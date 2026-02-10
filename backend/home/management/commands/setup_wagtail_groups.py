"""
Создаёт группы Wagtail для наследников:
  • Editors — правка контента (страницы, новости, изображения).
  • Admins — полный доступ (дополнительно суперправа можно выдать вручную в админке).

Запуск: python manage.py setup_wagtail_groups
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from wagtail.models import Page, GroupPagePermission


class Command(BaseCommand):
    help = 'Создаёт группы Editors и Admins с правами для Wagtail.'

    def handle(self, *args, **options):
        editors, _ = Group.objects.get_or_create(name='Editors')
        admins, _ = Group.objects.get_or_create(name='Admins')

        root = Page.get_first_root_node()
        if not root:
            self.stdout.write(self.style.WARNING('Корневая страница не найдена. Сначала выполните: python manage.py migrate'))
            return

        # Wagtail 5.x: GroupPagePermission с permission (FK на Permission)
        try:
            page_ct = ContentType.objects.get(app_label='wagtailcore', model='page')
            for codename in ['add_page', 'change_page', 'publish_page']:
                perm = Permission.objects.get(content_type=page_ct, codename=codename)
                GroupPagePermission.objects.get_or_create(
                    group=editors,
                    page=root,
                    permission=perm,
                )
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Права для Editors (page): {e}'))

        # Admins — те же права на страницы; полный доступ обычно через is_superuser
        try:
            for codename in ['add_page', 'change_page', 'publish_page', 'bulk_delete_page', 'lock_page']:
                perm = Permission.objects.filter(content_type=page_ct, codename=codename).first()
                if perm:
                    GroupPagePermission.objects.get_or_create(
                        group=admins,
                        page=root,
                        permission=perm,
                    )
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Права для Admins: {e}'))

        self.stdout.write(self.style.SUCCESS('Группы Editors и Admins созданы/обновлены. Назначьте пользователей в Админка → Пользователи → Группы.'))
