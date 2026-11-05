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

## Pendientes `[ENTRE CORCHETES]`
Búscalos con `grep -rn "\[" src index.html | grep "[A-ZÁÉÍÓÚ]\{3,\}"`. Datos en `src/data/site.ts` (`PENDING`, `site.delivery`).
