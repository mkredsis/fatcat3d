import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { waLink } from '../config'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#galeria', label: 'Galería' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#materiales', label: 'Materiales' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-coal/85 backdrop-blur-md shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#inicio" aria-label="FATCAT-3D inicio">
          <Logo variant="mini" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-mist/80 transition-colors hover:text-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-brand px-5 py-2 text-sm font-bold text-black transition-all hover:bg-brand-light hover:shadow-lg hover:shadow-brand/30 md:inline-block"
        >
          Cotizar ahora
        </a>

        <button
          className="text-mist md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-coal/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-mist/85 hover:bg-white/5 hover:text-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-brand px-5 py-2.5 text-center font-bold text-black"
              >
                Cotizar ahora
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
