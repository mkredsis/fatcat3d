import { Lightbulb, Printer, PackageCheck, DraftingCompass } from 'lucide-react'
import Reveal from '../components/Reveal'

const steps = [
  {
    icon: Lightbulb,
    num: '01',
    title: 'Cuéntanos tu idea',
    desc: 'Escríbenos por WhatsApp con una foto, boceto, medidas o simplemente la idea de lo que necesitas.',
  },
  {
    icon: DraftingCompass,
    num: '02',
    title: 'Diseño y cotización',
    desc: 'Modelamos o ajustamos el diseño 3D, elegimos el material ideal y te enviamos precio y tiempo de entrega.',
  },
  {
    icon: Printer,
    num: '03',
    title: 'Impresión capa por capa',
    desc: 'Fabricamos tu pieza con calibración fina y control de calidad durante todo el proceso.',
  },
  {
    icon: PackageCheck,
    num: '04',
    title: 'Acabado y entrega',
    desc: 'Revisamos los detalles, limpiamos la pieza y coordinamos la entrega o envío contigo.',
  },
]

export default function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-smoke py-24">
      <div className="animate-float-slow pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5">
        <Reveal className="mb-16 text-center">
          <p className="font-display text-sm tracking-widest text-brand">CÓMO TRABAJAMOS</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            De la idea a tus manos en <span className="text-gradient">4 pasos</span>
          </h2>
        </Reveal>

        <div className="relative grid gap-10 md:grid-cols-4">
          {/* Línea conectora */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent md:block" />

          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.12} className="relative">
              <div className="group text-center">
                <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/40 bg-coal text-brand shadow-lg shadow-brand/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-brand/30">
                  <s.icon size={28} />
                  <span className="font-display absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs text-black">
                    {s.num}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-mist/65">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
