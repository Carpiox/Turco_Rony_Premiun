import { Suspense, lazy, useEffect, useState } from 'react'
import { DeliveryBar } from './components/DeliveryBar'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { WhatsAppFab } from './components/WhatsAppFab'

const Rest = lazy(() => import('./Rest'))

/** true cuando la página ya cargó y el navegador está libre (no compite con el LCP) */
function useIdleReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const go = () => setReady(true)
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    const start = () => (w.requestIdleCallback ? w.requestIdleCallback(go, { timeout: 1500 }) : setTimeout(go, 300))
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
  }, [])
  return ready
}

export default function App() {
  const ready = useIdleReady()
  return (
    <>
      <a href="#tacos" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-12 focus:z-[60] focus:rounded focus:bg-ocre focus:px-3 focus:py-2 focus:text-ink">Saltar a los tacos</a>
      <DeliveryBar />
      <Header />
      <main id="contenido">
        <Hero />
        {ready && <Suspense fallback={null}><Rest /></Suspense>}
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
