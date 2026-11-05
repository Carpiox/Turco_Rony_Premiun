import { media } from './site'

export type Tag = 'pollo' | 'ternera' | 'vegetariano' | 'tacos' | 'bebidas'
export const FILTERS: { id: Tag | 'todo'; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'pollo', label: 'Pollo' },
  { id: 'ternera', label: 'Ternera' },
  { id: 'vegetariano', label: 'Vegetariano' },
  { id: 'tacos', label: 'Tacos' },
  { id: 'bebidas', label: 'Bebidas' },
]

export interface Price { label?: string; value: string; note?: string; menu?: boolean }
export interface Item {
  id: string
  num?: number
  name: string
  desc?: string
  tags: Tag[]
  img?: string // nombre base en media/img (genera -640/-1280.webp)
  poster?: string // alternativa: jpg suelto
  prices: Price[]
}

const D = ['pollo', 'ternera'] as Tag[] // carne de döner: pollo o ternera [CONFIRMAR]
const e = (n: string) => `${n} €`

export const MENU: Item[] = [
  { id: 'durum', num: 1, name: 'Dürum', desc: 'Pan fino a la plancha con carne de döner, ensalada y salsas.', tags: D, img: 'plato-durum',
    prices: [{ value: e('4,50') }, { label: 'Grande', value: e('+1,00') }, { label: 'Menú', value: e('7,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'kebab', num: 2, name: 'Kebab', desc: 'Pan crujiente relleno de döner, lechuga, tomate y cebolla.', tags: D, img: 'plato-kebab',
    prices: [{ value: e('4,00') }, { label: 'Grande', value: e('+1,00') }, { label: 'Menú', value: e('6,50'), note: 'patatas + bebida', menu: true }] },
  { id: 'durum-gratinado', num: 3, name: 'Dürum gratinado', desc: 'Nuestro dürum con queso fundido y gratinado por fuera.', tags: D, img: 'plato-durum-grat',
    prices: [{ value: e('6,00') }, { label: 'Grande', value: e('+1,00') }, { label: 'Menú', value: e('8,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'pizza-turca', num: 4, name: 'Pizza turca', tags: D,
    prices: [{ value: e('5,50') }, { label: 'Grande', value: e('+1,00') }, { label: 'Menú', value: e('8,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'pizza-kebab', num: 5, name: 'Pizza kebab', tags: D, img: 'plato-pizza-kebab',
    prices: [{ value: e('7,00') }, { label: 'Grande', value: e('+1,00') }, { label: 'Menú', value: e('9,50'), note: 'patatas + bebida', menu: true }] },

  { id: 'tacos-frances', num: 1, name: 'Tacos francés normal', desc: 'Pechugas de pollo rebozadas caseras, queso mozzarella, salsa Tacos Argelina, salsa blanca y verduras a tu gusto.', tags: ['tacos', 'pollo'], poster: 'tacos-plancha-poster.jpg',
    prices: [{ value: e('6,00') }, { label: 'XXXL (doble)', value: e('8,00') }, { label: 'Menú', value: e('8,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'tacos-kebab', num: 2, name: 'Tacos con carne kebab', desc: 'Carne kebab de pollo y ternera, queso mozzarella, salsa Tacos Argelina, salsa blanca y verduras a tu gusto.', tags: ['tacos', 'pollo', 'ternera'], poster: 'tacos-bandejas-poster.jpg',
    prices: [{ value: e('6,00') }, { label: 'XXXL (doble)', value: e('8,00') }, { label: 'Menú', value: e('8,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'tacos-mixto', num: 3, name: 'Tacos con pechugas y kebab', desc: 'Pechugas de pollo rebozadas y carne kebab de pollo y ternera, mozzarella, salsa Tacos Argelina, salsa blanca y verduras.', tags: ['tacos', 'pollo', 'ternera'], img: 'tacos-capas',
    prices: [{ value: e('7,00') }, { label: 'XXXL (doble)', value: e('9,00') }, { label: 'Menú', value: e('9,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'tacos-horno', num: 4, name: 'Tacos gratinado en horno', desc: 'Queso fundido en horno, pechugas de pollo rebozadas, mozzarella, salsa Tacos Argelina, salsa blanca y verduras.', tags: ['tacos', 'pollo'], img: 'tacos-xl-gratinado',
    prices: [{ value: e('8,00') }, { label: 'Menú', value: e('10,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'tacos-especial', num: 5, name: 'Tacos especial', desc: 'Arriba, tiras de pollo crispy con queso fundido al horno; dentro, pechugas de pollo rebozadas, mozzarella, salsa Tacos Argelina, salsa blanca y verduras.', tags: ['tacos', 'pollo'], img: 'tacos-tiras',
    prices: [{ value: e('9,00') }, { label: 'Menú', value: e('11,00'), note: 'patatas + bebida', menu: true }] },

  { id: 'plato-kebab', num: 10, name: 'Plato kebab', desc: 'Carne de döner con arroz, ensalada y salsas.', tags: D,
    prices: [{ value: e('7,50') }, { label: 'Menú', value: e('9,50'), note: 'patatas + bebida', menu: true }] },
  { id: 'mesopotamia', num: 8, name: 'Plato Mesopotamia', desc: 'Con queso fundido por encima.', tags: D, img: 'plato-mesopotamia',
    prices: [{ value: e('7,50') }, { label: 'Menú', value: e('9,50'), note: 'patatas + bebida', menu: true }] },
  { id: 'degustacion', num: 9, name: 'Plato degustación', desc: 'Para probar de todo: carne, falafel, patatas, arroz y ensalada.', tags: D, img: 'plato-degustacion',
    prices: [{ label: '1 persona', value: e('9,90') }, { label: 'Menú 1 persona', value: e('12,00'), menu: true }, { label: '2 personas', value: e('11,90') }, { label: 'Menú 2 personas', value: e('14,00'), menu: true }] },
  { id: 'tapa', num: 7, name: 'Tapa (box)', desc: 'Döner en caja con salsas.', tags: D, img: 'plato-tapa',
    prices: [{ label: 'Pequeña', value: e('2,50') }, { label: 'Mediana', value: e('4,00') }, { label: 'Grande', value: e('7,00') }, { label: 'XXXL', value: e('9,00') }] },

  { id: 'durum-falafel', num: 22, name: 'Dürum falafel', desc: 'Dürum de falafel con verduras y salsa.', tags: ['vegetariano'],
    prices: [{ value: e('4,50') }, { label: 'Grande', value: e('+1,00') }, { label: 'Menú', value: e('7,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'plato-falafel', num: 23, name: 'Plato falafel', tags: ['vegetariano'],
    prices: [{ value: e('6,00') }, { label: 'Menú', value: e('8,50'), note: 'patatas + bebida', menu: true }] },
  { id: 'ensalada', num: 24, name: 'Ensalada turca', tags: ['vegetariano'],
    prices: [{ value: e('5,00') }, { label: 'Con carne', value: e('7,50') }] },

  { id: 'palomitas-queso', num: 11, name: 'Palomitas con queso fundido', tags: ['pollo'], img: 'plato-palomitas',
    prices: [{ value: e('5,00') }, { label: 'Menú', value: e('7,50'), note: 'patatas + bebida', menu: true }] },
  { id: 'tiras-pollo', num: 12, name: 'Tiras de pollo', tags: ['pollo'], img: 'plato-tiras-pollo',
    prices: [{ label: '3 uds.', value: e('3,50') }, { label: '5 uds.', value: e('5,50') }, { label: 'Menú 3 uds.', value: e('6,00'), note: 'patatas + bebida', menu: true }] },
  { id: 'palomitas-pollo', num: 16, name: 'Palomitas de pollo', tags: ['pollo'],
    prices: [{ label: '10 uds.', value: e('2,00') }, { label: '16 uds.', value: e('3,00') }, { label: 'Menú 16 uds.', value: e('5,50'), note: 'patatas + bebida', menu: true }] },
  { id: 'alitas', num: 17, name: 'Alitas de pollo', tags: ['pollo'],
    prices: [{ label: '5 uds.', value: e('3,50') }, { label: '8 uds.', value: e('5,50') }, { label: 'Menú 5 uds.', value: e('5,50'), note: 'patatas + bebida', menu: true }] },
  { id: 'nuggets', num: 18, name: 'Nuggets', tags: ['pollo'],
    prices: [{ label: '6 uds.', value: e('3,50') }, { label: '10 uds.', value: e('5,50') }, { label: 'Menú 6 uds.', value: e('5,50'), note: 'patatas + bebida', menu: true }] },

  { id: 'palitos-queso', num: 19, name: 'Palitos de queso', tags: ['vegetariano'],
    prices: [{ label: '6 uds.', value: e('3,50') }, { label: '9 uds.', value: e('5,50') }] },
  { id: 'aros', num: 21, name: 'Aros de cebolla', tags: ['vegetariano'],
    prices: [{ label: '10 uds.', value: e('3,50') }, { label: '15 uds.', value: e('5,50') }] },
  { id: 'calamares', num: 20, name: 'Calamares', tags: [],
    prices: [{ label: '6 uds.', value: e('3,50') }, { label: '10 uds.', value: e('5,50') }] },
  { id: 'patatas', num: 14, name: 'Patatas fritas', tags: ['vegetariano'],
    prices: [{ label: 'Pequeña', value: e('2,00') }, { label: 'Mediana', value: e('3,00') }, { label: 'Grande', value: e('4,50') }] },
  { id: 'deluxe', num: 15, name: 'Patatas deluxe', tags: ['vegetariano'],
    prices: [{ label: 'Pequeña', value: e('2,50') }, { label: 'Mediana', value: e('3,50') }, { label: 'Grande', value: e('5,00') }] },
  { id: 'arroz', num: 13, name: 'Arroz basmati', tags: ['vegetariano'],
    prices: [{ label: 'Pequeña', value: e('2,00') }, { label: 'Mediana', value: e('3,50') }, { label: 'Grande', value: e('5,00') }] },

  { id: 'bebidas', name: 'Bebidas', desc: 'Todos los menús incluyen bebida. Pregunta por la selección de refrescos.', tags: ['bebidas'],
    prices: [] },
]

export const imgSrc = (n: string) => ({
  src: media(`img/${n}-640.webp`),
  srcSet: `${media(`img/${n}-640.webp`)} 640w, ${media(`img/${n}-1280.webp`)} 1280w`,
})
