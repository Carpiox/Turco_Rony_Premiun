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
  // Plataformas de reparto: rellenar la url cuando se sepa (si es null, no se muestra)
  platforms: [
    { name: 'Glovo', url: null as string | null },
    { name: 'Just Eat', url: null as string | null },
  ],
  delivery: {
    price: '1 €',
    area: 'Cieza',
    minOrder: '6 €',
    hours: '13:15–15:00 y 19:00–00:00', // horario de reparto
  },
}

/** Reseñas reales de Google. Vacío = la sección se oculta. */
export interface Review { text: string; author: string; date: string; stars: number }
export const REVIEWS: Review[] = []

export const waLink = (text: string) =>
  `https://wa.me/${site.phone.replace('+', '')}?text=${encodeURIComponent(text)}`
/** "Envío por solo 1 € · Pedido mínimo 6 €"; con zona: "Envío por solo 1 € en Cieza · Pedido mínimo 6 €" */
export const deliveryText = (withArea = false) =>
  [`Envío por solo ${site.delivery.price}${withArea ? ` en ${site.delivery.area}` : ''}`, site.delivery.minOrder && `Pedido mínimo ${site.delivery.minOrder}`].filter(Boolean).join(' · ')
export const deliveryHoursText = () => (site.delivery.hours ? `Reparto ${site.delivery.hours}` : null)
export const WA_ORDER = waLink('¡Hola! Quiero hacer un pedido en Döner Kebab Cieza 🥙')

export const mapsQuery = encodeURIComponent(`${site.name}, ${site.street}, ${site.city}`)
export const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`
// Ficha de Google Maps del local (enlace facilitado por el dueño)
export const mapsLink = 'https://maps.app.goo.gl/gVyt2ziCXCXvshoJ8'
// Valoración en Google (dato facilitado por el dueño)
export const rating = { score: '4,3', outOf: '5', count: 206 }
