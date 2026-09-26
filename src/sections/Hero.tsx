import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MessageCircle } from 'lucide-react'
import Logo from '../components/Logo'
import { site, waLink } from '../config'

const Scene3D = lazy(() => import('../components/Scene3D'))

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 z-0 bg-blueprint" aria-hidden />}>
        <Scene3D />
      </Suspense>

      {/* Blobs decorativos */}
      <div className="animate-float-slow pointer-events-none absolute -left-32 top-24 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-3xl" />
      <div className="animate-float-slow pointer-events-none absolute -right-32 bottom-24 -z-10 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl [animation-delay:-5s]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glow-brand mx-auto"
        >
          <Logo />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-mist/85 md:text-xl"
        >
          {site.tagline}{' '}
          <span className="text-gradient font-semibold">
            Prototipos, repuestos, figuras, regalos personalizados y todo tipo de artículos
          </span>{' '}
          impresos capa por capa con acabado profesional.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 font-bold text-black transition-all hover:scale-105 hover:bg-brand-light hover:shadow-xl hover:shadow-brand/40"
          >
            <MessageCircle size={19} className="transition-transform group-hover:-rotate-12" />
            Cotiza tu pieza
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-mist backdrop-blur transition-all hover:border-brand hover:text-brand"
          >
            Ver servicios
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#servicios"
        aria-label="Bajar a servicios"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mist/50 hover:text-brand"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={26} />
      </motion.a>
    </section>
  )
}
