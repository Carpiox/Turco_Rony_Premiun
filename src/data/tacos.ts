import { waLink } from './site'

export interface Taco {
  id: string
  num: number
  name: string
  ingredients: string[]
  prices: { label: string; value: string; note?: string }[]
  img: string
}

const COMUN = ['mozzarella', 'salsa Tacos Argelina', 'salsa blanca', 'verduras a tu gusto']
const MENU_NOTE = 'patatas + bebida'

// Composición y precios: tomados de la carta de tacos del local. Fotos: de referencia [CONFIRMAR].
export const MAIN_TACOS: Taco[] = [
  { id: 'pollo', num: 1, name: 'De pechuga de pollo', ingredients: ['Pechugas de pollo rebozadas', ...COMUN], img: 'tacos-tiras',
    prices: [{ label: 'Taco', value: '6,00 €' }, { label: 'XXXL doble', value: '8,00 €' }, { label: 'Menú', value: '8,00 €', note: MENU_NOTE }] },
  { id: 'mixto', num: 2, name: 'Mixto de ternera y pollo', ingredients: ['Carne kebab de pollo y ternera', ...COMUN], img: 'tacos-especial',
    prices: [{ label: 'Taco', value: '6,00 €' }, { label: 'XXXL doble', value: '8,00 €' }, { label: 'Menú', value: '8,00 €', note: MENU_NOTE }] },
]

export const MORE_TACOS: Taco[] = [
  { id: 'mixto-pechuga', num: 3, name: 'Pechugas y kebab', ingredients: ['Pechugas rebozadas', 'kebab de pollo y ternera', ...COMUN], img: 'tacos-capas',
    prices: [{ label: 'Taco', value: '7,00 €' }, { label: 'XXXL doble', value: '9,00 €' }, { label: 'Menú', value: '9,00 €', note: MENU_NOTE }] },
  { id: 'horno', num: 4, name: 'Gratinado en horno', ingredients: ['Queso fundido en horno', 'pechugas rebozadas', ...COMUN], img: 'tacos-xl-gratinado',
    prices: [{ label: 'Taco', value: '8,00 €' }, { label: 'Menú', value: '10,00 €', note: MENU_NOTE }] },
  { id: 'especial', num: 5, name: 'Tacos especial', ingredients: ['Arriba, tiras de pollo crispy con queso fundido', 'dentro, pechugas rebozadas', ...COMUN], img: 'tacos-horno',
    prices: [{ label: 'Taco', value: '9,00 €' }, { label: 'Menú', value: '11,00 €', note: MENU_NOTE }] },
]

export const orderTaco = (t: Taco) =>
  waLink(`¡Hola! Quiero pedir el taco nº ${t.num}: ${t.name}. ¿Es para recoger o envío a domicilio en Cieza? 🌮`)
