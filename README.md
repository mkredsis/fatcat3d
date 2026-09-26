# FATCAT-3D — Sitio Web + Panel de Administración

Sitio web moderno para **FATCAT-3D**: fabricación de todo tipo de artículos con impresión 3D.
Incluye panel de administración para gestionar la galería de impresiones (más módulos próximamente).

## Stack

**Frontend**
- React 19 + Vite 7 + TypeScript + React Router 7
- Tailwind CSS 4
- Three.js + React Three Fiber (escena 3D del hero)
- Framer Motion (animaciones) · Lucide (iconos)
- Fuentes: Titan One (logo) + Outfit (texto)

**Backend** (`server/`)
- Node.js 22 + Express 4
- Base de datos: **SQLite vía `node:sqlite`** (integrada en Node, sin compilación nativa)
- Auth: **JWT en cookie httpOnly** + bcryptjs (costo 12) + rate-limit en login
- Imágenes: **sharp** (conversión automática a WebP, máx. 1600px)
- Seguridad: helmet (CSP), compresión, CORS no requerido (mismo origen)

## Desarrollo local

```bash
# Frontend (http://localhost:5173)
npm install
npm run dev

# Backend (http://localhost:8080)
cd server
npm install
$env:PORT=8080   # o PORT=8080 en Linux/macOS
npm run dev
```

## Panel de administración (`/admin`)

1. En el primer acceso, `/admin/login` muestra **"Crear cuenta de administrador"** (solo disponible mientras no exista ningún admin).
2. Desde el panel puedes **subir fotos** (arrastra y suelta), ponerles título, **reordenarlas** con flechas y **eliminarlas**.
3. Los cambios se ven al instante en la sección **Galería** de la página principal.
4. También puedes **cambiar la contraseña** desde el mismo panel.

### API REST (resumen)

| Endpoint | Acceso | Descripción |
|---|---|---|
| `GET /api/health` | público | Healthcheck del servicio |
| `GET /api/gallery` | público | Lista fotos de la galería |
| `POST /api/auth/setup` | solo si no hay admin | Crea el administrador |
| `POST /api/auth/login` | público (rate-limited) | Inicia sesión (cookie JWT) |
| `POST /api/auth/logout` | público | Cierra sesión |
| `GET /api/auth/me` | autenticado | Datos del admin actual |
| `POST /api/auth/password` | autenticado | Cambiar contraseña |
| `POST /api/gallery` | autenticado | Subir 1-10 imágenes (multer) |
| `PUT /api/gallery/:id` | autenticado | Editar título |
| `POST /api/gallery/reorder` | autenticado | Reordenar galería |
| `DELETE /api/gallery/:id` | autenticado | Eliminar foto (y archivo) |

## Docker

```bash
docker build -t fatcat3d-web .
docker run -d --name fatcat3d-web \
  -p 3107:80 \
  -v fatcat3d-data:/data \
  fatcat3d-web
```

El volumen **`fatcat3d-data`** guarda: la base SQLite, las fotos subidas y el secreto JWT (se autogenera en el primer arranque). Sobrevive a los redespliegues.

## Despliegue (GitHub Actions → VPS Oracle)

Workflow: `.github/workflows/deploy.yml` — runner self-hosted dedicado
(`oracle-vps-free-fatcat3d`, label `fatcat3d`). Aislado: solo toca el contenedor
`fatcat3d-web` y el volumen `fatcat3d-data`.

En cada push a `main`:
1. `docker build` de la imagen multi-etapa (frontend + backend).
2. Backup del `docker inspect` del contenedor actual.
3. Recreación del contenedor en `ubuntu_vps-network` (puerto solo en `127.0.0.1:3107`).
4. Healthcheck local y público (`https://fatcat3d.mkredsis.duckdns.org`).

## Estructura

```
├── .github/workflows/deploy.yml   # CI/CD al VPS (runner propio, aislado)
├── Dockerfile                     # build multi-etapa: frontend + backend
├── docker-compose.yml             # referencia (el deploy usa docker run)
├── public/brand/                  # logo oficial + recortes
├── server/                        # BACKEND
│   └── src/
│       ├── index.js               # Express: seguridad, estáticos, SPA
│       ├── db.js                  # SQLite (node:sqlite), tablas
│       ├── auth.js                # JWT cookie + secreto persistente
│       └── routes/
│           ├── auth.js            # setup, login, logout, password
│           └── gallery.js         # CRUD galería + uploads (sharp)
├── src/                           # FRONTEND
│   ├── pages/                     # AdminLogin, AdminDashboard
│   ├── components/                # Logo, Scene3D, Navbar, Reveal
│   ├── sections/                  # Hero, Servicios, Galería, etc.
│   ├── lib/api.ts                 # cliente fetch de la API
│   └── config.ts                  # datos de contacto
└── src/assets/gallery/            # fotos empaquetadas (fallback si API vacía)
```

## Producción

- Sitio: <https://fatcat3d.mkredsis.duckdns.org>
- Panel admin: <https://fatcat3d.mkredsis.duckdns.org/admin>
- Datos persistentes: volumen Docker `fatcat3d-data` en el VPS (`/var/lib/docker/volumes/fatcat3d-data`)
