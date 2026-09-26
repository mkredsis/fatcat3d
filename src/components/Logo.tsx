interface LogoProps {
  className?: string
  /** 'full' = logo oficial completo (gato + texto). 'mini' = cabeza + texto para navbar/footer */
  variant?: 'full' | 'mini'
}

export default function Logo({ className = '', variant = 'full' }: LogoProps) {
  if (variant === 'mini') {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src="/brand/cat-head.webp"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border-2 border-brand object-cover bg-ink"
        />
        <span className="font-display text-xl leading-none tracking-tight">
          <span className="text-white">FATCAT-</span>
          <span className="text-brand">3D</span>
        </span>
      </span>
    )
  }

  return (
    <img
      src="/brand/logo-fatcat.webp"
      alt="FATCAT-3D — Impresión 3D"
      width={700}
      height={672}
      className={`mx-auto w-full max-w-md md:max-w-lg ${className}`}
      fetchPriority="high"
    />
  )
}
