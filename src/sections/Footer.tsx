import { Heart, Lock, ExternalLink } from 'lucide-react'
import Logo from '../components/Logo'
import RamhensoftIcon from '../components/RamhensoftIcon'

function openCookiePrefs() {
  window.dispatchEvent(new Event('fatcat3d:open-cookie-banner'))
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-smoke py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 text-center">
        <Logo variant="mini" />
        <p className="max-w-md text-sm text-mist/55">
          Fabricación aditiva e impresión 3D de todo tipo de artículos. Tu idea, nuestra impresora.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-mist/45">
          <button
            onClick={openCookiePrefs}
            className="underline-offset-2 transition-colors hover:text-brand hover:underline"
          >
            Configurar cookies
          </button>
          <a href="/privacidad" className="underline-offset-2 transition-colors hover:text-brand hover:underline">
            Política de Privacidad
          </a>
          <a href="/admin" className="flex items-center gap-1.5 underline-offset-2 transition-colors hover:text-brand hover:underline">
            <Lock size={11} /> Administración
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-mist/40">
          <span>
            © {new Date().getFullYear()} FATCAT-3D. Todos los derechos reservados. Colombia.
          </span>
          <span className="hidden text-mist/25 sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            Hecho con <Heart size={12} className="text-brand" fill="currentColor" /> y mucho filamento
          </span>
        </div>

        {/* Casa de software — RamHenSoft */}
        <div className="mt-2 flex items-center gap-3">
          <span className="software-house-label text-xs font-medium text-mist/40">
            Casa de Software:
          </span>
          <a
            href="https://ramhensoft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-coal/80 px-3 py-1.5 text-slate-100 shadow-sm transition-all hover:border-emerald-400/70 hover:shadow-md"
            title="Desarrollado por la casa de software RamHenSoft — ramhensoft.com"
          >
            <RamhensoftIcon className="w-5 h-5 transition-transform group-hover:scale-115 group-hover:-rotate-3" />
            <span className="text-xs font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300">
              ramhensoft.com
            </span>
            <ExternalLink className="w-3 h-3 text-mist/40 transition-colors group-hover:text-emerald-300" />
          </a>
        </div>
      </div>
    </footer>
  )
}
