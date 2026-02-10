/**
 * Вспомогательные утилиты проекта ИМО ДВФУ
 */

/** Цветовая палитра акцентов для направлений подготовки */
const ACCENT_COLORS: Record<string, string> = {
  geography: '#1565C0',
  hydrometeo: '#1E88E5',
  ecology: '#2E7D32',
  biology: '#00897B',
  soil: '#D4A017',
  robotics: '#FF7043',
};

/** Возвращает акцентный цвет по slug направления */
export function getAccentColor(slug: string): string {
  return ACCENT_COLORS[slug] || '#1E88E5';
}
