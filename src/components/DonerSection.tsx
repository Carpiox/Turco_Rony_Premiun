import { Component, Suspense, lazy, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { canWebGL, useInView } from '../lib/open'
import { DonerFallback } from './DonerFallback'

const Doner3D = lazy(() => import('./Doner3D'))

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? this.props.fallback : this.props.children }
}

/** Banda compacta con el rulo girando (3D con lazy-load; SVG/CSS si no hay WebGL o hay prefers-reduced-motion). */
export function DonerSection() {
  const [ref, seen] = useInView<HTMLDivElement>('300px')
  const [use3D, setUse3D] = useState(false)
  useEffect(() => {
    setUse3D(!matchMedia('(prefers-reduced-motion: reduce)').matches && canWebGL())
  }, [])
  const fb = <DonerFallback />
  return (
    <section className="bg-ink py-10 sm:py-14" aria-labelledby="rulo-t">
      <div className="container-x grid items-center gap-4 sm:grid-cols-2 sm:gap-10">
        <div ref={ref} className="mx-auto h-56 w-full max-w-xs sm:h-72">
          {seen && use3D ? <Boundary fallback={fb}><Suspense fallback={fb}><Doner3D /></Suspense></Boundary> : fb}
        </div>
        <div className="text-center sm:text-left">
          <h2 id="rulo-t" className="text-3xl leading-tight sm:text-5xl">Pollo y ternera, del rulo al taco</h2>
          <a href="#carta" className="btn btn-ghost mt-5 text-ocre">Ver la carta</a>
        </div>
      </div>
    </section>
  )
}
