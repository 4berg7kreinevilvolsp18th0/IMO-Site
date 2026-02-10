/* Декоративные элементы — необрутализм + абстрактный океан */

/**
 * AngularDivider — зигзагообразный разделитель секций
 * Заменяет WaveDivider / WaveDividerSoft
 */
export function AngularDivider({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {/* Зигзаг — ступенчатая линия */}
        <polygon
          points="0,80 0,60 120,60 120,30 240,30 240,50 360,50 360,20 480,20 480,45 600,45 600,15 720,15 720,55 840,55 840,25 960,25 960,40 1080,40 1080,10 1200,10 1200,50 1320,50 1320,35 1440,35 1440,80"
          fill="currentColor"
        />
        {/* Неоновая линия по краю зигзага */}
        <polyline
          points="0,60 120,60 120,30 240,30 240,50 360,50 360,20 480,20 480,45 600,45 600,15 720,15 720,55 840,55 840,25 960,25 960,40 1080,40 1080,10 1200,10 1200,50 1320,50 1320,35 1440,35"
          stroke="rgba(0, 255, 224, 0.3)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * NeonGrid — абстрактная сетка из неоновых точек и линий
 * Заменяет FloatingBubbles
 */
export function NeonGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] grid-drift"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="neonGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#00FFE0" />
            <line x1="0" y1="30" x2="60" y2="30" stroke="#00FFE0" strokeWidth="0.3" opacity="0.5" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="#00FFE0" strokeWidth="0.3" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neonGrid)" />
      </svg>
      {/* Горизонтальные неоновые полосы */}
      <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-imo-neon/10 to-transparent" />
      <div className="absolute top-[60%] left-0 w-full h-px bg-gradient-to-r from-transparent via-imo-magenta/5 to-transparent" />
      <div className="absolute top-[80%] left-0 w-full h-px bg-gradient-to-r from-transparent via-imo-neon/5 to-transparent" />
    </div>
  );
}

/**
 * GlitchLine — горизонтальная неоновая полоса с глитчем
 * Заменяет FloatingFish
 */
export function GlitchLine({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <div className="w-32 h-[2px] bg-gradient-to-r from-imo-neon via-imo-sky to-transparent neon-sweep opacity-40" />
    </div>
  );
}

/**
 * DotMatrix — точечный паттерн
 * Заменяет WavePattern
 */
export function DotMatrix({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-[0.04] dot-pulse ${className}`} aria-hidden="true">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        {Array.from({ length: 10 }, (_, row) =>
          Array.from({ length: 10 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 20 + 10}
              cy={row * 20 + 10}
              r="1.5"
              fill="#00FFE0"
            />
          ))
        )}
      </svg>
    </div>
  );
}

/**
 * HexagonDecor — геометрическая декорация
 * Заменяет Compass
 */
export function HexagonDecor({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-[0.06] ${className}`} aria-hidden="true">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        {/* Внешний шестиугольник */}
        <polygon
          points="100,10 177,55 177,145 100,190 23,145 23,55"
          stroke="#00FFE0"
          strokeWidth="1"
          fill="none"
        />
        {/* Внутренний */}
        <polygon
          points="100,40 148,65 148,135 100,160 52,135 52,65"
          stroke="#00FFE0"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Центральная точка */}
        <circle cx="100" cy="100" r="3" fill="#00FFE0" opacity="0.5" />
        {/* Лучи к вершинам */}
        <line x1="100" y1="100" x2="100" y2="10" stroke="#00FFE0" strokeWidth="0.3" opacity="0.3" />
        <line x1="100" y1="100" x2="177" y2="55" stroke="#00FFE0" strokeWidth="0.3" opacity="0.3" />
        <line x1="100" y1="100" x2="177" y2="145" stroke="#00FFE0" strokeWidth="0.3" opacity="0.3" />
        <line x1="100" y1="100" x2="100" y2="190" stroke="#00FFE0" strokeWidth="0.3" opacity="0.3" />
        <line x1="100" y1="100" x2="23" y2="145" stroke="#00FFE0" strokeWidth="0.3" opacity="0.3" />
        <line x1="100" y1="100" x2="23" y2="55" stroke="#00FFE0" strokeWidth="0.3" opacity="0.3" />
      </svg>
    </div>
  );
}

/**
 * ScanlineOverlay — полупрозрачные горизонтальные полоски
 */
export function ScanlineOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
      <div className="absolute inset-0 scanlines" />
      <div className="scanline-bar" />
    </div>
  );
}

/* =========================================
   Обратная совместимость — экспорт под
   старыми именами (маппинг на новые)
   ========================================= */

export const WaveDivider = AngularDivider;
export const WaveDividerSoft = AngularDivider;
export const FloatingBubbles = NeonGrid;
export function FloatingFish({ className = '' }: { className?: string }) {
  return <GlitchLine className={className} />;
}
export function SeaweedDecor({ className: _className = '' }: { className?: string }) {
  return null; // убрано в необрутальном стиле
}
export const WavePattern = DotMatrix;
export const Compass = HexagonDecor;
