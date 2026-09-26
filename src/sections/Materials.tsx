import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'

const materials = [
  {
    name: 'PLA',
    desc: 'El favorito para figuras, decoración y prototipos. Gran acabado superficial y variedad de colores.',
    strength: 55,
    flex: 30,
    finish: 90,
  },
  {
    name: 'PETG',
    desc: 'Resistente y durable. Perfecto para piezas funcionales, repuestos y artículos de uso rudo.',
    strength: 80,
    flex: 60,
    finish: 75,
  },
  {
    name: 'ABS',
    desc: 'Alta resistencia térmica e impactos. Ideal para piezas mecánicas y exteriores.',
    strength: 85,
    flex: 45,
    finish: 65,
  },
  {
    name: 'TPU',
    desc: 'Flexible como caucho: fundas, protectores, ruedas, juntas y piezas que se doblan sin romperse.',
    strength: 50,
    flex: 98,
    finish: 55,
  },
]

const bars: { key: 'strength' | 'flex' | 'finish'; label: string }[] = [
  { key: 'strength', label: 'Resistencia' },
  { key: 'flex', label: 'Flexibilidad' },
  { key: 'finish', label: 'Acabado' },
]

export default function Materials() {
  return (
    <section id="materiales" className="bg-blueprint py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-14 text-center">
          <p className="font-display text-sm tracking-widest text-brand">MATERIALES</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            El material correcto para <span className="text-gradient">cada pieza</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="h-full rounded-2xl border border-white/10 bg-smoke/80 p-6 backdrop-blur transition-colors hover:border-brand/60"
              >
                <h3 className="font-display text-2xl text-brand">{m.name}</h3>
                <p className="mt-2 min-h-20 text-sm text-mist/65">{m.desc}</p>
                <div className="mt-4 space-y-3">
                  {bars.map((b) => (
                    <div key={b.key}>
                      <div className="mb-1 flex justify-between text-xs text-mist/60">
                        <span>{b.label}</span>
                        <span>{m[b.key]}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${m[b.key]}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-brand-dark to-brand-light"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
