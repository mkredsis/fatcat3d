export interface GalleryItem {
  id: number
  url: string
  caption: string
  position: number
}

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, { credentials: 'include', ...options })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError((data as { error?: string }).error || 'Error del servidor', res.status)
  return data as T
}

export const api = {
  setupAvailable: () => req<{ setup: boolean }>('/api/auth/setup-available'),
  setup: (email: string, password: string) =>
    req('/api/auth/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }),
  login: (email: string, password: string) =>
    req('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }),
  logout: () => req('/api/auth/logout', { method: 'POST' }),
  me: () => req<{ email: string }>('/api/auth/me'),
  changePassword: (current: string, next: string) =>
    req('/api/auth/password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ current, next }) }),

  gallery: () => req<GalleryItem[]>('/api/gallery'),
  upload: (files: File[], caption: string) => {
    const form = new FormData()
    files.forEach((f) => form.append('images', f))
    if (caption) form.append('caption', caption)
    return req<GalleryItem[]>('/api/gallery', { method: 'POST', body: form })
  },
  updateCaption: (id: number, caption: string) =>
    req(`/api/gallery/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caption }) }),
  reorder: (ids: number[]) =>
    req('/api/gallery/reorder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids }) }),
  remove: (id: number) => req(`/api/gallery/${id}`, { method: 'DELETE' }),
}
