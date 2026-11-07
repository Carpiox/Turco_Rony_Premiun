import { MAIN_TACOS, MORE_TACOS, orderTaco } from '../data/tacos'
import type { Taco } from '../data/tacos'
import { imgSrc } from '../data/menu'
import { Reveal } from './Reveal'
import { Steam } from './Steam'
import { WhatsAppIcon } from './Icons'

function Card({ t, className = '' }: { t: Taco; className?: string }) {
  const ph = imgSrc(t.img)
  return (
    <article className={`flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/10 shadow-[0_16px_30px_-20px_rgba(20,16,14,.55)] ${className}`}>
      <div className="relative aspect-square overflow-hidden bg-ash">
        <img src={ph.src} srcSet={ph.srcSet} sizes="(min-width:768px) 480px, 92vw" alt={`Foto del taco: ${t.name}`} width={640} height={640} loading="lazy" decoding="async" className="foto h-full w-full object-cover" />
        <Steam />
        <span className="num absolute left-0 top-3 rounded-r">Nº {t.num}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.65rem] leading-tight text-ember">{t.name}</h3>
        <p className="mt-1.5 flex-1 text-[15px] leading-snug text-ink/75">{t.ingredients.join(', ')}.</p>
        <dl className="mt-4 flex gap-4 border-t border-dashed border-ink/20 pt-3">
          {t.prices.map((p) => (
            <div key={p.label}>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-smoke">{p.label}</dt>
              <dd className="whitespace-nowrap font-display text-[1.35rem] leading-none text-ink" style={{ fontVariationSettings: "'wght' 800" }}>{p.value}</dd>
              {p.note && <dd className="mt-0.5 text-[11px] text-smoke">{p.note}</dd>}
            </div>
          ))}
        </dl>
        <a href={orderTaco(t)} data-hide-fab target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-5 w-full"><WhatsAppIcon />Pedir este taco</a>
      </div>
    </article>
  )
}

export function TacosSection() {
  return (
    <section id="tacos" className="bg-crema py-14 text-ink sm:py-20">
      <div className="container-x">
        <Reveal>
          <h2 className="section-title">Los tacos</h2>
          <p className="mt-3 max-w-md text-lg text-ink/80">Pollo o mixto. Los dos llevan mozzarella, salsa Tacos Argelina, salsa blanca y las verduras que quieras.</p>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {MAIN_TACOS.map((t, i) => <Reveal key={t.id} delay={i * 0.1}><Card t={t} className="h-full" /></Reveal>)}
        </div>
        <Reveal className="mt-12"><h3 className="text-2xl sm:text-3xl">Si tienes más hambre</h3></Reveal>
        <div className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0" tabIndex={0} aria-label="Más tacos, desliza para verlos">
          {MORE_TACOS.map((t) => <Card key={t.id} t={t} className="w-[80%] shrink-0 snap-start sm:w-[22rem] lg:w-auto" />)}
        </div>
      </div>
    </section>
  )
}
