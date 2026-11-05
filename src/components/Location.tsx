import { useState } from 'react'
import { mapsEmbed, mapsLink, site, WA_ORDER } from '../data/site'
import { Reveal } from './Reveal'
import { PhoneIcon, PinIcon, WhatsAppIcon } from './Icons'

export function Location() {
  const [map, setMap] = useState(false)
  return (
    <section id="donde" className="bg-ember py-14 text-crema sm:py-20" aria-labelledby="donde-t">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <Reveal>
          <h2 id="donde-t" className="section-title">Dónde estamos</h2>
          <div className="mt-6 flex items-start gap-3">
            <span className="num !min-w-[2.6rem] text-2xl !leading-[2.6rem]" aria-hidden="true">30</span>
            <address className="text-xl font-bold not-italic leading-snug">{site.street}<br /><span className="font-medium">{site.city}</span></address>
          </div>
          <div className="mt-6 border-t-2 border-crema/30 pt-4">
            <p className="text-lg"><strong>Reparto:</strong> {site.delivery.hours?.replace(' y ', ' y ')}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={WA_ORDER} data-hide-fab target="_blank" rel="noopener noreferrer" className="btn btn-wa"><WhatsAppIcon />Pedir por WhatsApp</a>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn bg-ink text-crema hover:bg-coal"><PinIcon />Abrir en Google Maps</a>
            <a href={`tel:${site.phone}`} className="btn btn-ghost"><PhoneIcon />{site.phoneDisplay}</a>
          </div>
          {site.platforms.some((d) => d.url) && (
            <ul className="mt-5 flex flex-wrap gap-2 text-sm">
              {site.platforms.filter((d) => d.url).map((d) => (
                <li key={d.name}><a className="rounded-full border-2 border-crema px-4 py-2 font-bold hover:bg-crema hover:text-ember" href={d.url!} target="_blank" rel="noopener noreferrer">{d.name}</a></li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-ink ring-4 ring-ink">
            {map ? (
              <iframe title="Mapa de Döner Kebab Cieza" src={mapsEmbed} className="absolute inset-0 h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            ) : (
              <div className="absolute inset-0 grid place-items-center p-5 text-center">
                <div>
                  <PinIcon width={40} height={40} className="mx-auto text-ocre" />
                  <button onClick={() => setMap(true)} className="btn btn-ghost mt-3 text-crema">Cargar mapa</button>
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
