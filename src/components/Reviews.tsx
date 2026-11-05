import { PENDING } from '../data/site'
import { Reveal } from './Reveal'
import { StarIcon } from './Icons'

export function Reviews() {
  return (
    <section id="resenas" className="tile-bg py-20 sm:py-28" aria-labelledby="res-t">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Lo que dicen de nosotros</p>
          <h2 id="res-t" className="section-title mt-3">Clientes que <span className="text-ocre-soft italic">repiten</span></h2>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-crema/85">
            <span className="flex text-ocre" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}</span>
            <span className="font-bold">{PENDING.puntuacion} en Google</span>
            <span className="text-sand">· {PENDING.numResenas} reseñas</span>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="h-full rounded-2xl border border-ocre/20 bg-coal p-6">
                <span className="flex text-ocre" aria-hidden="true">{Array.from({ length: 5 }).map((_, k) => <StarIcon key={k} width={16} height={16} />)}</span>
                <blockquote className="mt-4 font-display text-lg leading-snug text-crema/90">
                  “{PENDING.resenas} — pega aquí el texto de una reseña real de Google.”
                </blockquote>
                <figcaption className="mt-5 text-sm text-sand">[NOMBRE DEL CLIENTE] · [FECHA]</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <a href={PENDING.enlaceResenas} className="btn btn-ghost">Ver todas las reseñas en Google [ENLACE]</a>
        </Reveal>
      </div>
    </section>
  )
}
