import { useEffect, useState } from 'react'

function madridMinutes(date: Date) {
  const parts = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(date)
  return (Number(parts.find((p) => p.type === 'hour')!.value) % 24) * 60 + Number(parts.find((p) => p.type === 'minute')!.value)
}
// Reparto: 13:15–15:00 y 19:00–00:00 (hora de Madrid)
export const isDeliveryNow = (date = new Date()) => {
  const t = madridMinutes(date)
  return (t >= 795 && t < 900) || t >= 1140
}

/** null hasta montar en el cliente (así no se pinta nada de más en el primer render) */
export function useDeliveryNow() {
  const [v, setV] = useState<boolean | null>(null)
  useEffect(() => {
    const tick = () => setV(isDeliveryNow())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])
  return v
}

export function useInView<T extends Element>(rootMargin = '200px') {
  const [el, setEl] = useState<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!el || seen) return
    const io = new IntersectionObserver(([en]) => en.isIntersecting && (setSeen(true), io.disconnect()), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [el, seen, rootMargin])
  return [setEl, seen] as const
}

export function canWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}
