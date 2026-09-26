import { Router } from 'express'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'
import db from '../db.js'
import { signToken, setAuthCookie, clearAuthCookie, requireAuth } from '../auth.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const adminCount = () => db.prepare('SELECT COUNT(*) AS n FROM admins').get().n

/** ¿El sistema aún no tiene administrador? (permite pantalla de setup inicial) */
router.get('/setup-available', (_req, res) => {
  res.json({ setup: adminCount() === 0 })
})

/** Crear el primer (y único por defecto) administrador. Solo si no existe ninguno. */
router.post('/setup', loginLimiter, (req, res) => {
  if (adminCount() > 0) return res.status(403).json({ error: 'El administrador ya existe' })

  const { email, password } = req.body || {}
  if (!EMAIL_RE.test(email || '')) return res.status(400).json({ error: 'Correo inválido' })
  if (typeof password !== 'string' || password.length < 8)
    return res.status(400).json({ error: 'La contraseña debe tener mínimo 8 caracteres' })

  const hash = bcrypt.hashSync(password, 12)
  const info = db.prepare('INSERT INTO admins (email, pass_hash) VALUES (?, ?)').run(email.toLowerCase(), hash)
  const admin = { id: info.lastInsertRowid, email: email.toLowerCase() }
  setAuthCookie(res, signToken(admin))
  res.status(201).json({ ok: true, email: admin.email })
})

router.post('/login', loginLimiter, (req, res) => {
  const { email, password } = req.body || {}
  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(String(email || '').toLowerCase())
  if (!admin || !bcrypt.compareSync(String(password || ''), admin.pass_hash)) {
    return res.status(401).json({ error: 'Credenciales incorrectas' })
  }
  setAuthCookie(res, signToken(admin))
  res.json({ ok: true, email: admin.email })
})

router.post('/logout', (_req, res) => {
  clearAuthCookie(res)
  res.json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ email: req.admin.email })
})

/** Cambiar contraseña (con la sesión activa). */
router.post('/password', requireAuth, (req, res) => {
  const { current, next } = req.body || {}
  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin.sub)
  if (!admin || !bcrypt.compareSync(String(current || ''), admin.pass_hash)) {
    return res.status(401).json({ error: 'Contraseña actual incorrecta' })
  }
  if (typeof next !== 'string' || next.length < 8)
    return res.status(400).json({ error: 'La nueva contraseña debe tener mínimo 8 caracteres' })
  db.prepare('UPDATE admins SET pass_hash = ? WHERE id = ?').run(bcrypt.hashSync(next, 12), admin.id)
  res.json({ ok: true })
})

export default router
