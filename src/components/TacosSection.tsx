import { MAIN_TACOS, MORE_TACOS, orderTaco } from '../data/tacos'
import type { Taco } from '../data/tacos'
import { imgSrc } from '../data/menu'
import { media } from '../data/site'
import { Reveal } from './Reveal'
import { Steam } from './Steam'
import { DeliveryChip } from './DeliveryBar'
import { WhatsAppIcon } from './Icons'

const photoOf = (t: Taco) => (t.img ? imgSrc(t.img) : t.poster ? { src: media(`video/${t.poster}`), srcSet: undefined } : null)

function Big({ t, i }: { t: Taco; i: number }) {
  const ph = photoOf(t)
  return (
    <Reveal delay={i * 0.12}>
      <article className="group relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden rounded-3xl border border-ocre/25 bg-coal shadow-[0_30px_60px_-30px_rgba(0,0,0,.95)] md:min-h-[640px]">
        {ph && <img src={ph.src} srcSet={ph.srcSet} sizes="(min-width:768px) 560px, 94vw" alt={`Foto real de ${t.name}`} width={800} height={1000} loading="lazy" decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105" />}
        <Steam />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(14,9,7,.15)_0%,rgba(14,9,7,.1)_30%,rgba(14,9,7,.88)_66%,#0e0907_100%)]" aria-hidden="true" />
        <div className="p-6 pt-40 sm:p-8">
          <p className="eyebrow">{t.kicker}</p>
          <h3 className="mt-1 text-[2.1rem] leading-[1.02] sm:text-4xl">{t.name}</h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Ingredientes">
            {t.ingredients.map((x) => <li key={x} className="rounded-full border border-crema/25 bg-ink/50 px-3 py-1 text-[13px] text-crema/90 backdrop-blur-sm">{x}</li>)}
          </ul>
          <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-dashed border-crema/20 pt-4">
            {t.prices.map((p) => (
              <div key={p.label}>
                <dt className="text-[11px] uppercase tracking-wider text-sand">{p.label}</dt>
                <dd className="font-display text-[1.7rem] leading-none text-ocre-soft" style={{ fontVariationSettings: "'wght' 800" }}>{p.value}</dd>
                {p.note && <dd className="mt-1 text-[11px] text-sand">{p.note}</dd>}
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href={orderTaco(t)} target="_blank" rel="noopener noreferrer" className="btn btn-wa w-full sm:w-auto"><WhatsAppIcon />Pedir este taco</a>
            <DeliveryChip />
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function Small({ t, i }: { t: Taco; i: number }) {
  const ph = photoOf(t)
  return (
    <Reveal delay={i * 0.08}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ocre/15 bg-coal">
        <div className="relative aspect-[4/3] overflow-hidden bg-ash">
          {ph && <img src={ph.src} srcSet={ph.srcSet} sizes="(min-width:768px) 360px, 92vw" alt={`Foto real de ${t.name}`} width={640} height={480} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
          <Steam />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="eyebrow !text-[10px]">{t.kicker}</p>
          <h3 className="mt-1 text-2xl leading-tight">{t.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-crema/70">{t.ingredients.join(' · ')}</p>
          <div className="mt-4 flex items-end justify-between gap-3 border-t border-dashed border-crema/15 pt-3">
            <div className="text-sm">{t.prices.map((p) => <div key={p.label} className="text-crema/80">{p.label} <strong className="text-ocre-soft">{p.value}</strong></div>)}</div>
            <a href={orderTaco(t)} target="_blank" rel="noopener noreferrer" className="btn btn-wa !min-h-[44px] !px-4 !py-2 !text-sm"><WhatsAppIcon width={18} height={18} />Pedir</a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function TacosSection() {
  return (
    <section id="tacos" className="tile-bg py-20 sm:py-28" aria-labelledby="tacos-t">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">El producto estrella</p>
          <h2 id="tacos-t" className="section-title mt-3 max-w-2xl">Nuestros <span className="italic text-ocre-soft">tacos</span></h2>
          <p className="mt-4 max-w-lg text-lg text-crema/80">Elige entre pechuga de pollo o mixto de ternera y pollo. Los dos con queso mozzarella, salsa Tacos Argelina y salsa blanca.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {MAIN_TACOS.map((t, i) => <Big key={t.id} t={t} i={i} />)}
        </div>
        <Reveal className="mt-14">
          <h3 className="text-2xl sm:text-3xl">Más tacos <span className="italic text-ocre-soft">para los que quieren más</span></h3>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MORE_TACOS.map((t, i) => <Small key={t.id} t={t} i={i} />)}
        </div>
      </div>
    </section>
  )
}
