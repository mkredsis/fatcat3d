import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, Settings2, X } from 'lucide-react'

const CONSENT_KEY = 'fatcat3d_cookie_consent'
const CONSENT_VERSION = '1.0'

type Prefs = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

export interface ConsentState extends Prefs {
  version: string
  date: string
}

export function getConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    return parsed.version === CONSENT_VERSION ? parsed : null
  } catch {
    return null
  }
}

function saveConsent(prefs: Prefs) {
  const state: ConsentState = { ...prefs, version: CONSENT_VERSION, date: new Date().toISOString() }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state))
  // Evento para que otros módulos (p.ej. futuro analytics) reaccionen
  window.dispatchEvent(new CustomEvent('fatcat3d:consent', { detail: state }))
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    // Solo mostrar si no hay consentimiento guardado (o la versión cambió)
    if (!getConsent()) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  // Permitir reabrir el banner desde el footer ("Configurar cookies")
  useEffect(() => {
    const open = () => {
      const prev = getConsent()
      if (prev) {
        setAnalytics(prev.analytics)
        setMarketing(prev.marketing)
      }
      setVisible(true)
    }
    window.addEventListener('fatcat3d:open-cookie-banner', open)
    return () => window.removeEventListener('fatcat3d:open-cookie-banner', open)
  }, [])

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true })
    setVisible(false)
  }

  const rejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false })
    setVisible(false)
  }

  const savePrefs = () => {
    saveConsent({ necessary: true, analytics, marketing })
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          role="dialog"
          aria-live="polite"
          aria-label="Consentimiento de cookies"
          className="fixed inset-x-0 bottom-0 z-[100] px-3 pb-3 sm:px-5 sm:pb-5"
        >
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-brand/30 bg-smoke/95 shadow-2xl shadow-black/60 backdrop-blur-xl">
            {!showPrefs ? (
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="hidden rounded-xl bg-brand/15 p-2.5 text-brand sm:block">
                    <Cookie size={26} />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-1.5 flex items-center gap-2 font-display text-lg text-white">
                      <Cookie size={20} className="text-brand sm:hidden" />
                      Usamos cookies
                    </h2>
                    <p className="text-sm leading-relaxed text-mist/75">
                      Utilizamos cookies <strong className="text-mist">propias y de terceros</strong>{' '}
                      para el funcionamiento técnico del sitio (esenciales) y, con tu permiso,
                      cookies de <strong className="text-mist">análisis</strong> y{' '}
                      <strong className="text-mist">marketing</strong>. Puedes aceptar todas,
                      rechazarlas o elegir cuáles permites. Cambia tu decisión cuando quieras desde
                      el enlace «Configurar cookies» del pie de página.
                    </p>
                    <p className="mt-2 text-xs text-mist/50">
                      Al hacer clic en «Aceptar todas» consientes su uso conforme a la Ley 1581 de
                      2012 (Colombia) y el RGPD (UE).
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setShowPrefs(true)}
                    className="order-3 flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-mist/70 transition-colors hover:border-brand hover:text-brand sm:order-1"
                  >
                    <Settings2 size={16} />
                    Personalizar
                  </button>
                  <button
                    onClick={rejectAll}
                    className="order-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-mist transition-colors hover:border-red-400 hover:text-red-300"
                  >
                    Rechazar todas
                  </button>
                  <button
                    onClick={acceptAll}
                    className="order-1 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-black transition-all hover:bg-brand-light hover:shadow-lg hover:shadow-brand/30 sm:order-3"
                  >
                    Aceptar todas
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-display text-lg text-white">
                    <Settings2 size={20} className="text-brand" />
                    Preferencias de cookies
                  </h2>
                  <button
                    onClick={() => setShowPrefs(false)}
                    className="rounded-lg p-1.5 text-mist/50 hover:bg-white/5 hover:text-mist"
                    aria-label="Volver"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Necesarias */}
                  <div className="rounded-xl border border-white/10 bg-coal/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">Esenciales</p>
                      <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-bold text-brand">
                        Siempre activas
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-mist/60">
                      Necesarias para que el sitio funcione: seguridad del portal de administración,
                      balanceo de carga y tu consentimiento. No se pueden desactivar. (Ej.:{' '}
                      <code className="text-brand/90">fc_token</code>, consentimiento)
                    </p>
                  </div>

                  {/* Análisis */}
                  <div className="rounded-xl border border-white/10 bg-coal/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">Análisis</p>
                      <button
                        role="switch"
                        aria-checked={analytics}
                        onClick={() => setAnalytics(!analytics)}
                        className={`relative h-6 w-11 rounded-full transition-colors ${analytics ? 'bg-brand' : 'bg-white/15'}`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${analytics ? 'left-[22px]' : 'left-0.5'}`}
                        />
                      </button>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-mist/60">
                      Nos ayudan a entender cómo se usa el sitio (páginas visitadas, tiempos) para
                      mejorarlo. Datos agregados y anónimos.
                    </p>
                  </div>

                  {/* Marketing */}
                  <div className="rounded-xl border border-white/10 bg-coal/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">Marketing</p>
                      <button
                        role="switch"
                        aria-checked={marketing}
                        onClick={() => setMarketing(!marketing)}
                        className={`relative h-6 w-11 rounded-full transition-colors ${marketing ? 'bg-brand' : 'bg-white/15'}`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${marketing ? 'left-[22px]' : 'left-0.5'}`}
                        />
                      </button>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-mist/60">
                      Para mostrarte contenido y ofertas personalizadas en este u otros sitios.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
                  <button
                    onClick={rejectAll}
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-mist transition-colors hover:border-red-400 hover:text-red-300"
                  >
                    Rechazar todas
                  </button>
                  <button
                    onClick={savePrefs}
                    className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-black transition-all hover:bg-brand-light hover:shadow-lg hover:shadow-brand/30"
                  >
                    Guardar preferencias
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
