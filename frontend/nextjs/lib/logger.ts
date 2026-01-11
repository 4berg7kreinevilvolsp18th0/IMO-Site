/**
 * Утилита для логирования
 * В production логирует только ошибки, в development - все
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
