import { deliveryHoursText, deliveryText, site } from '../data/site'
import { useDeliveryNow } from '../lib/open'
import { ScooterIcon } from './Icons'

/** Franja fija superior, visible en toda la web. */
export function DeliveryBar() {
  const hours = deliveryHoursText()
  return (
    <div role="region" aria-label={`Envío a domicilio en ${site.delivery.area}${hours ? `. ${hours}` : ''}`}
      className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center gap-1.5 bg-ink px-2 text-center text-[11.5px] font-bold leading-none text-crema shadow-[0_2px_14px_rgba(0,0,0,.4)] min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:text-[13px] sm:text-sm">
      <ScooterIcon width={17} height={17} className="shrink-0 text-ocre" />
      <span className="whitespace-nowrap">{deliveryText(true)}</span>
    </div>
  )
}

/** Chip de envío: solo en hero y en el pedido de "Monta tu taco". */
export function DeliveryChip({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-current px-3 py-1.5 text-[12px] font-semibold min-[360px]:px-3.5 min-[360px]:text-[13px] ${className}`}>
      <ScooterIcon width={17} height={17} className="shrink-0" />{deliveryText(true)}
    </span>
  )
}

/** Aviso discreto fuera del horario de reparto. No bloquea el pedido. */
export function AfterHoursNote({ className = '' }: { className?: string }) {
  const inHours = useDeliveryNow()
  if (inHours !== false) return null
  return <p role="status" className={`max-w-xs text-xs leading-snug ${className}`}>Ahora estamos fuera de horario de reparto; te respondemos en cuanto abramos.</p>
}
