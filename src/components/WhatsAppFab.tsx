import { waLink } from '../data/site'
import { WhatsAppIcon } from './Icons'

export function WhatsAppFab() {
  return (
    <a href={waLink('¡Hola! Me gustaría hacer un pedido 🥙')} target="_blank" rel="noopener noreferrer" aria-label="Pedir por WhatsApp"
      className="fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-[#07210f] shadow-[0_10px_30px_-6px_rgba(37,211,102,.75)] transition active:scale-95 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5 sm:font-bold">
      <WhatsAppIcon width={28} height={28} />
      <span className="hidden sm:inline">Pedir por WhatsApp</span>
    </a>
  )
}
