import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { site, waLink } from '../data/site'
import { Reveal } from './Reveal'
import { AfterHoursNote, DeliveryChip, DeliveryHours } from './DeliveryBar'
import { WhatsAppIcon } from './Icons'

type Meat = 'pollo' | 'mixto'
type Size = 'normal' | 'xxxl'
type Extra = 'gratinado' | 'crispy'
type Sauce = 'argelina' | 'blanca' | 'verduras'

const MEATS: { id: Meat; label: string; sub: string }[] = [
  { id: 'pollo', label: 'Pechuga de pollo', sub: 'Rebozada, casera' },
  { id: 'mixto', label: 'Mixto', sub: 'Ternera y pollo' },
]
const EXTRAS: { id: Extra; label: string; sub: string }[] = [
  { id: 'gratinado', label: 'Gratinado en horno', sub: 'Queso fundido por fuera' },
  { id: 'crispy', label: 'Tiras de pollo crispy', sub: 'Por encima, con queso' },
]
const SAUCES: { id: Sauce; label: string }[] = [
  { id: 'argelina', label: 'Salsa Tacos Argelina' },
  { id: 'blanca', label: 'Salsa blanca' },
  { id: 'verduras', label: 'Verduras' },
]

/* ---------- Taco en capas (SVG) ---------- */
const STEP = 22 // separación cuando las capas están "explotadas"

function Layer({ i, p, children }: { i: number; p: MotionValue<number>; children: React.ReactNode }) {
  const y = useTransform(p, [0, 1], [-i * STEP, 0])
  return <m.g style={{ y }}>{children}</m.g>
}
function Pop({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <m.g initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.35 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          {children}
        </m.g>
      )}
    </AnimatePresence>
  )
}

const SHREDS = [[62,0],[92,5],[122,-2],[152,6],[182,0],[212,4],[242,-3],[77,13],[107,16],[137,12],[167,17],[197,12],[227,15],[257,10]] as const

function TacoSvg({ meat, extras, sauces, p }: { meat: Meat; extras: Set<Extra>; sauces: Set<Sauce>; p: MotionValue<number> }) {
  const cols = meat === 'pollo' ? ['#e2b25f', '#f0cf8e', '#c98f3e'] : ['#7a3b1c', '#e2b25f', '#9a5226', '#f0cf8e']
  return (
    <svg viewBox="0 0 320 340" className="h-full w-full overflow-visible" role="img" aria-label="Tu taco, capa a capa">
      <ellipse cx="160" cy="326" rx="120" ry="9" fill="#000" opacity=".45" />
      <Layer i={0} p={p}>
        <ellipse cx="160" cy="298" rx="124" ry="24" fill="#cdb078" />
        <ellipse cx="160" cy="293" rx="124" ry="24" fill="#ecd9ae" />
        <path d="M70 288q90 18 180 0" stroke="#c9ae78" strokeWidth="3" fill="none" strokeLinecap="round" />
      </Layer>
      <Layer i={1} p={p}>
        <path d="M44 268q22 20 52 8t64 6 64-6 52-8q8-18-116-22T44 268Z" fill="#f4c63a" />
        <path d="M70 262q40 10 90 4t90-4" stroke="#fde58a" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".7" />
      </Layer>
      <Layer i={2} p={p}>
        {SHREDS.map(([x, dy], k) => (
          <rect key={`${meat}${k}`} x={x} y={222 + dy} width="40" height="13" rx="6.5" fill={cols[k % cols.length]} transform={`rotate(${k % 2 ? 6 : -5} ${x + 20} ${228 + dy})`} />
        ))}
      </Layer>
      <Layer i={3} p={p}>
        <Pop show={sauces.has('verduras')}>
          <path d="M52 204q24-26 52-8t52-10 52 10 52-8q18 8 8 22-60 16-132 14T52 204Z" fill="#6fae3c" />
          <circle cx="110" cy="205" r="11" fill="#d4402c" /><circle cx="196" cy="208" r="12" fill="#d4402c" /><circle cx="152" cy="200" r="8" fill="#e9573f" />
          <path d="M214 196q18 6 30 0M88 216q16 6 26 0" stroke="#f3ead4" strokeWidth="5" fill="none" strokeLinecap="round" />
        </Pop>
      </Layer>
      <Layer i={4} p={p}>
        <Pop show={sauces.has('argelina')}>
          <path d="M60 186q16-14 32 0t32 0 32 0 32 0 32 0" stroke="#e0561f" strokeWidth="9" fill="none" strokeLinecap="round" />
        </Pop>
        <Pop show={sauces.has('blanca')}>
          <path d="M70 178q16 12 32 0t32 0 32 0 32 0 20 0" stroke="#fff3d6" strokeWidth="7" fill="none" strokeLinecap="round" />
        </Pop>
      </Layer>
      <Layer i={5} p={p}>
        <Pop show={extras.has('crispy')}>
          {[0, 1, 2].map((k) => (
            <g key={k} transform={`rotate(${-8 + k * 8} ${110 + k * 50} 146)`}>
              <rect x={78 + k * 50} y="134" width="64" height="24" rx="12" fill="#d9892f" />
              <rect x={84 + k * 50} y="138" width="52" height="8" rx="4" fill="#f0b45a" opacity=".7" />
            </g>
          ))}
        </Pop>
      </Layer>
      <Layer i={6} p={p}>
        <ellipse cx="160" cy="124" rx="124" ry="26" fill="#cdb078" />
        <ellipse cx="160" cy="118" rx="124" ry="26" fill="#ecd9ae" />
        <path d="M70 96l80 44M110 90l80 44M150 86l80 44M190 88l60 33" stroke="#c9ae78" strokeWidth="3" opacity=".55" strokeLinecap="round" />
        <Pop show={extras.has('gratinado')}>
          <path d="M48 120q4-26 56-30t96 0 62 6q14 18-8 30t-100 10-90-6-16-10Z" fill="#f0a22e" />
          <path d="M80 112q30 8 70 4t70-4" stroke="#fde58a" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".8" />
          {[[96, 108], [140, 100], [184, 110], [218, 102], [120, 120], [170, 122]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="6" fill="#b4561a" opacity=".85" />)}
        </Pop>
      </Layer>
    </svg>
  )
}

