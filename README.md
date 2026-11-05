# Döner Kebab Cieza · web demo

Vite + React + TypeScript + Tailwind + Framer Motion + react-three-fiber (3D con lazy-load).

```bash
npm i
npm run dev        # desarrollo
npm run build      # producción (dist/)
npm run media      # reprocesa public/media/raw -> public/media/{video,img} (ffmpeg + ImageMagick)
```

## Despliegue
GitHub Pages con `.github/workflows/deploy.yml` (push a `main`). En *Settings → Pages* elige **GitHub Actions**.
`base` es `/Turco_Rony_Premiun/`; con dominio propio: `VITE_BASE=/ npm run build` y cambia las URLs de `index.html`, `robots.txt` y `sitemap.xml`.

## Medios
Los originales viven en `public/media/raw/` (ignorado por git). Todo lo procesado está en `public/media/`.

## Datos que se rellenan en `src/data/site.ts`
- `site.delivery`: envío 1 €, pedido mínimo 6 €. `hours` (horario de reparto) está en `null` y no se muestra hasta confirmarlo.
- `site.platforms[].url`: enlaces de Glovo / Just Eat (si es `null`, no se muestran).
- `REVIEWS`: reseñas reales de Google (vacío = la sección no aparece).
- `PENDING`: datos legales del footer (titular, NIF, email) y lista de alérgenos.
