import { useEffect, useState } from 'react'
import { waLink } from '../data/site'
import { WhatsAppIcon } from './Icons'

/** Botón flotante: se oculta mientras haya en pantalla algún elemento [data-hide-fab] (botones de pedir, carta abierta). */
export function WhatsAppFab() {
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    const inView = new Set<Element>()
    const seen = new WeakSet<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)
      for (const el of [...inView]) if (!el.isConnected) inView.delete(el)
      setHidden(inView.size > 0)
    })
    const scan = () => document.querySelectorAll('[data-hide-fab]').forEach((el) => { if (!seen.has(el)) { seen.add(el); io.observe(el) } })
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    // sin ningún CTA en el DOM todavía (la web carga por partes), empezamos ocultos
    setHidden(inView.size > 0 || document.querySelector('[data-hide-fab]') !== null)
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
  return (
    <a href={waLink('¡Hola! Me gustaría hacer un pedido 🥙')} target="_blank" rel="noopener noreferrer" aria-label="Pedir por WhatsApp" tabIndex={hidden ? -1 : 0} aria-hidden={hidden}
      className={`fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-[#07210f] shadow-[0_10px_30px_-6px_rgba(37,211,102,.75)] transition duration-300 active:scale-95 ${hidden ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'}`}>
      <WhatsAppIcon width={28} height={28} />
    </a>
  )
}
