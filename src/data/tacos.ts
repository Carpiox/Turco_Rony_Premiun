import { WA_ORDER, waLink } from './site'

export interface Taco {
  id: string
  name: string
  kicker: string
  ingredients: string[]
  prices: { label: string; value: string; note?: string }[]
  img?: string
  poster?: string
}

const COMUN = ['Queso mozzarella', 'Salsa Tacos Argelina', 'Salsa blanca', 'Verduras a tu gusto']
const MENU_NOTE = 'patatas + bebida'

// Precios y composición: tomados de la carta de tacos del local.
export const MAIN_TACOS: Taco[] = [
  { id: 'pollo', name: 'De pechuga de pollo', kicker: 'Tacos francés normal',
    ingredients: ['Pechugas de pollo rebozadas caseras', ...COMUN], poster: 'tacos-plancha-poster.jpg',
    prices: [{ label: 'Taco', value: '6,00 €' }, { label: 'XXXL (doble)', value: '8,00 €' }, { label: 'Menú', value: '8,00 €', note: MENU_NOTE }] },
  { id: 'mixto', name: 'Mixto de ternera y pollo', kicker: 'Tacos con carne kebab',
    ingredients: ['Carne kebab de pollo y ternera', ...COMUN], img: 'tacos-capas',
    prices: [{ label: 'Taco', value: '6,00 €' }, { label: 'XXXL (doble)', value: '8,00 €' }, { label: 'Menú', value: '8,00 €', note: MENU_NOTE }] },
]

export const MORE_TACOS: Taco[] = [
  { id: 'mixto-pechuga', name: 'Pechugas y kebab', kicker: 'Lo mejor de los dos',
    ingredients: ['Pechugas de pollo rebozadas', 'Carne kebab de pollo y ternera', ...COMUN], img: 'tacos-especial',
    prices: [{ label: 'Taco', value: '7,00 €' }, { label: 'XXXL (doble)', value: '9,00 €' }, { label: 'Menú', value: '9,00 €', note: MENU_NOTE }] },
  { id: 'horno', name: 'Gratinado en horno', kicker: 'Queso fundido por fuera',
    ingredients: ['Queso fundido en horno', 'Pechugas de pollo rebozadas', ...COMUN], img: 'tacos-xl-gratinado',
    prices: [{ label: 'Taco', value: '8,00 €' }, { label: 'Menú', value: '10,00 €', note: MENU_NOTE }] },
  { id: 'especial', name: 'Tacos especial', kicker: 'El más cargado',
    ingredients: ['Arriba: tiras de pollo crispy con queso fundido al horno', 'Dentro: pechugas de pollo rebozadas', ...COMUN], img: 'tacos-pollo-crispy',
    prices: [{ label: 'Taco', value: '9,00 €' }, { label: 'Menú', value: '11,00 €', note: MENU_NOTE }] },
]

export const orderTaco = (t: Taco) =>
  waLink(`¡Hola! Quiero pedir: ${t.name} (${t.kicker}). ¿Es para recoger o envío a domicilio en Cieza? 🌮`)
export { WA_ORDER }
