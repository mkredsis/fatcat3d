import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import authRoutes from './routes/auth.js'
import galleryRoutes from './routes/gallery.js'
import { UPLOADS_DIR } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = Number(process.env.PORT || 80)
const PUBLIC_DIR = process.env.PUBLIC_DIR || path.resolve(__dirname, '..', 'public')

app.set('trust proxy', 1) // detrás de Nginx Proxy Manager
app.disable('x-powered-by')

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'blob:'],
        connectSrc: ["'self'"],
        workerSrc: ["'self'", 'blob:'],
        objectSrc: ["'none'"],
        frameAncestors: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
)
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

// ---------- API ----------
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'fatcat3d' }))
app.use('/api/auth', authRoutes)
app.use('/api/gallery', galleryRoutes)

app.use('/api', (_req, res) => res.status(404).json({ error: 'Recurso no encontrado' }))

// ---------- Archivos subidos (nombres únicos inmutables) ----------
app.use(
  '/uploads',
  express.static(UPLOADS_DIR, { maxAge: '30d', immutable: true, fallthrough: false })
)

// ---------- Frontend estático (SPA) ----------
app.use(
  express.static(PUBLIC_DIR, {
    setHeaders(res, filePath) {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable') // Vite hashea
      } else if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-store')
      }
    },
  })
)
app.get('*', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'))
})

// ---------- Errores (incluye multer) ----------
app.use((err, _req, res, _next) => {
  const msg = err?.message || 'Error interno'
  const status = /Solo se permiten|File too large|Too many files/.test(msg) ? 400 : 500
  res.status(status).json({ error: msg })
})

app.listen(PORT, () => console.log(`FATCAT-3D escuchando en puerto ${PORT}`))
