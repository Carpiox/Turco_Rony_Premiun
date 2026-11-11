#!/usr/bin/env bash
# Genera iconos, logo web e imagen para compartir (Open Graph) desde public/media/raw/LogoPrincipal.jpeg.
# Requiere ImageMagick. Uso: ./scripts/process-logo.sh
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=public/media/raw/LogoPrincipal.jpeg
HERO=public/media/raw/Tako.jpeg
OUT=public

# Logo circular con esquinas transparentes (el JPEG es cuadrado con fondo negro)
# circle <tamaño> <opciones de salida y archivo...>
circle() {
  local s=$1; shift
  convert "$SRC" -resize ${s}x${s} -alpha set \
    \( -size ${s}x${s} xc:none -fill white -draw "circle $((s/2)),$((s/2)) $((s/2)),1" \) \
    -compose DstIn -composite "$@"
}
circle 512 PNG32:$OUT/logo-512.png
circle 192 PNG32:$OUT/logo-192.png
circle 32 PNG32:$OUT/favicon-32.png
circle 96 -quality 90 $OUT/logo-96.webp
# Apple touch icon: opaco, fondo negro y el logo con margen
convert -size 180x180 xc:black \( $OUT/logo-512.png -resize 156x156 \) -gravity center -composite -depth 8 -strip $OUT/apple-touch-icon.png

# Imagen para compartir 1200x630: logo a la izquierda sobre rojo, foto real del taco a la derecha
convert -size 1200x630 xc:'#c8202a' \
  \( "$HERO" -auto-orient -resize x630^ -gravity center -crop 570x630+0+0 +repage -modulate 102,108 \) -gravity northwest -geometry +630+0 -composite \
  \( $OUT/logo-512.png -resize 500x500 \( +clone -background black -shadow 55x14+0+10 \) +swap -background none -layers merge +repage \) \
     -gravity northwest -geometry +65+65 -composite \
  -strip -quality 84 $OUT/og.jpg
