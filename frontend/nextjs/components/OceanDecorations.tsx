/* Декоративные SVG-элементы в стиле ocean.study */

export function WaveDivider({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 55C960 40 1056 20 1152 25C1248 30 1344 60 1392 75L1440 90V120H0V60Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function WaveDividerSoft({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function FloatingBubbles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Пузыри разных размеров */}
      <div className="bubble bubble-1" />
      <div className="bubble bubble-2" />
      <div className="bubble bubble-3" />
      <div className="bubble bubble-4" />
      <div className="bubble bubble-5" />
      <div className="bubble bubble-6" />
      <div className="bubble bubble-7" />
      <div className="bubble bubble-8" />
    </div>
  );
}

export function FloatingFish({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className="fish-swim opacity-20">
        <ellipse cx="25" cy="15" rx="20" ry="10" fill="currentColor" />
        <polygon points="45,15 60,5 60,25" fill="currentColor" />
        <circle cx="18" cy="12" r="2" fill="#0A1628" />
      </svg>
    </div>
  );
}

export function SeaweedDecor({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} aria-hidden="true">
      <svg width="40" height="120" viewBox="0 0 40 120" fill="none" className="seaweed-sway opacity-15">
        <path
          d="M20 120C20 120 5 90 15 70C25 50 5 30 20 0"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M25 120C25 120 35 85 25 65C15 45 35 25 25 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

export function WavePattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-[0.04] ${className}`} aria-hidden="true">
      <svg width="400" height="200" viewBox="0 0 400 200" fill="none">
        <path d="M0 100C50 60 100 140 150 100C200 60 250 140 300 100C350 60 400 140 400 100" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M0 120C50 80 100 160 150 120C200 80 250 160 300 120C350 80 400 160 400 120" stroke="white" strokeWidth="1" fill="none" />
        <path d="M0 140C50 100 100 180 150 140C200 100 250 180 300 140C350 100 400 180 400 140" stroke="white" strokeWidth="0.5" fill="none" />
      </svg>
    </div>
  );
}

export function Compass({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-[0.06] ${className}`} aria-hidden="true">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="1" />
        <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="0.5" />
        <line x1="100" y1="5" x2="100" y2="195" stroke="white" strokeWidth="0.5" />
        <line x1="5" y1="100" x2="195" y2="100" stroke="white" strokeWidth="0.5" />
        <polygon points="100,15 105,40 95,40" fill="white" opacity="0.5" />
        <text x="100" y="12" textAnchor="middle" fill="white" fontSize="10" opacity="0.5">N</text>
        <text x="100" y="198" textAnchor="middle" fill="white" fontSize="10" opacity="0.5">S</text>
        <text x="8" y="104" textAnchor="middle" fill="white" fontSize="10" opacity="0.5">W</text>
        <text x="192" y="104" textAnchor="middle" fill="white" fontSize="10" opacity="0.5">E</text>
      </svg>
    </div>
  );
}
