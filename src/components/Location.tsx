import { useState } from 'react'
import { mapsEmbed, mapsLink, site, WA_ORDER } from '../data/site'
import { Reveal } from './Reveal'
import { AfterHoursNote, DeliveryChip } from './DeliveryBar'
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './Icons'

export function Location() {
  const [map, setMap] = useState(false)
  return (
    <section id="donde" className="py-20 sm:py-28" aria-labelledby="donde-t">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Cómo llegar</p>
          <h2 id="donde-t" className="section-title mt-3">Te esperamos en la <span className="text-ocre-soft italic">Gran Vía</span></h2>
          <ul className="mt-7 space-y-5 text-lg">
            <li className="flex gap-3"><PinIcon className="mt-1 shrink-0 text-ember-glow" /><address className="not-italic">{site.street}<br />{site.city}</address></li>
            <li className="flex gap-3"><ClockIcon className="mt-1 shrink-0 text-ember-glow" />
              <div><strong className="block">Todos los días</strong>{site.hoursText.join(' y ')}<span className="block text-sm text-sand">De lunes a domingo</span></div></li>
            <li className="flex gap-3"><PhoneIcon className="mt-1 shrink-0 text-ember-glow" /><a href={`tel:${site.phone}`} className="underline decoration-ocre underline-offset-4">{site.phoneDisplay}</a></li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn bg-ember text-white hover:bg-ember-glow"><PinIcon />Abrir en Google Maps</a>
            <a href={WA_ORDER} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><WhatsAppIcon />Pedir por WhatsApp</a>
          </div>
          <AfterHoursNote className="mt-3" />
          <div className="mt-8 rounded-2xl border border-dashed border-ocre/40 p-4 text-sm text-crema/80">
            <DeliveryChip />
            <p className="mt-2">Reparto a domicilio dentro de {site.delivery.area}{site.delivery.hours && <>: <strong className="text-crema">{site.delivery.hours}</strong></>}.</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {site.platforms.filter((d) => d.url).map((d) => (
                <li key={d.name}><a className="rounded-full border border-ocre/50 px-3 py-1.5 hover:bg-ocre hover:text-ink" href={d.url!} target="_blank" rel="noopener noreferrer">{d.name}</a></li>
              ))}
              <li><a className="rounded-full border border-ocre/50 px-3 py-1.5 hover:bg-ocre hover:text-ink" href={`tel:${site.phone}`}>Llamar</a></li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ocre/25 bg-coal lg:aspect-auto lg:h-full lg:min-h-[420px]">
            {map ? (
              <iframe title="Mapa de Döner Kebab Cieza" src={mapsEmbed} className="absolute inset-0 h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            ) : (
              <div className="tile-bg absolute inset-0 grid place-items-center p-6 text-center">
                <div>
                  <PinIcon width={44} height={44} className="mx-auto text-ember-glow" />
                  <p className="mt-3 font-display text-2xl" style={{ fontVariationSettings: "'wght' 800" }}>{site.street}</p>
                  <p className="text-sand">{site.city}</p>
                  <button onClick={() => setMap(true)} className="btn btn-ghost mt-5">Cargar mapa</button>
                  <p className="mx-auto mt-3 max-w-xs text-xs text-sand">El mapa es de Google y solo se carga si lo pides (puede usar cookies de Google).</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
