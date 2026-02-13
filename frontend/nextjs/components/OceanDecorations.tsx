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
        {/* Основная волна */}
        <path
          d="M0 50 C360 20, 720 60, 1080 35 C1260 20, 1380 45, 1440 50 L1440 80 L0 80 Z"
          fill="currentColor"
        />
        {/* Вторая волна — глубже, больше объёма */}
        <path
          d="M0 58 C400 35, 800 62, 1200 42 L1440 58 L1440 80 L0 80 Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        {/* Линия неона */}
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

/**
 * FloatingFish — анимированные рыбки (SVG)
 * speed: 'slow' | 'normal' | 'fast', direction: 'ltr' | 'rtl', size: 'sm' | 'md' | 'lg'
 */
export function FloatingFish({
  className = '',
  speed = 'normal',
  direction = 'ltr',
  size = 'md',
  style,
  topPercent,
}: { className?: string; speed?: 'slow' | 'normal' | 'fast'; direction?: 'ltr' | 'rtl'; size?: 'sm' | 'md' | 'lg'; style?: React.CSSProperties; topPercent?: number }) {
  const speedClass = speed === 'fast' ? 'animate-fish-swim-fast' : speed === 'slow' ? 'animate-fish-swim-slow' : 'animate-fish-swim';
  const moveClass = direction === 'rtl' ? 'animate-fish-reverse' : speedClass;
  const sizeMap = { sm: 12, md: 20, lg: 28 };
  const w = sizeMap[size];
  const h = w * 0.5;
  return (
    <div
      className={`absolute pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ ...style, ...(topPercent != null && { top: `${topPercent}%` }) }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 40 20"
        fill="none"
        className={`${moveClass} animate-fish-wiggle`}
        style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,224,0.4))' }}
      >
        <ellipse cx="28" cy="10" rx="10" ry="6" fill="#00FFE0" fillOpacity="0.9" />
        <path d="M8 10 L18 4 L18 16 Z" fill="#00E5FF" fillOpacity="0.8" />
        <circle cx="32" cy="8" r="1.5" fill="#051A24" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * DolphinIcon — SVG дельфин (стилизованный, цвета брендбука)
 */
function DolphinIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 50 30" fill="none" className={className}>
      <ellipse cx="35" cy="15" rx="10" ry="6" fill="#00FFE0" fillOpacity="0.9" />
      <path d="M15 15 Q25 5, 35 15 Q25 25, 15 15" fill="#00E5FF" fillOpacity="0.8" />
      <path d="M5 15 L15 10 L15 20 Z" fill="#00A3D7" fillOpacity="0.9" />
      <circle cx="38" cy="12" r="2" fill="#051A24" fillOpacity="0.5" />
    </svg>
  );
}

/**
 * WhaleIcon — SVG кит
 */
function WhaleIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 60 30" fill="none" className={className}>
      <ellipse cx="45" cy="15" rx="18" ry="8" fill="#00A3D7" fillOpacity="0.85" />
      <path d="M10 15 Q25 8, 45 15 Q25 22, 10 15" fill="#0081B4" fillOpacity="0.9" />
      <path d="M2 15 L12 12 L12 18 Z" fill="#00B09C" fillOpacity="0.9" />
      <circle cx="50" cy="12" r="2.5" fill="#051A24" fillOpacity="0.5" />
      <path d="M35 5 L38 15 L35 25" stroke="#00FFE0" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
    </svg>
  );
}

/**
 * SharkIcon — SVG акула
 */
function SharkIcon({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 50 25" fill="none" className={className}>
      <ellipse cx="32" cy="12" rx="12" ry="5" fill="#00A2B1" fillOpacity="0.85" />
      <path d="M8 12 L22 5 L22 19 Z" fill="#00B09C" fillOpacity="0.9" />
      <path d="M40 8 L45 12 L40 16" stroke="#00FFE0" strokeWidth="1" strokeOpacity="0.7" fill="none" />
      <circle cx="35" cy="10" r="1.5" fill="#051A24" fillOpacity="0.6" />
    </svg>
  );
}

/**
 * OctopusIcon — SVG осьминог
 */
function OctopusIcon({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 28 31" fill="none" className={className}>
      <ellipse cx="14" cy="10" rx="10" ry="8" fill="#00B09C" fillOpacity="0.9" />
      <path d="M4 18 Q4 28, 8 28 Q10 28, 10 22" stroke="#00A2B1" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M8 18 Q8 26, 12 26 Q14 26, 14 20" stroke="#00A2B1" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M12 18 Q12 26, 16 26 Q18 26, 18 20" stroke="#00A2B1" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M16 18 Q16 26, 20 26 Q22 26, 22 22" stroke="#00A2B1" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M20 18 Q20 28, 24 28" stroke="#00A2B1" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M10 18 Q10 28, 6 28" stroke="#00A2B1" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M14 18 Q14 28, 18 28" stroke="#00A2B1" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="11" cy="8" r="1.5" fill="#051A24" fillOpacity="0.5" />
      <circle cx="17" cy="8" r="1.5" fill="#051A24" fillOpacity="0.5" />
    </svg>
  );
}

/**
 * FishSchool — группа рыбок с разными параметрами
 */
export function FishSchool({ className = '', count = 5 }: { className?: string; count?: number }) {
  const fish = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: 10 + (i * 18) % 75,
    speed: (['slow', 'normal', 'fast'] as const)[i % 3],
    direction: i % 2 === 0 ? ('ltr' as const) : ('rtl' as const),
    size: (['sm', 'md', 'lg'] as const)[i % 3],
    delay: `${i * 2}s`,
  }));
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {fish.map((f) => (
        <FloatingFish
          key={f.id}
          speed={f.speed}
          direction={f.direction}
          size={f.size}
          topPercent={f.top}
          style={{ animationDelay: f.delay }}
        />
      ))}
    </div>
  );
}

type CreatureType = 'fish' | 'dolphin' | 'whale' | 'shark' | 'octopus';

/**
 * MarineLife — микс рыбок, дельфинов, китов, акул, осьминогов
 */
export function MarineLife({ className = '', creatures = ['fish', 'fish', 'dolphin', 'shark', 'octopus', 'whale'] }: { className?: string; creatures?: CreatureType[] }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {creatures.map((type, i) => {
        const top = 8 + (i * 14) % 78;
        const delay = `${i * 3}s`;
        const dir = i % 2 === 0 ? 'ltr' : 'rtl';
        const style = { top: `${top}%`, animationDelay: delay } as React.CSSProperties;
        if (type === 'fish') {
          return (
            <FloatingFish
              key={`${type}-${i}`}
              topPercent={top}
              size={(['sm', 'md', 'lg'] as const)[i % 3]}
              speed={(['slow', 'normal', 'fast'] as const)[i % 3]}
              direction={dir}
              style={{ animationDelay: delay }}
            />
          );
        }
        if (type === 'dolphin') {
          return (
            <div key={`${type}-${i}`} className="absolute overflow-hidden [filter:drop-shadow(0_0_6px_rgba(0,255,224,0.4))]" style={style}>
              <div className="animate-dolphin-dive opacity-80" style={{ animationDelay: delay }}>
                <DolphinIcon size={36} />
              </div>
            </div>
          );
        }
        if (type === 'whale') {
          return (
            <div key={`${type}-${i}`} className="absolute overflow-hidden [filter:drop-shadow(0_0_6px_rgba(0,255,224,0.4))]" style={style}>
              <div className={`opacity-70 ${dir === 'rtl' ? 'animate-creature-reverse' : 'animate-creature-swim'}`} style={{ animationDelay: delay }}>
                <WhaleIcon size={48} />
              </div>
            </div>
          );
        }
        if (type === 'shark') {
          return (
            <div key={`${type}-${i}`} className="absolute overflow-hidden [filter:drop-shadow(0_0_6px_rgba(0,255,224,0.4))]" style={style}>
              <div className={`opacity-75 ${dir === 'rtl' ? 'animate-creature-reverse' : 'animate-creature-swim'}`} style={{ animationDelay: delay, animationDuration: '28s' }}>
                <SharkIcon size={40} />
              </div>
            </div>
          );
        }
        if (type === 'octopus') {
          return (
            <div key={`${type}-${i}`} className="absolute overflow-hidden [filter:drop-shadow(0_0_6px_rgba(0,255,224,0.4))]" style={style}>
              <div className="animate-creature-swim opacity-80" style={{ animationDelay: delay, animationDuration: '45s' }}>
                <div className="animate-octopus-sway inline-block">
                  <OctopusIcon size={32} />
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

/**
 * FloatingIcons — анимированные значки из брендбука (features)
 * Использует эмодзи из info.json: 📚 🎓 ⚓ 🌊 🏕️ 🚢 💰
 */
export function FloatingIcons({ icons, className = '' }: { icons: string[]; className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {icons.map((icon, i) => (
        <div
          key={`${i}-${icon}`}
          className="absolute text-2xl sm:text-3xl opacity-60 animate-icon-float"
          style={{
            left: `${10 + (i * 18) % 80}%`,
            top: `${15 + (i * 12) % 70}%`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}

/**
 * Bubbles — плавающие пузырьки
 */
export function Bubbles({ className = '', count = 12 }: { className?: string; count?: number }) {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${5 + (i * 8) % 90}%`,
    size: 4 + (i % 4) * 2,
    delay: `${(i * 0.5) % 5}s`,
    duration: 5 + (i % 4),
  }));
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full border-2 border-imo-neon/40 bg-imo-neon/10 animate-bubble"
          style={{
            left: b.left,
            bottom: '-20px',
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * AnimatedWaves — слой анимированных волн (декоративный фон)
 */
export function AnimatedWaves({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.12] ${className}`} aria-hidden="true">
      <svg className="absolute bottom-0 left-0 w-[200%] h-40 animate-wave-drift" viewBox="0 0 800 80" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00FFE0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0081B4" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00A3D7" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path d="M0 40 Q100 20, 200 40 T400 40 T600 40 T800 40 L800 80 L0 80 Z" fill="url(#waveGrad1)" />
        <path d="M0 50 Q100 30, 200 50 T400 50 T600 50 T800 50 L800 80 L0 80 Z" fill="url(#waveGrad2)" fillOpacity="0.7" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[200%] h-48 opacity-70 animate-wave-drift-rev" viewBox="0 0 800 80" preserveAspectRatio="none">
        <path d="M0 45 Q150 25, 300 45 T600 45 T800 45 L800 80 L0 80 Z" fill="#00FFE0" fillOpacity="0.08" />
      </svg>
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
export function SeaweedDecor({ className: _className = '' }: { className?: string }) {
  return null; // убрано в необрутальном стиле
}
export const WavePattern = DotMatrix;
export const Compass = HexagonDecor;
