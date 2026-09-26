const items = [
  'PROTOTIPOS',
  'REPUESTOS',
  'FIGURAS Y COSPLAY',
  'REGALOS PERSONALIZADOS',
  'LLAVEROS',
  'DECORACIÓN',
  'PIEZAS FUNCIONALES',
  'DISEÑO 3D',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-brand/25 bg-smoke py-4">
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-sm tracking-wide text-mist/80 md:text-base">
              {item}
            </span>
            <span className="h-2 w-2 rotate-45 bg-brand" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
