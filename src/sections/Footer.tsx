import { Heart } from 'lucide-react'
import Logo from '../components/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-smoke py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 text-center">
        <Logo variant="mini" />
        <p className="max-w-md text-sm text-mist/55">
          Fabricación aditiva e impresión 3D de todo tipo de artículos. Tu idea, nuestra impresora.
        </p>
        <p className="flex items-center gap-1.5 text-xs text-mist/40">
          Hecho con <Heart size={12} className="text-brand" fill="currentColor" /> y mucho filamento —{' '}
          {new Date().getFullYear()} FATCAT-3D
        </p>
      </div>
    </footer>
  )
}
