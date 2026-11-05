import { WA_ORDER, site } from '../data/site'
import { useOpenNow } from '../lib/open'
import { LoopVideo } from './LoopVideo'
import { WhatsAppIcon } from './Icons'

export function Hero() {
  const open = useOpenNow()
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <LoopVideo name="hero-gratinado" mode="idle" eager className="absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,9,7,.75)_0%,rgba(14,9,7,.5)_35%,rgba(14,9,7,.92)_80%,#0e0907_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_100%,rgba(194,48,31,.45),transparent_60%)]" aria-hidden="true" />

      <div className="container-x relative pb-16 pt-28 sm:pb-24">
        <p className="hero-in eyebrow flex items-center gap-2">
          <span>Cocina turca</span><span aria-hidden="true">·</span><span>Gran Vía, Cieza</span>
        </p>
        <h1 className="mt-3 text-[clamp(3.1rem,15vw,8.5rem)] leading-[.9] tracking-tight">
          Döner<br />
          <span className="text-ocre-soft italic" style={{ fontVariationSettings: "'wght' 700" }}>Kebab</span> Cieza
        </h1>
        <p className="hero-in d2 mt-5 max-w-md text-lg leading-snug text-crema/90 sm:text-xl">
          Kebab, dürum y tacos con queso fundido. Abierto todos los días, hasta las 00:45.
        </p>
        <div className="hero-in d3 mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><WhatsAppIcon />Pedir por WhatsApp</a>
          <a href="#carta" className="btn btn-ghost">Ver carta</a>
        </div>
        <p className="hero-in d3 mt-6 flex items-center gap-2 text-sm text-crema/80" aria-live="polite">
          <span className={`h-2.5 w-2.5 rounded-full ${open === null ? 'bg-sand/50' : open ? 'bg-[#34d27b] shadow-[0_0_10px_#34d27b]' : 'bg-ember-glow'}`} aria-hidden="true" />
          {open === null ? site.hoursText.join(' y ') : open ? 'Abierto ahora' : 'Cerrado ahora'} · {site.hoursText.join(' y ')}
        </p>
      </div>
      <div className="kilim absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  )
}