/* ---------- Opciones ---------- */
function Chip({ active, onClick, label, sub, type }: { active: boolean; onClick: () => void; label: string; sub?: string; type: 'radio' | 'checkbox' }) {
  return (
    <button type="button" role={type} aria-checked={active} onClick={onClick}
      className={`min-h-[56px] rounded-2xl border px-4 py-2.5 text-left transition active:scale-[.98] ${active ? 'border-ember bg-ember/20 shadow-[inset_0_0_0_1px_#c2301f]' : 'border-crema/20 hover:border-ocre/60'}`}>
      <span className="flex items-center gap-2 font-bold">
        <span aria-hidden="true" className={`grid h-5 w-5 shrink-0 place-items-center border ${type === 'radio' ? 'rounded-full' : 'rounded'} ${active ? 'border-ember bg-ember text-white' : 'border-crema/40'}`}>{active && <span className="text-[11px] leading-none">✓</span>}</span>
        {label}
      </span>
      {sub && <span className="ml-7 block text-xs text-sand">{sub}</span>}
    </button>
  )
}
function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="flex items-baseline gap-3 pb-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ocre font-display text-lg text-ink" aria-hidden="true">{n}</span>
        <span className="font-display text-2xl" style={{ fontVariationSettings: "'wght' 800" }}>{title}</span>
        {hint && <span className="text-xs text-sand">{hint}</span>}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}

