import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ImagePlus } from 'lucide-react'
import Reveal from '../components/Reveal'
import { api, type GalleryItem } from '../lib/api'

/**
 * Carga automáticamente cualquier imagen empaquetada en:
 *   src/assets/gallery/  (png, jpg, jpeg, webp)
 * Si la carpeta está vacía y la API no tiene fotos, muestra placeholders.
 */
const globbed = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const bundled = Object.values(globbed)

const placeholders = [
  'Figura articulada',
  'Soporte de celular',
  'Engranaje de repuesto',
  'Llavero personalizado',
  'Maceta geométrica',
  'Casco cosplay',
]

const gradients = [
  'from-brand/60 to-amber-950',
  'from-orange-500/50 to-stone-900',
  'from-amber-500/50 to-neutral-900',
  'from-brand/50 to-zinc-900',
  'from-orange-400/50 to-stone-950',
  'from-amber-600/50 to-neutral-950',
]

export default function Gallery() {
  const [apiItems, setApiItems] = useState<GalleryItem[] | null>(null)

  useEffect(() => {
    api
      .gallery()
      .then(setApiItems)
      .catch(() => setApiItems([])) // backend caído: usa empaquetadas/placeholders
  }, [])

  // Prioridad: API (administradas desde /admin) > imágenes empaquetadas > placeholders
  const fromApi = apiItems && apiItems.length > 0
  const fromBundled = !fromApi && bundled.length > 0
  const showPlaceholders = !fromApi && !fromBundled

  return (
    <section id="galeria" className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-14 text-center">
          <p className="font-display text-sm tracking-widest text-brand">NUESTROS TRABAJOS</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Galería de <span className="text-gradient">impresiones</span>
          </h2>
        </Reveal>

        {fromApi && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apiItems!.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i, 5) * 0.06}>
                <motion.figure
                  whileHover={{ scale: 1.03 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={item.url}
                    alt={item.caption || `Trabajo FATCAT-3D ${i + 1}`}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coal/85 to-transparent p-4 pt-10 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {item.caption}
                    </figcaption>
                  )}
                </motion.figure>
              </Reveal>
            ))}
          </div>
        )}

        {fromBundled && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bundled.map((src, i) => (
              <Reveal key={src + i} delay={Math.min(i, 5) * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10"
                >
                  <img
                    src={src}
                    alt={`Trabajo FATCAT-3D ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}

        {showPlaceholders && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {placeholders.map((name, i) => (
              <Reveal key={name} delay={i * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 0.4 }}
                  className={`relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradients[i % gradients.length]}`}
                >
                  <ImagePlus size={34} className="text-white/70" />
                  <p className="px-4 text-center font-semibold text-white/90">{name}</p>
                  <p className="text-xs text-white/50">Tu foto aquí próximamente</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
