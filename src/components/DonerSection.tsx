import { Component, Suspense, lazy, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { canWebGL, useInView } from '../lib/open'
import { DonerFallback } from './DonerFallback'
import { Reveal } from './Reveal'

const Doner3D = lazy(() => import('./Doner3D'))

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? this.props.fallback : this.props.children }
}

export function DonerSection() {
  const [ref, seen] = useInView<HTMLDivElement>('300px')
  const [use3D, setUse3D] = useState(false)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    setUse3D(!reduce && canWebGL())
  }, [])
  const fb = <DonerFallback />

  return (
    <section className="tile-bg relative overflow-hidden py-20 sm:py-28" aria-labelledby="rulo-t">
      <div className="container-x grid items-center gap-10 md:grid-cols-2">
        <div ref={ref} className="order-2 aspect-[4/4.4] w-full md:order-1" >
          {seen && use3D ? (
            <Boundary fallback={fb}><Suspense fallback={fb}><Doner3D /></Suspense></Boundary>
          ) : fb}
        </div>
        <Reveal className="order-1 md:order-2">
          <p className="eyebrow">El corazón del local</p>
          <h2 id="rulo-t" className="section-title mt-3">El rulo<br /><span className="text-ocre-soft italic">que no para</span></h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-crema/80">
            Pollo y ternera girando frente al fuego, listos para convertirse en tu kebab, tu dürum o tu plato.
            Pasa por la Gran Vía y huele la diferencia.
          </p>
          <a href="#carta" className="btn btn-ghost mt-7">Mira qué sale de aquí →</a>
        </Reveal>
      </div>
    </section>
  )
}