export function TacoBuilder() {
  const [meat, setMeat] = useState<Meat>('pollo')
  const [size, setSize] = useState<Size>('normal')
  const [menu, setMenu] = useState(false)
  const [extras, setExtras] = useState<Set<Extra>>(new Set())
  const [sauces, setSauces] = useState<Set<Sauce>>(new Set(['argelina', 'blanca', 'verduras']))
  const toggle = <T,>(set: Set<T>, v: T, fn: (s: Set<T>) => void) => { const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); fn(n) }

  // Las capas se montan al hacer scroll: de "explotado" a "montado"
  const stage = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start 0.95', 'start 0.4'] })
  const fixed = useTransform(scrollYProgress, () => 1)
  const progress = reduce ? fixed : scrollYProgress

  // Precio base según la carta (taco 6 €, XXXL 8 €, menú 8 €); los extras se confirman por WhatsApp
  const base = size === 'xxxl' ? 8 : menu ? 8 : 6
  const msg = useMemo(() => {
    const m = MEATS.find((x) => x.id === meat)!
    const ex = EXTRAS.filter((e) => extras.has(e.id)).map((e) => e.label)
    const sa = SAUCES.filter((s) => sauces.has(s.id)).map((s) => s.label)
    return [
      '¡Hola! Quiero montar mi taco 🌮',
      `• Carne: ${m.label} (${m.sub.toLowerCase()})`,
      `• Tamaño: ${size === 'xxxl' ? 'XXXL (doble)' : 'normal'}${menu && size === 'normal' ? ' en menú (patatas + bebida)' : ''}`,
      `• Extras: ${ex.length ? ex.join(', ') : 'ninguno'}`,
      `• Salsas y verduras: ${sa.length ? sa.join(', ') : 'sin salsas'}`,
      `• Precio base según carta: ${base},00 €${ex.length ? ' + extras (confírmame el total)' : ''}`,
      `Envío a domicilio en ${site.delivery.area} (${site.delivery.price}). Mi dirección es: `,
    ].join('\n')
  }, [meat, size, menu, extras, sauces, base])

  return (
    <section id="monta" className="relative py-20 sm:py-28" aria-labelledby="monta-t">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">A tu manera</p>
          <h2 id="monta-t" className="section-title mt-3">Monta tu <span className="italic text-ocre-soft">taco</span></h2>
          <p className="mt-4 max-w-lg text-crema/80">Elige carne, extras y salsas, mira cómo se monta capa a capa y mándanos el pedido por WhatsApp ya escrito.</p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div ref={stage} className="sticky top-[6.25rem] z-10 -mx-4 self-start bg-[linear-gradient(180deg,#0e0907_80%,rgba(14,9,7,0))] px-4 pb-4 pt-2 sm:mx-0 sm:px-0 lg:top-32">
            <div className="tile-bg mx-auto aspect-[320/300] max-h-[34svh] rounded-3xl border border-ocre/20 bg-coal p-3 sm:max-h-[420px] lg:max-h-none">
              <TacoSvg meat={meat} extras={extras} sauces={sauces} p={progress} />
            </div>
          </div>

          <div className="space-y-8">
            <Step n={1} title="Carne">
              <div className="contents" role="radiogroup" aria-label="Carne">
                {MEATS.map((x) => <Chip key={x.id} type="radio" active={meat === x.id} onClick={() => setMeat(x.id)} label={x.label} sub={x.sub} />)}
              </div>
            </Step>
            <Step n={2} title="Tamaño y extras" hint="los extras se confirman por WhatsApp">
              <div className="contents" role="radiogroup" aria-label="Tamaño">
                <Chip type="radio" active={size === 'normal'} onClick={() => setSize('normal')} label="Normal" sub="6,00 €" />
                <Chip type="radio" active={size === 'xxxl'} onClick={() => { setSize('xxxl'); setMenu(false) }} label="XXXL (doble)" sub="8,00 €" />
              </div>
              {EXTRAS.map((x) => <Chip key={x.id} type="checkbox" active={extras.has(x.id)} onClick={() => toggle(extras, x.id, setExtras)} label={x.label} sub={x.sub} />)}
              {size === 'normal' && <Chip type="checkbox" active={menu} onClick={() => setMenu(!menu)} label="Hazlo menú" sub="Con patatas y bebida · 8,00 €" />}
            </Step>
            <Step n={3} title="Salsas y verduras">
              {SAUCES.map((x) => <Chip key={x.id} type="checkbox" active={sauces.has(x.id)} onClick={() => toggle(sauces, x.id, setSauces)} label={x.label} />)}
            </Step>

            <div className="rounded-3xl border border-ocre/30 bg-coal p-5 sm:p-6" aria-live="polite">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-sand">Precio base</p>
                  <p className="font-display text-4xl text-ocre-soft" style={{ fontVariationSettings: "'wght' 800" }}>{base},00 €</p>
                </div>
                <p className="max-w-[11rem] text-right text-xs text-sand">{extras.size ? 'Extras: te confirmamos el total por WhatsApp.' : 'Según carta.'}</p>
              </div>
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-5 w-full"><WhatsAppIcon />Pedir mi taco por WhatsApp</a>
              <AfterHoursNote className="mx-auto mt-3 text-center" />
              <div className="mt-3 flex flex-col items-center gap-1"><DeliveryChip /><DeliveryHours /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
