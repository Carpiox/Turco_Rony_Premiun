import { useEffect } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { TacosSection } from './components/TacosSection'
import { TacoBuilder } from './components/TacoBuilder'
import { Gallery } from './components/Gallery'
import { DonerSection } from './components/DonerSection'
import { Menu } from './components/Menu'
import { Reviews } from './components/Reviews'
import { Location } from './components/Location'

/** Todo lo que está bajo el hero: va en su propio chunk y se monta cuando el navegador queda libre. */
export default function Rest() {
  useEffect(() => {
    // si llegaron con un #ancla, recolocar ahora que la sección existe
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView())
  }, [])
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <>
          <TacosSection />
          <TacoBuilder />
          <Gallery />
          <DonerSection />
          <Menu />
          <Reviews />
          <Location />
        </>
      </LazyMotion>
    </MotionConfig>
  )
}
