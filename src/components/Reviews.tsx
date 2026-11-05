import { REVIEWS } from '../data/site'
import { Reveal } from './Reveal'
import { StarIcon } from './Icons'

/** Se oculta por completo mientras no haya reseñas reales en REVIEWS (src/data/site.ts). */
export function Reviews() {
  if (REVIEWS.length === 0) return null
  return (
    <section id="resenas" className="bg-crema py-12 text-ink sm:py-16" aria-labelledby="res-t">
      <div className="container-x">
        <Reveal>
          <h2 id="res-t" className="section-title">Lo que dicen de nosotros</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="h-full rounded-2xl border border-ink/10 bg-paper p-6">
                <span className="flex text-ocre" role="img" aria-label={`${r.stars} de 5 estrellas`}>{Array.from({ length: r.stars }).map((_, k) => <StarIcon key={k} width={16} height={16} />)}</span>
                <blockquote className="mt-4 font-display text-lg leading-snug text-ink/90">“{r.text}”</blockquote>
                <figcaption className="mt-5 text-sm text-smoke">{r.author} · {r.date}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
