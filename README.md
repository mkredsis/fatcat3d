# FATCAT-3D — Sitio Web

Sitio web moderno para **FATCAT-3D**: fabricación de todo tipo de artículos con impresión 3D.

## Stack

- **React 19 + Vite 7 + TypeScript**
- **Tailwind CSS 4** (estilos)
- **Three.js + React Three Fiber** (escena 3D interactiva del hero)
- **Framer Motion** (animaciones y efectos de scroll)
- **Lucide** (iconos)
- Fuente del logo replicada: **Titan One** + texto de apoyo **Outfit**

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción en dist/
```

## Personalización rápida

| Qué | Dónde |
|---|---|
| WhatsApp, correo, Instagram, puerto | `src/config.ts` |
| Fotos de la galería | carpeta `src/assets/gallery/` (se cargan automáticamente) |
| Artes del logo de la cotización | carpeta `public/brand/` (quedan listas para integrar) |
| Colores de marca | `src/index.css` (bloque `@theme`) |
| Textos de secciones | archivos en `src/sections/` |

## Docker

```bash
docker build -t fatcat3d-web .
docker run -d --name fatcat3d-web -p 3107:80 fatcat3d-web
```

El sitio queda servido por nginx en el puerto **3107** del host.

## Despliegue automático (GitHub Actions → VPS)

El workflow `.github/workflows/deploy.yml` corre en tu **self-hosted runner** y es
completamente aislado: solo construye la imagen `fatcat3d-web` y levanta el contenedor
`fatcat3d-web`. **No toca los otros stacks/contenedores del VPS.**

### Configuración única (5 minutos)

1. **Crea la carpeta exclusiva en el VPS** (no compartir con otros proyectos):
   ```bash
   mkdir -p /opt/stacks/fatcat3d
   ```
2. En GitHub: **Settings > Secrets and variables > Actions > Variables** → crea:
   - `DEPLOY_DIR` = `/opt/stacks/fatcat3d`
3. Sube el código y haz push a `main` — el workflow hace el resto.
4. **Nginx Proxy Manager**: crea un Proxy Host:
   - **Domain**: `fatcat3d.<tudominio>` (el dominio base que ya tengas en NPM)
   - **Forward Hostname/IP**: `fatcat3d-web` *(el contenedor queda en la red `npm_proxy` — ver nota)*
   - **Forward Port**: `80`
   - Activa **Websockets Support** y el certificado SSL (Let's Encrypt).

> **Nota NPM:** el compose conecta el contenedor a la red externa `npm_proxy`.
> Si tus otros stacks usan otra red para NPM, cambia el nombre en
> `docker-compose.yml` por el de tu red (míralo con `docker network ls`).
> El workflow la crea solo si no existe; nunca modifica una red existente.
> Si prefieres no usar red compartida, basta con apuntar NPM a la IP del VPS
> y puerto `3107`.

## Estructura

```
├── .github/workflows/deploy.yml  # CI/CD aislado al VPS
├── Dockerfile                    # build multi-etapa → nginx
├── docker-compose.yml            # servicio único, red npm_proxy
├── nginx.conf                    # SPA fallback + cache + gzip
├── public/brand/                 # ← pon aquí los artes del logo
├── src/
│   ├── components/               # Logo SVG, Scene3D, Navbar, Reveal
│   ├── sections/                 # Hero, Servicios, Galería, Proceso,
│   │                             # Materiales, Contacto, Footer
│   ├── assets/gallery/           # ← fotos de trabajos (carga automática)
│   └── config.ts                 # datos de contacto y puerto
```
