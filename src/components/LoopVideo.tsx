import { useEffect, useRef, useState } from 'react'
import { media } from '../data/site'

interface Props {
  name: string // nombre base en media/video
  className?: string
  /** 'idle' monta tras la carga de la página; 'view' al acercarse al viewport */
  mode?: 'idle' | 'view'
  alt?: string
  eager?: boolean
  ratio?: string
}

const noMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const saveData = () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true

/** Vídeo en bucle, mudo, con póster; solo se descarga cuando toca y se pausa fuera de pantalla. */
export function LoopVideo({ name, className = '', mode = 'view', alt = '', eager, ratio }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const [mount, setMount] = useState(false)
  const [ready, setReady] = useState(false)
  const poster = media(`video/${name}-poster.jpg`)

  useEffect(() => {
    if (noMotion() || saveData()) return
    if (mode === 'idle') {
      const go = () => setMount(true)
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => number }
      const start = () => (w.requestIdleCallback ? w.requestIdleCallback(go) : setTimeout(go, 200))
      if (document.readyState === 'complete') start()
      else window.addEventListener('load', start, { once: true })
      return
    }
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { setMount(true) }
      const v = vid.current
      if (v) en.isIntersecting ? v.play().catch(() => {}) : v.pause()
    }, { rootMargin: '150px' })
    io.observe(el)
    return () => io.disconnect()
  }, [mode])

  return (
    <div ref={wrap} style={ratio ? { aspectRatio: ratio } : undefined} className={`${/absolute/.test(className) ? "" : "relative"} overflow-hidden bg-coal ${className}`}>
      <img src={poster} alt={alt} aria-hidden={alt ? undefined : true} className="absolute inset-0 h-full w-full object-cover"
        {...(eager ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })} decoding="async" />
      {mount && (
        <video ref={vid} muted loop autoPlay playsInline preload="auto" poster={poster} aria-hidden="true" tabIndex={-1}
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <source src={media(`video/${name}.mp4`)} type="video/mp4" />
          <source src={media(`video/${name}.webm`)} type="video/webm" />
        </video>
      )}
    </div>
  )
}
