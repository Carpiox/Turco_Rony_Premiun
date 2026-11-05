export const BASE = import.meta.env.BASE_URL
export const media = (p: string) => `${BASE}media/${p}`

export const PENDING = {
  titular: '[NOMBRE O RAZÓN SOCIAL]',
  nif: '[NIF/CIF]',
  email: '[EMAIL DE CONTACTO]',
  alergenos: '[LISTA DE ALÉRGENOS POR PLATO]',
}

export const site = {
  name: 'Döner Kebab Cieza',
  phone: '+34631188411',
  phoneDisplay: '631 18 84 11',
  street: 'Gran Vía Juan Carlos I, 30',
  city: '30530 Cieza, Murcia',
  instagram: 'https://www.instagram.com/kebab_cieza/',
  tiktok: 'https://www.tiktok.com/@kebap_cieza',
  hoursText: ['12:30 – 16:00', '19:00 – 00:45'],
  // Plataformas de reparto: rellenar la url cuando se sepa (si es null, no se muestra)
  platforms: [
    { name: 'Glovo', url: null as string | null },
    { name: 'Just Eat', url: null as string | null },
  ],
  delivery: {
    price: '1 €',
    area: 'Cieza',
    // [CONFIRMAR] pedido mínimo y horario de reparto: rellenar y se mostrarán solos
    minOrder: null as string | null, // p. ej. '10 €'
    hours: null as string | null, // p. ej. '12:30–16:00 y 19:00–00:30'
  },
}

/** Reseñas reales de Google. Vacío = la sección se oculta. */
export interface Review { text: string; author: string; date: string; stars: number }
export const REVIEWS: Review[] = []

export const waLink = (text: string) =>
  `https://wa.me/${site.phone.replace('+', '')}?text=${encodeURIComponent(text)}`
export const WA_ORDER = waLink('¡Hola! Quiero hacer un pedido en Döner Kebab Cieza 🥙')

export const mapsQuery = encodeURIComponent(`${site.name}, ${site.street}, ${site.city}`)
export const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
