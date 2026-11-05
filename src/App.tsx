import { DeliveryBar } from './components/DeliveryBar'
import { TacosSection } from './components/TacosSection'
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
      <a href="#tacos" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-ocre focus:px-3 focus:py-2 focus:text-ink">Saltar a los tacos</a>
      <DeliveryBar />
      <Header />
      <main>
        <Hero />
        <TacosSection />
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
