import { site } from '../data/site'
import { ScooterIcon } from './Icons'

/** Franja fija superior, visible en toda la web. */
export function DeliveryBar() {
  const d = site.delivery
  const extra = [d.minOrder && `pedido mínimo ${d.minOrder}`, d.hours && `reparto ${d.hours}`].filter(Boolean).join(' · ')
  return (
    <div role="region" aria-label="Envío a domicilio" className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center gap-2 bg-ember px-3 text-center text-[13px] font-bold leading-none text-white shadow-[0_2px_14px_rgba(0,0,0,.45)] sm:text-sm">
      <ScooterIcon width={18} height={18} className="shrink-0 text-ocre-soft" />
      <span>Envío a domicilio por solo <span className="text-ocre-soft">{d.price}</span> en {d.area}</span>
      {extra && <span className="hidden font-medium text-white/85 md:inline">· {extra}</span>}
    </div>
  )
}

export function DeliveryChip({ className = '' }: { className?: string }) {
  const d = site.delivery
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-ocre/45 bg-ink/55 px-3.5 py-1.5 text-[13px] font-semibold text-ocre-soft backdrop-blur-sm ${className}`}>
      <ScooterIcon width={17} height={17} />Envío a domicilio {d.price} en {d.area}
    </span>
  )
}
