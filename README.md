# Istambul Döner Kebab Cieza · web demo

Vite + React + TypeScript + Tailwind + Framer Motion + react-three-fiber (3D con lazy-load).

```bash
npm i
npm run dev        # desarrollo
npm run build      # producción (dist/)
npm run media      # reprocesa public/media/raw -> public/media/{video,img} (ffmpeg + ImageMagick)
```

## Despliegue

| Destino | Variables de entorno | Build |
|---|---|---|
| GitHub Pages (por defecto) | ninguna | `npm run build` (workflow `.github/workflows/deploy.yml`, push a `main`) |
| Cloudflare Pages / dominio propio | `VITE_BASE=/` y `VITE_SITE_URL=https://tu-dominio.com` | `npm ci && npm run build`, salida `dist` |

`VITE_SITE_URL` es la URL pública absoluta del sitio. Con ella se generan canonical, `og:url`, `og:image`, la `url`/`image` del JSON-LD, `sitemap.xml` y `robots.txt`. Si no se define (con `VITE_BASE` definido), esos campos se omiten y el build avisa, en vez de publicar URLs de otro sitio.

`npx vite preview` lee la misma configuración: para previsualizar el build de Cloudflare en la raíz usa `VITE_BASE=/ npx vite preview`.

## Medios
Los originales viven en `public/media/raw/` (ignorado por git). Todo lo procesado está en `public/media/`.

## Datos que se rellenan en `src/data/site.ts`
- `site.delivery`: envío 1 €, pedido mínimo 6 €. `hours` (horario de reparto) está en `null` y no se muestra hasta confirmarlo.
- `site.platforms[].url`: enlaces de Glovo / Just Eat (si es `null`, no se muestran).
- `REVIEWS`: reseñas reales de Google (vacío = la sección no aparece).
- `PENDING`: datos legales del footer (titular, NIF, email) y lista de alérgenos.

## [CONFIRMAR]
Lo que no está confirmado por el dueño no se muestra en la web. Está documentado en `src/data/confirmar.ts`.

## Capturas
`docs/capturas/` (390 px y 1440 px).
