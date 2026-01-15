import { NextResponse } from 'next/server';
import { serviceIsolation } from '../../../lib/serviceIsolation';
import { gracefulDegradation } from '../../../lib/gracefulDegradation';
import { circuitBreakers } from '../../../lib/circuitBreaker';
import RenderFromTemplateContext from 'next/dist/client/components/render-from-template-context';

/**
 * Расширенный health check с информацией о статусе всех сервисов
 * Показывает состояние изоляции и деградации
 */
export async function GET() {
  try {
    const systemHealth = serviceIsolation.getSystemHealth();
    const degradationLevel = gracefulDegradation.getDegradationLevel();
    const features = gracefulDegradation.getAvailableFeatures();
    const circuitBreakerStats = Object.keys(circuitBreakers).map(key => {
      const breaker = circuitBreakers[key as keyof typeof circuitBreakers];
      return breaker.getStats();
    });

    return NextResponse.json({
      status: systemHealth.healthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      system: {
        health: systemHealth.healthy,
        degraded: systemHealth.degraded,
        degradationLevel,
        message: gracefulDegradation.getStatusMessage(),
        recommendations: gracefulDegradation.getUserRecommendations(),
      },
      services: systemHealth.services.map(service => ({
        name: service.name,
        healthy: service.healthy,
        available: service.available,
        lastCheck: new Date(service.lastCheck).toISOString(),
        error: service.error || null,
      })),
      features: features.map(feature => ({
        name: feature.name,
        available: feature.available,
        fallback: feature.fallback || null,
        reason: feature.reason || null,
      })),
      circuitBreakers: circuitBreakerStats.map(stats => ({
        name: stats.name,
        state: stats.state,
        failures: stats.failures,
        successes: stats.successes,
        lastStateChange: new Date(stats.lastStateChange).toISOString(),
      })),
      environment: process.env.NODE_ENV,
    }, {
      status: systemHealth.healthy ? 200 : 503, // 503 Service Unavailable если система деградирована
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message || 'Unknown error',
      timestamp: new Date().toISOString(),
    }, {
      status: 500,
    });
  }
}


