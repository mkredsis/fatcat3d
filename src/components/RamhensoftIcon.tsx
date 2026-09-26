interface RamhensoftIconProps {
  className?: string
  size?: number
}

/** Icono oficial de RamHenSoft — plato de ramen verde (idéntico al de ramhensoft.com). */
export default function RamhensoftIcon({ className = 'w-5 h-5', size }: RamhensoftIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-label="RamHenSoft Icono - Plato de Ramen Verde"
      role="img"
    >
      <defs>
        <linearGradient id="rhsBowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="30%" stopColor="#10B981" />
          <stop offset="75%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="rhsRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="50%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="rhsBrothGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
        <linearGradient id="rhsSteamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#A7F3D0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ECFDF5" stopOpacity="0" />
        </linearGradient>
        <filter id="rhsGlow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#059669" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#rhsGlow)">
        {/* Vapor */}
        <g stroke="url(#rhsSteamGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d="M37 34 C 33 26 43 20 39 10" />
          <path d="M50 32 C 46 22 56 16 51 6" strokeWidth="2.8" />
          <path d="M63 34 C 59 26 69 20 65 10" />
        </g>
        {/* Palillos */}
        <line x1="88" y1="16" x2="32" y2="48" stroke="#CA8A04" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="88" y1="16" x2="32" y2="48" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="92" y1="21" x2="36" y2="53" stroke="#854D0E" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
        {/* Base del tazón */}
        <path
          d="M36 84 C36 81.5 42 80 50 80 C58 80 64 81.5 64 84 L62.5 89 C62.5 90.5 57 92 50 92 C43 92 37.5 90.5 37.5 89 Z"
          fill="#047857"
          stroke="#064E3B"
          strokeWidth="1.2"
        />
        {/* Tazón */}
        <path
          d="M13 46 C 14 69 28 84 50 84 C 72 84 86 69 87 46 C 87 44 13 44 13 46 Z"
          fill="url(#rhsBowlGrad)"
          stroke="#047857"
          strokeWidth="1.6"
        />
        {/* Brillos del tazón */}
        <path d="M20 54 C 27 68 37 75 50 75 C 63 75 73 68 80 54" fill="none" stroke="#6EE7B7" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <path d="M29 64 C 35 72 42 75 50 75 C 58 75 65 72 71 64" fill="none" stroke="#A7F3D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        {/* Caldo */}
        <ellipse cx="50" cy="46" rx="36.5" ry="9.5" fill="url(#rhsBrothGrad)" stroke="url(#rhsRimGrad)" strokeWidth="2.4" />
        {/* Fideos */}
        <path d="M 22 46 Q 28 40 34 46 Q 40 52 46 46 Q 52 40 58 46 Q 64 52 70 46 Q 74 42 78 46" fill="none" stroke="#FDE047" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 27 49 Q 34 43 41 49 Q 48 55 55 49 Q 62 43 69 49 Q 74 53 77 49" fill="none" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 37 40 Q 43 34 50 40 Q 56 35 62 40" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
        {/* Huevo */}
        <g transform="translate(34, 38)">
          <ellipse cx="6" cy="5" rx="6.5" ry="5" fill="#FFFFFF" />
          <circle cx="6" cy="5" r="3" fill="#F59E0B" />
          <circle cx="5" cy="4" r="0.9" fill="#FEF3C7" />
        </g>
        {/* Narutomaki */}
        <g transform="translate(56, 39)">
          <circle cx="4.5" cy="4.5" r="4.5" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="1" />
          <path d="M4.5 2 C6 2 7 3 7 4.5 C7 6 5.5 7 4.5 7 C3 7 2.5 6 2.5 4.5 C2.5 3.5 3.5 3 4.5 3" fill="none" stroke="#F43F5E" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        {/* Cebollines */}
        <circle cx="30" cy="45" r="1.8" fill="#34D399" stroke="#059669" strokeWidth="0.6" />
        <circle cx="48" cy="48" r="1.6" fill="#6EE7B7" stroke="#059669" strokeWidth="0.6" />
        <circle cx="67" cy="46" r="1.8" fill="#34D399" stroke="#059669" strokeWidth="0.6" />
      </g>
    </svg>
  )
}
