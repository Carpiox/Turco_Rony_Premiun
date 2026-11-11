import { useEffect, useState } from 'react'
import { BASE, WA_ORDER } from '../data/site'
import { WhatsAppIcon } from './Icons'

const LINKS = [
  ['#tacos', 'Tacos'],
  ['#monta', 'Monta el tuyo'],
  ['#galeria', 'Galería'],
  ['#carta', 'Carta'],
  ['#donde', 'Cómo llegar'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-9 z-40 transition-colors duration-300 bg-ink shadow-[0_1px_0_rgba(244,200,28,.25)]`}>
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Istambul Döner Kebab Cieza, inicio">
          <img src={`${BASE}logo-96.webp`} width={44} height={44} alt="" className="h-11 w-11 shrink-0 rounded-full" />
          <span className="font-display text-[1.05rem] leading-none" style={{ fontVariationSettings: "'wght' 800" }}>
            ISTAMBUL<br /><span className="text-ocre text-[.62rem] tracking-[.17em]">DÖNER KEBAB CIEZA</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {LINKS.map(([h, l]) => (
            <a key={h} href={h} className="text-sm font-semibold text-crema/85 transition hover:text-ocre-soft">{l}</a>
          ))}
          <a href={WA_ORDER} data-hide-fab target="_blank" rel="noopener noreferrer" className="btn btn-wa !min-h-[42px] !px-5 !py-2"><WhatsAppIcon />Pedir</a>
        </nav>

        <button className="grid h-11 w-11 place-items-center rounded-full border border-crema/25 md:hidden" aria-expanded={open} aria-controls="menu-movil" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-crema transition ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1/2 h-0.5 w-5 bg-crema transition ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-crema transition ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal móvil" className="container-x flex h-[calc(100svh-6.25rem)] flex-col gap-1 pt-6 md:hidden">
          {LINKS.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="border-b border-crema/15 py-4 font-display text-3xl" style={{ fontVariationSettings: "'wght' 800" }}>{l}</a>
          ))}
          <a href={WA_ORDER} data-hide-fab target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-6 w-full"><WhatsAppIcon />Pedir por WhatsApp</a>
        </nav>
      )}
    </header>
  )
}
