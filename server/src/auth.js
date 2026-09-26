import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import jwt from 'jsonwebtoken'
import { DATA_DIR } from './db.js'

export const COOKIE_NAME = 'fc_token'
const SECRET_PATH = path.join(DATA_DIR, 'jwt.secret')

/** Secreto persistente generado en el primer arranque (vive en el volumen). */
function loadSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET
  if (fs.existsSync(SECRET_PATH)) return fs.readFileSync(SECRET_PATH, 'utf8').trim()
  const secret = crypto.randomBytes(48).toString('hex')
  fs.writeFileSync(SECRET_PATH, secret, { mode: 0o600 })
  return secret
}

const SECRET = loadSecret()
const TTL = '12h'

export function signToken(admin) {
  return jwt.sign({ sub: admin.id, email: admin.email }, SECRET, { expiresIn: TTL })
}

export function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 12 * 60 * 60 * 1000,
    path: '/',
  })
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: '/' })
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return res.status(401).json({ error: 'No autenticado' })
  try {
    req.admin = jwt.verify(token, SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Sesión inválida o expirada' })
  }
}
