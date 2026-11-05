export const BASE = import.meta.env.BASE_URL
export const media = (p: string) => `${BASE}media/${p}`

export const PENDING = {
  titular: '[NOMBRE O RAZÓN SOCIAL]',
  nif: '[NIF/CIF]',
  email: '[EMAIL DE CONTACTO]',
  resenas: '[RESEÑAS REALES]',
  puntuacion: '[X,X]',
  numResenas: '[N]',
  enlaceResenas: '#',
  alergenos: '[LISTA DE ALÉRGENOS POR PLATO]',
  precioBebida: '[PRECIO BEBIDAS]',
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
  // Plataformas de reparto: rellenar la url cuando se sepa
  delivery: [
    { name: 'Glovo', url: null as string | null },
    { name: 'Just Eat', url: null as string | null },
  ],
}

export const waLink = (text: string) =>
  `https://wa.me/${site.phone.replace('+', '')}?text=${encodeURIComponent(text)}`
export const WA_ORDER = waLink('¡Hola! Quiero hacer un pedido en Döner Kebab Cieza 🥙')

export const mapsQuery = encodeURIComponent(`${site.name}, ${site.street}, ${site.city}`)
export const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
