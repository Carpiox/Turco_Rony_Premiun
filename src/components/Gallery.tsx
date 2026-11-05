import { useCallback, useEffect, useRef, useState } from 'react'
import { imgSrc } from '../data/menu'
import { media } from '../data/site'
import { LoopVideo } from './LoopVideo'
import { Reveal } from './Reveal'
import { PlayIcon } from './Icons'

type G = { id: string; kind: 'img' | 'vid'; name: string; alt: string }
// Máximo 6 elementos, todos cuadrados (1:1) con el mismo tratamiento de color
const GALLERY: G[] = [
  { id: 'p1', kind: 'img', name: 'tacos-xl-gratinado', alt: 'Dos tacos gratinados sobre una bandeja de madera, con el rulo de döner detrás' },
  { id: 'v1', kind: 'vid', name: 'gratinado-horno', alt: 'Tacos gratinados con el queso dorado' },
  { id: 'p2', kind: 'img', name: 'tacos-capas', alt: 'Taco cortado: capas de carne y queso' },
  { id: 'v2', kind: 'vid', name: 'prep-relleno', alt: 'Preparando el relleno de un taco' },
  { id: 'v3', kind: 'vid', name: 'prep-corte', alt: 'Cortando un taco especial' },
  { id: 'v4', kind: 'vid', name: 'tacos-bandejas', alt: 'Bandejas de tacos con patatas' },
]

function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (d: number) => void }) {
  const it = GALLERY[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
      if (e.key === 'Tab') { e.preventDefault(); closeRef.current?.focus() }
    }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; prev?.focus() }
  }, [onClose, onNav])

  const touch = useRef(0)
  return (
    <div role="dialog" aria-modal="true" aria-label={`Galería: ${it.alt}`} className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) onNav(d < 0 ? 1 : -1) }}>
      <div className="flex items-center justify-between p-4">
        <span className="text-sm text-sand">{index + 1} / {GALLERY.length}</span>
        <button ref={closeRef} onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border border-crema/30 text-xl" aria-label="Cerrar">✕</button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <button onClick={() => onNav(-1)} aria-label="Anterior" className="absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-ink/70 text-2xl">‹</button>
        {it.kind === 'img' ? (
          <img key={it.id} src={media(`img/${it.name}-1280.webp`)} alt={it.alt} className="max-h-full max-w-full rounded-xl object-contain" />
        ) : (
          <video key={it.id} className="max-h-full max-w-full rounded-xl" autoPlay muted loop playsInline controls poster={media(`video/${it.name}-poster.jpg`)} aria-label={it.alt}>
            <source src={media(`video/${it.name}.mp4`)} type="video/mp4" />
            <source src={media(`video/${it.name}.webm`)} type="video/webm" />
          </video>
        )}
        <button onClick={() => onNav(1)} aria-label="Siguiente" className="absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-ink/70 text-2xl">›</button>
      </div>
      <p className="p-4 text-center text-sm text-crema/80">{it.alt}</p>
    </div>
  )
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const nav = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length)), [])

  return (
    <section id="galeria" className="bg-ocre py-14 text-ink sm:py-20" aria-labelledby="gal-t">
      <div className="container-x">
        <Reveal><h2 id="gal-t" className="section-title">Mira cómo salen</h2></Reveal>
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4">
          {GALLERY.map((g, i) => (
            <button key={g.id} onClick={() => setOpen(i)} className="group relative block aspect-square overflow-hidden rounded-xl bg-ink ring-2 ring-ink" aria-label={`${g.kind === 'vid' ? 'Ver vídeo' : 'Ampliar foto'}: ${g.alt}`}>
              {g.kind === 'img' ? (
                <img src={imgSrc(g.name).src} srcSet={imgSrc(g.name).srcSet} sizes="(min-width:640px) 33vw, 50vw" alt="" width={640} height={640} loading="lazy" decoding="async" className="foto h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <>
                  <LoopVideo name={g.name} className="foto h-full w-full" mode="view" />
                  <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-ink/75 text-ocre" aria-hidden="true"><PlayIcon width={16} height={16} /></span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
      {open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}
    </section>
  )
}
