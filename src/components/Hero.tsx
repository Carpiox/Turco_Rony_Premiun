import { WA_ORDER, mapsLink, media, rating } from '../data/site'
import { LoopVideo } from './LoopVideo'
import { AfterHoursNote, DeliveryChip } from './DeliveryBar'
import { StarIcon, WhatsAppIcon } from './Icons'

/** Hero: la foto real más nítida (1600 px) arriba en móvil y a la derecha en escritorio; titular sobre rojo sólido. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ember pt-[6.25rem] text-crema lg:pt-0">
      <div className="mx-auto grid max-w-[90rem] lg:min-h-[100svh] lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="relative lg:order-2 lg:h-full lg:py-24 lg:pr-8">
          <div className="relative aspect-[5/4] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[480px] lg:rounded-l-none lg:rounded-r-[2rem]">
            <img
              src={media('img/hero-taco-800.webp')}
              srcSet={`${media('img/hero-taco-800.webp')} 800w, ${media('img/hero-taco-1600.webp')} 1600w`}
              sizes="(min-width:1024px) 52vw, 100vw"
              alt="Taco gratinado cortado por la mitad: queso fundido, tiras de pollo crujientes, pimientos y el relleno a la vista"
              width={1600} height={1200} fetchPriority="high" decoding="async"
              className="foto absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-4 translate-y-1/2 sm:left-6 lg:bottom-32 lg:left-0 lg:translate-x-[-45%] lg:translate-y-0">
            <LoopVideo name="tacos-plancha" mode="idle" ratio="1/1" className="h-24 w-24 rounded-full border-[5px] border-ocre shadow-xl sm:h-28 sm:w-28" />
          </div>
        </div>

        <div className="container-x relative pb-14 pt-16 lg:order-1 lg:max-w-none lg:py-24 lg:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:pr-12">
          <p className="text-sm font-bold uppercase tracking-wide text-crema">Istambul Döner Kebab Cieza</p>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-sm text-crema underline-offset-4 hover:underline">
            <StarIcon width={16} height={16} className="text-ocre" /><strong>{rating.score}</strong>/{rating.outOf} · {rating.count} valoraciones en Google
          </a>
          <h1 className="mt-2 text-[clamp(3.2rem,15.5vw,7.4rem)] leading-[.88] tracking-tight">
            Tacos<br /><span className="text-ocre">gratinados</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-snug sm:text-xl">
            De pollo o mixto, con queso por encima. Pídelos por WhatsApp y te los llevamos a casa.
          </p>
          <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row">
            <a href={WA_ORDER} data-hide-fab target="_blank" rel="noopener noreferrer" className="btn btn-wa"><WhatsAppIcon />Pedir por WhatsApp</a>
            <a href="#tacos" className="btn btn-ghost">Ver tacos</a>
          </div>
          <DeliveryChip className="mt-5 text-crema" />
          <AfterHoursNote className="mt-3 text-crema" />
        </div>
      </div>
      <div className="kilim" aria-hidden="true" />
    </section>
  )
}
