import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react'
import Logo from '../components/Logo'
import { api } from '../lib/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.setupAvailable().then((r) => setNeedsSetup(r.setup)).catch(() => setNeedsSetup(false))
    api.me().then(() => navigate('/admin', { replace: true })).catch(() => {})
  }, [navigate])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (needsSetup && password !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    try {
      if (needsSetup) await api.setup(email, password)
      else await api.login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-blueprint flex min-h-screen items-center justify-center bg-coal px-5">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-brand/30 bg-smoke p-8 shadow-2xl shadow-brand/10 md:p-10">
          <div className="mb-8 flex flex-col items-center">
            <Logo variant="mini" className="text-2xl" />
            <h1 className="mt-6 font-display text-2xl text-white">
              {needsSetup ? 'Crear cuenta de administrador' : 'Portal del dueño'}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-mist/60">
              <ShieldCheck size={16} className="text-brand" />
              {needsSetup
                ? 'Primera vez: registra tu correo y contraseña'
                : 'Acceso restringido — solo administración'}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist/60">
                Correo
              </span>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full rounded-xl border border-white/10 bg-coal py-3 pl-11 pr-4 text-mist placeholder-mist/30 outline-none transition-colors focus:border-brand"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist/60">
                Contraseña
              </span>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist/40" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-xl border border-white/10 bg-coal py-3 pl-11 pr-12 text-mist placeholder-mist/30 outline-none transition-colors focus:border-brand"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mist/40 hover:text-brand"
                  aria-label="Ver contraseña"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {needsSetup && (
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist/60">
                  Confirmar contraseña
                </span>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist/40" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repite la contraseña"
                    className="w-full rounded-xl border border-white/10 bg-coal py-3 pl-11 pr-4 text-mist placeholder-mist/30 outline-none transition-colors focus:border-brand"
                  />
                </div>
              </label>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand py-3.5 font-bold text-black transition-all hover:bg-brand-light hover:shadow-lg hover:shadow-brand/30 disabled:opacity-50"
            >
              {loading ? 'Ingresando…' : needsSetup ? 'Crear cuenta' : 'Ingresar'}
            </button>
          </form>
        </div>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-mist/50 transition-colors hover:text-brand"
        >
          <ArrowLeft size={16} /> Volver al sitio
        </Link>
      </motion.div>
    </div>
  )
}
