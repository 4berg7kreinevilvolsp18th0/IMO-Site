/* Декоративные элементы — классический стиль ИМО (брендбук) */

/**
 * AngularDivider — волнообразный разделитель секций
 * Плавные волны в цветах брендбука (ocean, wave, sky)
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
        {/* Плавные волны — классический океан */}
        <path
          d="M0 50 C360 20, 720 60, 1080 35 C1260 20, 1380 45, 1440 50 L1440 80 L0 80 Z"
          fill="currentColor"
        />
        <path
          d="M0 55 Q360 25, 720 55 T1440 55"
          stroke="rgba(0, 255, 224, 0.35)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * NeonGrid — сетка в цветах брендбука (ocean, wave)
 */
export function NeonGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] grid-drift"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="oceanGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#00FFE0" />
            <line x1="0" y1="30" x2="60" y2="30" stroke="#00FFE0" strokeWidth="0.3" opacity="0.4" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="#00FFE0" strokeWidth="0.3" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#oceanGrid)" />
      </svg>
      <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-imo-neon/15 to-transparent" />
      <div className="absolute top-[60%] left-0 w-full h-px bg-gradient-to-r from-transparent via-imo-neon-cyan/10 to-transparent" />
      <div className="absolute top-[80%] left-0 w-full h-px bg-gradient-to-r from-transparent via-imo-wave/8 to-transparent" />
    </div>
  );
}

/**
 * GlitchLine — горизонтальная полоса в цвете wave
 */
export function GlitchLine({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <div className="w-32 h-[2px] bg-gradient-to-r from-imo-wave via-imo-neon to-transparent neon-sweep opacity-35" />
    </div>
  );
}

/**
 * DotMatrix — точечный паттерн (цвет wave)
 */
export function DotMatrix({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-[0.05] dot-pulse ${className}`} aria-hidden="true">
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
 * HexagonDecor — геометрическая декорация (цвет wave, teal)
 */
export function HexagonDecor({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-[0.06] ${className}`} aria-hidden="true">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        <polygon
          points="100,10 177,55 177,145 100,190 23,145 23,55"
          stroke="#00FFE0"
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="100,40 148,65 148,135 100,160 52,135 52,65"
          stroke="#00E5FF"
          strokeWidth="0.5"
          fill="none"
        />
        <circle cx="100" cy="100" r="3" fill="#00FF41" opacity="0.5" />
        <line x1="100" y1="100" x2="100" y2="10" stroke="#00FFE0" strokeWidth="0.3" opacity="0.25" />
        <line x1="100" y1="100" x2="177" y2="55" stroke="#00FFE0" strokeWidth="0.3" opacity="0.25" />
        <line x1="100" y1="100" x2="177" y2="145" stroke="#00FFE0" strokeWidth="0.3" opacity="0.25" />
        <line x1="100" y1="100" x2="100" y2="190" stroke="#00FFE0" strokeWidth="0.3" opacity="0.25" />
        <line x1="100" y1="100" x2="23" y2="145" stroke="#00FFE0" strokeWidth="0.3" opacity="0.25" />
        <line x1="100" y1="100" x2="23" y2="55" stroke="#00FFE0" strokeWidth="0.3" opacity="0.25" />
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
