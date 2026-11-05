import { WA_ORDER, site } from '../data/site'
import { useOpenNow } from '../lib/open'
import { LoopVideo } from './LoopVideo'
import { DeliveryChip } from './DeliveryBar'
import { WhatsAppIcon } from './Icons'

export function Hero() {
  const open = useOpenNow()
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden text-center">
      <LoopVideo name="hero-gratinado" mode="idle" eager className="absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,9,7,.8)_0%,rgba(14,9,7,.45)_32%,rgba(14,9,7,.6)_60%,#0e0907_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_105%,rgba(194,48,31,.5),transparent_62%)]" aria-hidden="true" />

      <div className="container-x relative flex flex-col items-center pb-20 pt-32">
        <h1 className="flex flex-col items-center">
          <span className="eyebrow">Döner Kebab Cieza · el taco de la Gran Vía</span>
          <span className="mt-4 block text-[clamp(3.4rem,17vw,9.5rem)] leading-[.88] tracking-tight">
            Tacos<br /><span className="italic text-ocre-soft" style={{ fontVariationSettings: "'wght' 700" }}>gratinados</span>
          </span>
        </h1>
        <p className="mt-5 max-w-md text-lg leading-snug text-crema/95 sm:text-xl">
          Queso fundido, carne jugosa y salsa Tacos Argelina. A tu mesa o a tu puerta.
        </p>
        <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><WhatsAppIcon />Pedir por WhatsApp</a>
          <a href="#tacos" className="btn btn-ghost">Ver tacos</a>
        </div>
        <DeliveryChip className="mt-5" />
        <p className="mt-4 flex items-center gap-2 text-sm text-crema/85" aria-live="polite">
          <span className={`h-2.5 w-2.5 rounded-full ${open === null ? 'bg-sand/50' : open ? 'bg-[#34d27b] shadow-[0_0_10px_#34d27b]' : 'bg-ember-glow'}`} aria-hidden="true" />
          {open === null ? '' : open ? 'Abierto ahora · ' : 'Cerrado ahora · '}{site.hoursText.join(' y ')}
        </p>
      </div>
      <div className="kilim absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  )
}
