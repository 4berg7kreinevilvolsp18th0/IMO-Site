/**
 * Утилита для логирования
 * В production логирует только ошибки, в development - все
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * Логирование ошибок (всегда)
   */
  error: (message: string, ...args: any[]) => {
    if (typeof window !== 'undefined') {
      // Клиентская сторона - только в development
      if (isDevelopment) {
        console.error(`[ERROR] ${message}`, ...args);
      }
    } else {
      // Серверная сторона - всегда логируем ошибки
      console.error(`[ERROR] ${message}`, ...args);
    }
  },

