import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUp,
  Check,
  ExternalLink,
  ImagePlus,
  KeyRound,
  Loader2,
  LogOut,
  Pencil,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react'
import { api, type GalleryItem } from '../lib/api'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [notice, setNotice] = useState('')
  const [pwOpen, setPwOpen] = useState(false)
  const [pwCurrent, setPwCurrent] = useState('')
  const [pwNext, setPwNext] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    api.me()
      .then((m) => setEmail(m.email))
      .catch(() => navigate('/admin/login', { replace: true }))
    load()
  }, [navigate])

  async function load() {
    try {
      setItems(await api.gallery())
    } finally {
      setLoading(false)
    }
  }

  const flash = (msg: string) => {
    setNotice(msg)
    setTimeout(() => setNotice(''), 2500)
  }

  async function doUpload(files: File[]) {
    const imgs = files.filter((f) => f.type.startsWith('image/'))
    if (!imgs.length) {
      flash('⚠️ Solo imágenes (JPG, PNG, WebP)')
      return
    }
    setUploading(true)
    try {
      await api.upload(imgs, caption)
      setCaption('')
      flash(`✅ ${imgs.length} imagen(es) subida(s)`)
      await load()
    } catch (e) {
      flash(`❌ ${e instanceof Error ? e.message : 'Error subiendo'}`)
    } finally {
      setUploading(false)
    }
  }

  async function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    await doUpload([...e.dataTransfer.files])
  }

  async function startEdit(item: GalleryItem) {
    setEditingId(item.id)
    setEditingText(item.caption)
  }

  async function saveCaption(id: number) {
    await api.updateCaption(id, editingText)
    setEditingId(null)
    flash('✅ Título guardado')
    await load()
  }

  async function move(id: number, dir: -1 | 1) {
    const idx = items.findIndex((i) => i.id === id)
    const swap = idx + dir
    if (idx < 0 || swap < 0 || swap >= items.length) return
    const next = [...items]
    ;[next[idx], next[swap]] = [next[swap], next[idx]]
    setItems(next) // optimista
    await api.reorder(next.map((i) => i.id))
  }

  async function remove(id: number) {
    const item = items.find((i) => i.id === id)
    if (!item) return
    if (!confirm(`¿Eliminar "${item.caption || 'esta foto'}" de la galería?`)) return
    await api.remove(id)
    flash('✅ Foto eliminada')
    await load()
  }

  async function logout() {
    await api.logout().catch(() => {})
    navigate('/admin/login', { replace: true })
  }

  async function changePassword(e: FormEvent) {
    e.preventDefault()
    try {
      await api.changePassword(pwCurrent, pwNext)
      setPwOpen(false)
      setPwCurrent('')
      setPwNext('')
      flash('✅ Contraseña actualizada')
    } catch (err) {
      flash(`❌ ${err instanceof Error ? err.message : 'Error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-coal text-mist">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-coal/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <img src="/brand/cat-head.webp" alt="" className="h-9 w-9 rounded-full border-2 border-brand object-cover" />
            <div>
              <p className="font-display text-lg leading-none">
                <span className="text-white">FATCAT-</span>
                <span className="text-brand">3D</span>
              </p>
              <p className="text-xs text-mist/50">Panel de administración · {email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-mist/80 transition-colors hover:border-brand hover:text-brand"
            >
              <ExternalLink size={15} /> Ver sitio
            </a>
            <button
              onClick={() => setPwOpen(!pwOpen)}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-mist/80 transition-colors hover:border-brand hover:text-brand"
            >
              <KeyRound size={15} /> Contraseña
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm text-mist/80 transition-colors hover:bg-red-500/20 hover:text-red-300"
            >
              <LogOut size={15} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <AnimatePresence>
          {notice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed right-5 top-20 z-50 rounded-xl border border-brand/40 bg-smoke px-5 py-3 text-sm shadow-xl shadow-black/40"
            >
              {notice}
            </motion.div>
          )}
        </AnimatePresence>

        {pwOpen && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={changePassword}
            className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-smoke p-5"
          >
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex-1">
                <span className="mb-1 block text-xs text-mist/60">Contraseña actual</span>
                <input
                  type="password" required value={pwCurrent} onChange={(e) => setPwCurrent(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-coal px-3 py-2.5 text-sm outline-none focus:border-brand"
                />
              </label>
              <label className="flex-1">
                <span className="mb-1 block text-xs text-mist/60">Nueva (mín. 8)</span>
                <input
                  type="password" required minLength={8} value={pwNext} onChange={(e) => setPwNext(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-coal px-3 py-2.5 text-sm outline-none focus:border-brand"
                />
              </label>
              <button type="submit" className="rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-black hover:bg-brand-light">
                Actualizar
              </button>
            </div>
          </motion.form>
        )}

        {/* Subida */}
        <section className="mb-10">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInput.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-all ${
              dragOver ? 'border-brand bg-brand/10 scale-[1.01]' : 'border-white/15 bg-smoke hover:border-brand/50'
            }`}
          >
            {uploading ? (
              <Loader2 size={36} className="animate-spin text-brand" />
            ) : (
              <UploadCloud size={36} className="text-brand" />
            )}
            <p className="font-semibold text-white">
              {uploading ? 'Subiendo y optimizando…' : 'Arrastra tus fotos aquí o haz clic para elegir'}
            </p>
            <p className="text-sm text-mist/50">JPG, PNG, WebP — hasta 8 MB cada una · se convierten a WebP automáticamente</p>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) doUpload([...e.target.files])
                e.target.value = ''
              }}
            />
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Título para las próximas fotos (opcional, ej. «Soporte de celular»)"
              maxLength={120}
              className="flex-1 rounded-xl border border-white/10 bg-smoke px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </div>
        </section>

        {/* Lista */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-white">
              Galería <span className="text-brand">({items.length})</span>
            </h2>
            <p className="text-xs text-mist/50">Usa ↑↓ para ordenar. El orden se refleja en la página principal.</p>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-2xl bg-smoke" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-smoke py-14 text-mist/50">
              <ImagePlus size={34} />
              <p>Aún no hay fotos. Sube la primera con el formulario de arriba.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-smoke"
                >
                  <div className="aspect-square">
                    <img src={item.url} alt={item.caption} className="h-full w-full object-cover" loading="lazy" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coal/95 via-coal/60 to-transparent p-3 pt-10">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          autoFocus
                          value={editingText}
                          maxLength={120}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="flex-1 rounded-lg border border-brand/60 bg-coal px-3 py-1.5 text-sm outline-none"
                        />
                        <button onClick={() => saveCaption(item.id)} className="rounded-lg bg-brand p-2 text-black" aria-label="Guardar">
                          <Check size={15} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="rounded-lg bg-white/10 p-2 text-mist" aria-label="Cancelar">
                          <X size={15} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm text-white">{item.caption || <span className="text-mist/40">Sin título</span>}</span>
                        <button
                          onClick={() => startEdit(item)}
                          className="rounded-lg bg-white/10 p-2 text-mist/70 opacity-0 transition-opacity hover:text-brand group-hover:opacity-100"
                          aria-label="Editar título"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => move(item.id, -1)}
                      disabled={idx === 0}
                      className="rounded-lg bg-coal/80 p-2 text-mist backdrop-blur hover:text-brand disabled:opacity-30"
                      aria-label="Subir"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      onClick={() => move(item.id, 1)}
                      disabled={idx === items.length - 1}
                      className="rounded-lg bg-coal/80 p-2 text-mist backdrop-blur hover:text-brand disabled:opacity-30"
                      aria-label="Bajar"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="rounded-lg bg-coal/80 p-2 text-mist backdrop-blur hover:bg-red-500/30 hover:text-red-300"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-mist/40">
        <Link to="/" className="hover:text-brand">← Volver al sitio</Link> · Gestión interna de FATCAT-3D
      </footer>
    </div>
  )
}
