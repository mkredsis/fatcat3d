import { motion } from 'framer-motion'
import { Instagram, Mail, MessageCircle, MapPin } from 'lucide-react'
import Reveal from '../components/Reveal'
import Logo from '../components/Logo'
import { site, waLink } from '../config'

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Cotiza y pregunta sin compromiso',
    href: waLink(),
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@fatcat3d — mira nuestros trabajos',
    href: site.instagram,
  },
  {
    icon: Mail,
    label: 'Correo',
    value: site.email,
    href: `mailto:${site.email}`,
  },
]

export default function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden py-24">
      <div className="animate-float-slow pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand/12 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-smoke to-coal p-8 shadow-2xl shadow-brand/10 md:p-14">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <Logo variant="mini" className="text-3xl" />
                <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-4xl">
                  ¿Tienes una idea? <span className="text-gradient">Hagámosla realidad.</span>
                </h2>
                <p className="mt-4 text-mist/70">
                  Envíanos tu diseño o cuéntanos qué necesitas. Respondemos rápido y te damos
                  cotización clara, sin sorpresas.
                </p>
                <motion.a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-bold text-black shadow-lg shadow-brand/30 hover:bg-brand-light"
                >
                  <MessageCircle size={19} />
                  Escríbenos por WhatsApp
                </motion.a>
              </div>

              <ul className="space-y-4">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-brand/60 hover:bg-brand/10"
                    >
                      <span className="rounded-xl bg-brand/15 p-3 text-brand transition-transform group-hover:scale-110">
                        <c.icon size={22} />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-white">{c.label}</span>
                        <span className="block text-sm text-mist/60">{c.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-4 rounded-2xl border border-white/5 p-4">
                  <span className="rounded-xl bg-white/5 p-3 text-mist/50">
                    <MapPin size={22} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">Envíos</span>
                    <span className="block text-sm text-mist/60">
                      Entregas locales y envíos a todo el país
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
