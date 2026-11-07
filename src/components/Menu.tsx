import { useState } from 'react'
import { FILTERS, MENU } from '../data/menu'
import type { Item, Tag } from '../data/menu'

function Row({ item }: { item: Item }) {
  const [main, ...rest] = item.prices as (Item['prices'][number] | undefined)[]
  const label = item.tags.includes('tacos') ? `T${item.num}` : item.num ? String(item.num) : '·'
  return (
    <li className="grid grid-cols-[2.4rem_1fr_auto] items-start gap-x-3 border-b border-ink/15 py-3.5">
      <span className="num rounded-sm" aria-label={item.num ? `Número ${label}` : undefined}>{label}</span>
      <div>
        <h3 className="text-lg font-extrabold leading-tight text-ember" style={{ fontFamily: 'inherit' }}>{item.name}</h3>
        {item.desc && <p className="mt-0.5 text-sm leading-snug text-ink/70">{item.desc}</p>}
        {rest.length > 0 && (
          <p className="mt-1 text-[13px] leading-snug text-ink/80">
            {rest.map((p, i) => p && <span key={p.label} className={p.menu ? 'font-bold text-ink' : ''}>{i > 0 && ' · '}{p.label} {p.value}{p.note ? ` (${p.note})` : ''}</span>)}
          </p>
        )}
      </div>
      {main && (
        <div className="text-right">
          {main.label && <div className="text-[11px] uppercase text-smoke">{main.label}</div>}
          <div className="font-display text-xl leading-none text-ink" style={{ fontVariationSettings: "'wght' 800" }}>{main.value}</div>
        </div>
      )}
    </li>
  )
}

/** Carta completa, plegada por defecto: solo texto y precios, como el panel del local. */
export function Menu() {
  const [open, setOpen] = useState(false)
  const [f, setF] = useState<Tag | 'todo'>('todo')
  const items = MENU.filter((i) => f === 'todo' || i.tags.includes(f))

  return (
    <section id="carta" className="bg-paper py-12 text-ink sm:py-16" aria-labelledby="carta-t">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="carta-t" className="section-title !text-[2.2rem] sm:!text-5xl">La carta</h2>
            <p className="mt-2 max-w-md text-ink/75">Kebab, dürum, platos y entrantes. Los menús llevan patatas y bebida.</p>
          </div>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="carta-completa" className="btn border-2 border-ink bg-ink text-crema hover:bg-ember hover:border-ember">
            {open ? 'Ocultar carta' : 'Ver carta completa'}<span aria-hidden="true" className={`transition ${open ? 'rotate-180' : ''}`}>▾</span>
          </button>
        </div>

        <div id="carta-completa" hidden={!open}>
          {open && (
            <div data-hide-fab className="pt-6">
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filtrar la carta">
                {FILTERS.map((x) => (
                  <button key={x.id} onClick={() => setF(x.id)} aria-pressed={f === x.id}
                    className={`min-h-[44px] shrink-0 rounded-full border-2 px-4 text-sm font-bold transition ${f === x.id ? 'border-ink bg-ink text-crema' : 'border-ink/25 hover:border-ink'}`}>{x.label}</button>
                ))}
              </div>
              <ul className="mt-2 grid gap-x-10 md:grid-cols-2" aria-live="polite">
                {items.map((it) => <Row key={it.id} item={it} />)}
              </ul>
              <p className="mt-5 text-sm text-smoke">¿Alergias o dudas? Mira la nota de alérgenos en el pie de página o pregúntanos.</p>
              <button onClick={() => { setOpen(false); document.getElementById('carta')?.scrollIntoView() }} className="btn mt-4 border-2 border-ink">Ocultar carta</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
