import { Router } from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import multer from 'multer'
import sharp from 'sharp'
import db, { UPLOADS_DIR, tx } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 10 },
  fileFilter: (_req, file, cb) => {
    const ok = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.mimetype)
    cb(ok ? null : new Error('Solo se permiten imágenes (JPG, PNG, WebP, AVIF)'), ok)
  },
})

const rowToJson = (r) => ({
  id: r.id,
  url: `/uploads/${r.file}`,
  caption: r.caption,
  position: r.position,
  createdAt: r.created_at,
})

/** Público: lista de fotos de la galería. */
router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM gallery ORDER BY position ASC, id ASC').all()
  res.json(rows.map(rowToJson))
})

/** Admin: subir 1-10 imágenes. Se normalizan a WebP (máx 1600px de ancho). */
router.post('/', requireAuth, upload.array('images', 10), async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ error: 'No se recibieron imágenes' })

  const maxPos = db.prepare('SELECT COALESCE(MAX(position), 0) AS m FROM gallery').get().m
  const insert = db.prepare('INSERT INTO gallery (file, caption, position) VALUES (?, ?, ?)')
  const saved = []

  for (const [i, file] of req.files.entries()) {
    const name = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.webp`
    await sharp(file.buffer)
      .rotate() // respeta EXIF
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(UPLOADS_DIR, name))
    const caption = String(req.body.caption || '').slice(0, 120)
    const info = insert.run(name, caption, maxPos + i + 1)
    saved.push({ id: info.lastInsertRowid, url: `/uploads/${name}`, caption, position: maxPos + i + 1 })
  }
  res.status(201).json(saved)
})

/** Admin: editar título. */
router.put('/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const caption = String(req.body?.caption ?? '').slice(0, 120)
  const info = db.prepare('UPDATE gallery SET caption = ? WHERE id = ?').run(caption, id)
  if (!info.changes) return res.status(404).json({ error: 'No existe' })
  res.json({ ok: true })
})

/** Admin: reordenar (array de ids en el orden deseado). */
router.post('/reorder', requireAuth, (req, res) => {
  const ids = Array.isArray(req.body?.ids) ? req.body.ids.map(Number).filter(Number.isInteger) : []
  const update = db.prepare('UPDATE gallery SET position = ? WHERE id = ?')
  tx(() => ids.forEach((id, i) => update.run(i + 1, id)))
  res.json({ ok: true })
})

/** Admin: eliminar foto (y su archivo). */
router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  const row = db.prepare('SELECT * FROM gallery WHERE id = ?').get(id)
  if (!row) return res.status(404).json({ error: 'No existe' })
  db.prepare('DELETE FROM gallery WHERE id = ?').run(id)
  await fs.unlink(path.join(UPLOADS_DIR, row.file)).catch(() => {})
  res.json({ ok: true })
})

export default router
