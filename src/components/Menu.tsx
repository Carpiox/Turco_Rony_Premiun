import { useState } from 'react'
import { m } from 'framer-motion'
import { FILTERS, MENU, imgSrc } from '../data/menu'
import type { Item, Tag } from '../data/menu'
import { media } from '../data/site'
import { Reveal } from './Reveal'

function Card({ item, i }: { item: Item; i: number }) {
  const photo = item.img ? imgSrc(item.img) : item.poster ? { src: media(`video/${item.poster}`), srcSet: undefined } : null
  const [main, ...rest] = item.prices as (Item['prices'][number] | undefined)[]
  return (
    <m.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ocre/15 bg-coal shadow-[0_18px_40px_-24px_rgba(0,0,0,.9)]"
    >
      {photo ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-ash">
          <img src={photo.src} srcSet={photo.srcSet} sizes="(min-width:1024px) 360px, (min-width:640px) 45vw, 92vw" alt={`Foto de ${item.name}`} width={640} height={480} loading="lazy" decoding="async"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent" aria-hidden="true" />
        </div>
      ) : (
        <div className="kilim h-3" aria-hidden="true" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            {item.num && <span className="mb-1 inline-block rounded bg-ocre px-1.5 text-xs font-extrabold text-ink" aria-label={`Número ${item.num}`}>Nº {item.num}</span>}
            <h3 className="text-[1.35rem] leading-tight">{item.name}</h3>
          </div>
          <div className="shrink-0 text-right">
            {main?.label && <div className="text-[11px] uppercase tracking-wider text-sand">{main.label}</div>}
            {main && <div className="font-display text-2xl text-ocre-soft" style={{ fontVariationSettings: "'wght' 800" }}>{main.value}</div>}
          </div>
        </div>
        {item.desc && <p className="mt-2 text-sm leading-relaxed text-crema/70">{item.desc}</p>}
        {rest.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-dashed border-crema/15 pt-3 text-sm">
            {rest.map((p) => p && (
              <li key={p.label} className={`flex items-baseline gap-2 ${p.menu ? 'text-ocre-soft' : 'text-crema/85'}`}>
                <span className="font-semibold">{p.label}</span>
                {p.note && <span className="text-xs text-sand">({p.note})</span>}
                <span className="mb-1 flex-1 border-b border-dotted border-crema/20" aria-hidden="true" />
                <span className="font-bold tabular-nums">{p.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </m.article>
  )
}

export function Menu() {
  const [f, setF] = useState<Tag | 'todo'>('todo')
  const items = MENU.filter((i) => f === 'todo' || i.tags.includes(f))
  const count = (id: Tag | 'todo') => (id === 'todo' ? MENU.length : MENU.filter((i) => i.tags.includes(id)).length)

  return (
    <section id="carta" className="relative py-20 sm:py-28" aria-labelledby="carta-t">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Nuestra carta</p>
          <h2 id="carta-t" className="section-title mt-3 max-w-xl">Elige tu <span className="text-ocre-soft italic">antojo</span></h2>
          <p className="mt-4 max-w-lg text-crema/75">Todos los menús llevan patatas y bebida. Los dürum, kebab y tacos puedes pedirlos en grande o XXXL.</p>
        </Reveal>

        <div className="sticky top-[6.25rem] z-20 -mx-4 mt-8 bg-ink/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6" role="group" aria-label="Filtrar la carta">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((x) => (
              <button key={x.id} onClick={() => setF(x.id)} aria-pressed={f === x.id}
                className={`min-h-[44px] shrink-0 rounded-full border px-5 text-sm font-bold transition ${f === x.id ? 'border-ember bg-ember text-white shadow-[0_6px_20px_-6px_rgba(194,48,31,.9)]' : 'border-crema/20 text-crema/85 hover:border-ocre'}`}>
                {x.label} <span className={`ml-1 text-xs ${f === x.id ? 'text-white' : 'opacity-75'}`}>{count(x.id)}</span>
              </button>
            ))}
          </div>
        </div>

        <div key={f} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {items.map((it, i) => <Card key={it.id} item={it} i={i} />)}
        </div>
        <p className="mt-8 text-sm text-sand">
          Precios con IVA incluido [CONFIRMAR]. ¿Dudas con alérgenos o vegetarianos? <a className="underline decoration-ocre underline-offset-4" href="#legal-alergenos">Mira la nota de alérgenos</a>.
        </p>
      </div>
    </section>
  )
}
