import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const sections = [
  {
    title: '1. Responsable del tratamiento',
    body: `FATCAT-3D ("nosotros") es el responsable del tratamiento de los datos personales recolectados a través de este sitio web (fatcat3d.mkredsis.duckdns.org). Contacto: contacto@fatcat3d.com.`,
  },
  {
    title: '2. Datos que recolectamos',
    body: `• Solicitudes de cotización que nos envías voluntariamente por WhatsApp o correo (nombre, teléfono, descripción del proyecto).\n• Cookies técnicas esenciales (sesión del administrador y consentimiento).\n• Cookies de análisis y marketing SOLO si las aceptas en el banner de cookies.`,
  },
  {
    title: '3. Finalidad',
    body: `Responder a tus solicitudes de cotización, elaborar los productos que nos encargas, mejorar el sitio web y, con tu consentimiento, enviarte información sobre nuestros servicios.`,
  },
  {
    title: '4. Base legal',
    body: `Tratamos tus datos en virtud de tu consentimiento expreso (Ley 1581 de 2012, Decreto 1377 de 2013 — Colombia; y RGPD UE 2016/679 cuando aplique).`,
  },
  {
    title: '5. Cookies',
    body: `Al entrar verás un banner que te permite aceptar, rechazar o personalizar las cookies. Las esenciales siempre están activas porque sin ellas el sitio no funciona. Puedes cambiar tu decisión en cualquier momento desde "Configurar cookies" en el pie de página.`,
  },
  {
    title: '6. Conservación',
    body: `Conservamos tus datos solo el tiempo necesario para cumplir la finalidad por la que fueron recolectados o lo que exija la normativa aplicable.`,
  },
  {
    title: '7. Tus derechos',
    body: `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición y revocación del consentimiento escribiéndonos a contacto@fatcat3d.com.`,
  },
  {
    title: '8. Seguridad',
    body: `Aplicamos medidas técnicas y organizativas razonables: HTTPS, control de acceso con contraseñas cifradas, limitación de intentos de acceso y datos mínimos.`,
  },
  {
    title: '9. Cambios a esta política',
    body: `Si actualizamos esta política, lo publicaremos en esta página y, si el cambio afecta las cookies, te volveremos a pedir consentimiento.`,
  },
]

export default function Privacy() {
  return (
    <div className="bg-blueprint min-h-screen bg-coal text-mist">
      <div className="mx-auto max-w-3xl px-5 py-14">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-mist/60 hover:text-brand">
          <ArrowLeft size={16} /> Volver al sitio
        </Link>

        <div className="mb-10 text-center">
          <Logo variant="mini" className="justify-center" />
          <h1 className="mt-6 font-display text-4xl text-white">
            Política de <span className="text-gradient">Privacidad</span>
          </h1>
          <p className="mt-3 text-sm text-mist/55">Última actualización: septiembre de 2026</p>
        </div>

        <div className="space-y-5">
          {sections.map((s) => (
            <section key={s.title} className="rounded-2xl border border-white/10 bg-smoke/80 p-6">
              <h2 className="mb-2 text-lg font-bold text-white">{s.title}</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-mist/70">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
