import { deliveryText, site } from '../data/site'
import { ScooterIcon } from './Icons'

/** Franja fija superior, visible en toda la web. */
export function DeliveryBar() {
  const { hours } = site.delivery
  return (
    <div role="region" aria-label={`Envío a domicilio en ${site.delivery.area}`} className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center gap-2 bg-ember px-3 text-center text-[13px] font-bold leading-none text-white shadow-[0_2px_14px_rgba(0,0,0,.45)] sm:text-sm">
      <ScooterIcon width={18} height={18} className="shrink-0 text-white" />
      <span>{deliveryText()}</span>
      {hours && <span className="hidden font-medium text-white/85 md:inline">· Reparto {hours}</span>}
    </div>
  )
}

export function DeliveryChip({ className = '' }: { className?: string }) {
  const { hours } = site.delivery
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-ocre/45 bg-ink/55 px-3.5 py-1.5 text-[13px] font-semibold text-ocre-soft backdrop-blur-sm ${className}`}>
      <ScooterIcon width={17} height={17} className="shrink-0" />{deliveryText()}{hours && ` · Reparto ${hours}`}
    </span>
  )
}
