# ---------- Etapa 1: build del frontend ----------
FROM node:22-bookworm-slim AS frontend-builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- Etapa 2: dependencias del backend ----------
FROM node:22-bookworm-slim AS server-deps

WORKDIR /srv
COPY server/package.json server/package-lock.json ./server/
# sharp + node:sqlite: binarios ya disponibles (no se compila nada)
RUN cd server && npm ci --omit=dev --no-audit --no-fund

# ---------- Etapa 3: producción ----------
FROM node:22-bookworm-slim

ENV NODE_ENV=production \
    PORT=80 \
    PUBLIC_DIR=/srv/public \
    DATA_DIR=/data

WORKDIR /srv

COPY --from=server-deps /srv/server/node_modules server/node_modules
COPY server/package.json server/package.json
COPY server/src server/src
COPY --from=frontend-builder /app/dist public

RUN mkdir -p /data/uploads

EXPOSE 80
VOLUME ["/data"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server/src/index.js"]
