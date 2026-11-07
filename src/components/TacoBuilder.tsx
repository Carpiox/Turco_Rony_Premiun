import { useMemo, useState } from 'react'
import { site, waLink } from '../data/site'
import { Reveal } from './Reveal'
import { AfterHoursNote, DeliveryChip } from './DeliveryBar'
import { WhatsAppIcon } from './Icons'

type Meat = 'pollo' | 'mixto'
type Size = 'normal' | 'xxxl'
type Extra = 'gratinado' | 'crispy'
type Sauce = 'argelina' | 'blanca' | 'verduras'

const MEATS: { id: Meat; label: string; sub: string }[] = [
  { id: 'pollo', label: 'Pechuga de pollo', sub: 'Rebozada' },
  { id: 'mixto', label: 'Mixto', sub: 'Ternera y pollo' },
]
const EXTRAS: { id: Extra; label: string; sub: string }[] = [
  { id: 'gratinado', label: 'Gratinado en horno', sub: 'Queso fundido por fuera' },
  { id: 'crispy', label: 'Tiras de pollo crispy', sub: 'Por encima, con queso' },
]
const SAUCES: { id: Sauce; label: string }[] = [
  { id: 'argelina', label: 'Tacos Argelina' },
  { id: 'blanca', label: 'Salsa blanca' },
  { id: 'verduras', label: 'Verduras' },
]

function Chip({ active, onClick, label, sub, type }: { active: boolean; onClick: () => void; label: string; sub?: string; type: 'radio' | 'checkbox' }) {
  return (
    <button type="button" role={type} aria-checked={active} onClick={onClick}
      className={`min-h-[52px] rounded-xl border-2 px-3.5 py-2 text-left transition active:scale-[.98] ${active ? 'border-ocre bg-ocre text-ink' : 'border-crema/25 hover:border-crema/60'}`}>
      <span className="block font-bold leading-tight">{label}</span>
      {sub && <span className={`block text-xs ${active ? 'text-ink/75' : 'text-sand'}`}>{sub}</span>}
    </button>
  )
}
function Group({ title, hint, cols = 2, children }: { title: string; hint?: string; cols?: 2 | 3; children: React.ReactNode }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="pb-2 font-display text-xl" style={{ fontVariationSettings: "'wght' 800" }}>{title}{hint && <span className="ml-2 font-sans text-xs font-normal text-sand">{hint}</span>}</legend>
      <div className={`grid gap-2 ${cols === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>{children}</div>
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
    <section id="monta" className="bg-ink py-14 sm:py-20" aria-labelledby="monta-t">
      <div className="container-x max-w-3xl">
        <Reveal>
          <h2 id="monta-t" className="section-title text-center">Monta tu taco</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-crema/80">Elige, y te mandamos el pedido escrito a WhatsApp.</p>
        </Reveal>
        <div className="mt-8 space-y-6">
          <Group title="Carne">
            <div className="contents" role="radiogroup" aria-label="Carne">
              {MEATS.map((x) => <Chip key={x.id} type="radio" active={meat === x.id} onClick={() => setMeat(x.id)} label={x.label} sub={x.sub} />)}
            </div>
          </Group>
          <Group title="Tamaño">
            <div className="contents" role="radiogroup" aria-label="Tamaño">
              <Chip type="radio" active={size === 'normal'} onClick={() => setSize('normal')} label="Normal" sub="6,00 €" />
              <Chip type="radio" active={size === 'xxxl'} onClick={() => { setSize('xxxl'); setMenu(false) }} label="XXXL doble" sub="8,00 €" />
            </div>
          </Group>
          <Group title="Extras" hint="los confirmamos por WhatsApp">
            {EXTRAS.map((x) => <Chip key={x.id} type="checkbox" active={extras.has(x.id)} onClick={() => toggle(extras, x.id, setExtras)} label={x.label} sub={x.sub} />)}
            {size === 'normal' && <Chip type="checkbox" active={menu} onClick={() => setMenu(!menu)} label="En menú" sub="Patatas y bebida · 8,00 €" />}
          </Group>
          <Group title="Salsas y verduras" cols={3}>
            {SAUCES.map((x) => <Chip key={x.id} type="checkbox" active={sauces.has(x.id)} onClick={() => toggle(sauces, x.id, setSauces)} label={x.label} />)}
          </Group>

          <div className="rounded-2xl bg-crema p-5 text-ink" aria-live="polite">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-smoke">Precio base</p>
                <p className="font-display text-4xl text-ember" style={{ fontVariationSettings: "'wght' 800" }}>{base},00 €</p>
              </div>
              <p className="max-w-[10rem] text-right text-xs text-smoke">{extras.size ? 'Extras: te decimos el total por WhatsApp.' : 'Según carta.'}</p>
            </div>
            <a href={waLink(msg)} data-hide-fab target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-4 w-full"><WhatsAppIcon />Pedir mi taco por WhatsApp</a>
            <div className="mt-3 flex flex-col items-center gap-2 text-ink"><DeliveryChip className="text-ember" /><AfterHoursNote className="text-center text-smoke" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
