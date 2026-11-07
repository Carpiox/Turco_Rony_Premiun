#!/usr/bin/env bash
# Procesa public/media/raw -> public/media/{video,img}. Requiere ffmpeg + ImageMagick.
set -euo pipefail
cd "$(dirname "$0")/../public/media"
R=raw; V=video; I=img

# clip nombre origen inicio duración filtro
clip() {
  local name=$1 src=$2 ss=$3 t=$4 vf=$5
  ffmpeg -v error -y -ss "$ss" -t "$t" -i "$R/$src" -an -vf "$vf,setsar=1" \
    -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 29 -preset slow -movflags +faststart "$V/$name.mp4"
  ffmpeg -v error -y -ss "$ss" -t "$t" -i "$R/$src" -an -vf "$vf,setsar=1" \
    -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -pix_fmt yuv420p "$V/$name.webm"
  ffmpeg -v error -y -ss "$(echo "$ss + 1" | bc)" -i "$R/$src" -vf "$vf" -frames:v 1 -q:v 4 "$V/$name-poster.jpg"
}
# Recorte inferior 13% para eliminar marcas InShot/TikTok; ancho par
CROPB="crop=iw:trunc(ih*0.84/2)*2:0:0,scale='min(720,iw)':-2"
clip hero-gratinado   VideoTAko.mp4           0.2 8   "scale='min(1024,iw)':-2"
clip prep-relleno     VideoPreparacionTako.mp4 0   6   "$CROPB"
clip prep-corte       VideoPreparacionTako.mp4 26  7   "$CROPB"
clip tacos-bandejas   TacosTacosTacos.mp4      4   5   "$CROPB"
clip tacos-plancha    TacosTacosTacos.mp4      15.5 5.5 "$CROPB"
CROPT="crop=iw:trunc(ih*0.73/2)*2:0:0,scale='min(720,iw)':-2"  # el logo de TikTok llega al 85% de la altura
clip gratinado-horno  CarneTacos.mp4           64  6   "$CROPT"

# foto salida origen "geometria crop" (vacío = completa)
photo() {
  local name=$1 src=$2 crop=${3:-}
  local base=(-auto-orient)
  [ -n "$crop" ] && base+=(-crop "$crop" +repage)
  base+=(-auto-gamma -modulate 102,110 -unsharp 0x0.8 -strip)
  convert "$R/$src" "${base[@]}" -resize '640x640>' -quality 80 "$I/$name-640.webp"
  convert "$R/$src" "${base[@]}" -resize '1280x1280>' -quality 80 "$I/$name-1280.webp"
}
# Fotos reales
photo tacos-pollo-crispy   Tako.jpeg
photo tacos-tiras          Tako2.jpeg
photo tacos-horno          TakoJuntoAPollo.jpeg
photo tacos-especial       fotoTaco.jpeg
photo tacos-capas          FotoTacoPartido.jpeg
# TacoXL: quitar barras negras de la captura y la marca de TikTok
ffmpeg -v error -y -i $R/TacoXLGratinado.jpeg -vf "crop=922:830:0:410" -frames:v 1 -q:v 2 /tmp/_taco_xl.jpg
cp /tmp/_taco_xl.jpg /tmp/_taco_xl_src.jpg
R_BAK=$R; R=/tmp; photo tacos-xl-gratinado _taco_xl_src.jpg; R=$R_BAK

# Hero: la foto más nítida (Tako.jpeg, 1600x1200) sin ampliar por encima de su resolución
for w in 800 1600; do
  convert $R/Tako.jpeg -auto-orient -auto-gamma -modulate 102,108 -unsharp 0x0.7 -strip -resize "${w}x>" -quality 82 "$I/hero-taco-$w.webp"
done
