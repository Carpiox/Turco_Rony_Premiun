import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { DonerSection } from './components/DonerSection'
import { Menu } from './components/Menu'
import { Gallery } from './components/Gallery'
import { Reviews } from './components/Reviews'
import { Location } from './components/Location'
import { Footer } from './components/Footer'
import { WhatsAppFab } from './components/WhatsAppFab'

export default function App() {
  return (
    <>
      <a href="#carta" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-ocre focus:px-3 focus:py-2 focus:text-ink">Saltar a la carta</a>
      <Header />
      <main>
        <Hero />
        <DonerSection />
        <Menu />
        <div className="kilim" aria-hidden="true" />
        <Gallery />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
