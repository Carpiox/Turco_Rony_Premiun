import { useCallback, useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { imgSrc } from '../data/menu'
import { media } from '../data/site'
import { LoopVideo } from './LoopVideo'
import { Reveal } from './Reveal'
import { PlayIcon } from './Icons'

type G = { id: string; kind: 'img' | 'vid'; name: string; alt: string; ratio: string }
const GALLERY: G[] = [
  { id: 'p1', kind: 'img', name: 'tacos-xl-gratinado', alt: 'Tacos XXL gratinados con queso frente al rulo de döner', ratio: '10/9' },
  { id: 'v1', kind: 'vid', name: 'gratinado-horno', alt: 'Tacos gratinados saliendo del horno', ratio: '9/14' },
  { id: 'p2', kind: 'img', name: 'tacos-pollo-crispy', alt: 'Tacos con tiras de pollo crispy y pimientos', ratio: '4/3' },
  { id: 'v2', kind: 'vid', name: 'prep-relleno', alt: 'Preparando el relleno de un taco', ratio: '9/14' },
  { id: 'p3', kind: 'img', name: 'tacos-horno', alt: 'Taco gratinado sobre bandeja de madera', ratio: '3/4' },
  { id: 'v3', kind: 'vid', name: 'tacos-plancha', alt: 'Taco marcado en la plancha', ratio: '9/14' },
  { id: 'p4', kind: 'img', name: 'tacos-especial', alt: 'Taco especial abierto, con pollo y queso', ratio: '3/4' },
  { id: 'v4', kind: 'vid', name: 'prep-corte', alt: 'Cortando un taco especial', ratio: '9/14' },
  { id: 'p5', kind: 'img', name: 'tacos-capas', alt: 'Corte de taco con capas de carne y queso', ratio: '3/4' },
  { id: 'v5', kind: 'vid', name: 'tacos-bandejas', alt: 'Bandejas de tacos con patatas listas para servir', ratio: '9/14' },
  { id: 'p6', kind: 'img', name: 'tacos-tiras', alt: 'Taco gratinado con tiras de pollo crispy', ratio: '3/4' },
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
    <section id="galeria" className="py-20 sm:py-28" aria-labelledby="gal-t">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Galería de tacos</p>
          <h2 id="gal-t" className="section-title mt-3">Del horno <span className="text-ocre-soft italic">a tu mano</span></h2>
          <p className="mt-4 max-w-lg text-crema/75">Así se montan, se gratinan y salen. Toca una foto o un vídeo para verlo grande.</p>
        </Reveal>
        <div className="mt-8 columns-2 gap-3 sm:columns-3 sm:gap-4">
          {GALLERY.map((g, i) => (
            <m.div key={g.id} className="mb-3 break-inside-avoid sm:mb-4" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -6% 0px' }} transition={{ duration: 0.6, delay: (i % 3) * 0.07 }}>
              <button onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-2xl border border-ocre/15 text-left" aria-label={`${g.kind === 'vid' ? 'Ver vídeo' : 'Ampliar foto'}: ${g.alt}`}>
                {g.kind === 'img' ? (
                  <img src={imgSrc(g.name).src} srcSet={imgSrc(g.name).srcSet} sizes="(min-width:640px) 33vw, 50vw" alt="" loading="lazy" decoding="async"
                    style={{ aspectRatio: g.ratio }} className="w-full object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <>
                    <LoopVideo name={g.name} className="w-full" mode="view" ratio="2/3" />
                    <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-ink/70 text-ocre-soft" aria-hidden="true"><PlayIcon width={16} height={16} /></span>
                  </>
                )}
              </button>
            </m.div>
          ))}
        </div>
      </div>
      {open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}
    </section>
  )
}
