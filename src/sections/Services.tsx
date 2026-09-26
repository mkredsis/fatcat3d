import { motion } from 'framer-motion'
import {
  Boxes,
  Cog,
  Gift,
  PenTool,
  Printer,
  Puzzle,
} from 'lucide-react'
import Reveal from '../components/Reveal'

const services = [
  {
    icon: Printer,
    title: 'Impresión 3D FDM',
    desc: 'Piezas resistentes en PLA, PETG, ABS y TPU. Ideal para piezas funcionales, prototipos y artículos de uso diario.',
  },
  {
    icon: PenTool,
    title: 'Diseño y modelado 3D',
    desc: '¿Tienes la idea pero no el archivo? Diseñamos tu pieza desde cero o adaptamos modelos existentes a tu medida.',
  },
  {
    icon: Cog,
    title: 'Repuestos y piezas técnicas',
    desc: 'Reproducimos piezas dañadas o descontinuadas: engranajes, soportes, carcasas, botones y más.',
  },
  {
    icon: Gift,
    title: 'Regalos personalizados',
    desc: 'Llaveros, trofeos, letreros, portarretratos y detalles únicos con nombres, logos o fechas especiales.',
  },
  {
    icon: Puzzle,
    title: 'Figuras y cosplay',
    desc: 'Personajes, accesorios de cosplay, miniaturas y coleccionables con alto nivel de detalle.',
  },
  {
    icon: Boxes,
    title: 'Producción en serie',
    desc: 'Tiradas cortas y medianas para emprendimientos: mismo diseño, muchas unidades, precio por volumen.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="bg-blueprint relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-14 text-center">
          <p className="font-display text-sm tracking-widest text-brand">QUÉ HACEMOS</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Todo tipo de artículos <span className="text-gradient">en 3D</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-mist/70">
            Si lo puedes imaginar, lo podemos imprimir. Estos son nuestros servicios principales.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, rotate: -0.4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-smoke/80 p-7 backdrop-blur transition-colors hover:border-brand/60"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/0 blur-2xl transition-all duration-500 group-hover:bg-brand/25" />
                <div className="mb-5 inline-flex rounded-xl bg-brand/15 p-3 text-brand transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <s.icon size={28} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-mist/70">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
