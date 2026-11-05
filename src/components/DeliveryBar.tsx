import { deliveryHoursText, deliveryText, site } from '../data/site'
import { useDeliveryNow } from '../lib/open'
import { ScooterIcon } from './Icons'

/** Franja fija superior, visible en toda la web. */
export function DeliveryBar() {
  const hours = deliveryHoursText()
  return (
    <div role="region" aria-label={`Envío a domicilio en ${site.delivery.area}${hours ? `. ${hours}` : ''}`}
      className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center gap-1.5 bg-ember px-2 text-center text-[11.5px] font-bold leading-none text-white shadow-[0_2px_14px_rgba(0,0,0,.45)] min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:text-[13px] sm:text-sm">
      <ScooterIcon width={17} height={17} className="shrink-0 text-white" />
      <span className="whitespace-nowrap">{deliveryText(true)}</span>
      {hours && <span className="hidden whitespace-nowrap font-medium text-white/85 lg:inline">· {hours}</span>}
    </div>
  )
}

export function DeliveryChip({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-ocre/45 bg-ink/55 px-3 py-1.5 text-[12px] min-[360px]:px-3.5 min-[360px]:text-[13px] font-semibold text-ocre-soft backdrop-blur-sm ${className}`}>
      <ScooterIcon width={17} height={17} className="shrink-0" />{deliveryText()}
    </span>
  )
}

/** Horario de reparto (texto discreto junto a un chip) */
export function DeliveryHours({ className = '' }: { className?: string }) {
  const h = deliveryHoursText()
  return h ? <span className={`text-[13px] text-crema/80 ${className}`}>{h}</span> : null
}

/** Aviso discreto fuera del horario de reparto. No bloquea el pedido. Reserva su altura para no mover el layout. */
export function AfterHoursNote({ reserve = false, className = '' }: { reserve?: boolean; className?: string }) {
  const inHours = useDeliveryNow()
  const show = inHours === false
  return (
    <p role="status" className={`${reserve ? 'min-h-[2.6rem]' : ''} max-w-xs text-xs leading-snug text-sand ${className}`}>
      {show && 'Ahora estamos fuera de horario de reparto; te respondemos en cuanto abramos.'}
    </p>
  )
}
