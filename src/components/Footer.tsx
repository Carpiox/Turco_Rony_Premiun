import type { ReactNode } from 'react'
import { PENDING, site } from '../data/site'
import { InstagramIcon, TikTokIcon } from './Icons'

function Doc({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <details id={id} className="group border-b border-crema/10 py-1 open:pb-4">
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between font-bold">
        {title}<span aria-hidden="true" className="text-ocre transition group-open:rotate-45">＋</span>
      </summary>
      <div className="space-y-3 text-sm leading-relaxed text-crema/75">{children}</div>
    </details>
  )
}

export function Footer() {
  return (
    <footer className="relative bg-coal pb-24 pt-14">
      <div className="kilim absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="container-x grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-display text-3xl" style={{ fontVariationSettings: "'wght' 800" }}>Döner Kebab <span className="text-ocre-soft italic">Cieza</span></p>
          <address className="mt-3 not-italic text-crema/75">{site.street}<br />{site.city}<br />
            <a href={`tel:${site.phone}`} className="underline decoration-ocre underline-offset-4">{site.phoneDisplay}</a></address>
          <p className="mt-3 text-sm text-crema/75">Todos los días · {site.hoursText.join(' y ')}</p>
          <div className="mt-5 flex gap-3">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Döner Kebab Cieza" className="grid h-11 w-11 place-items-center rounded-full border border-crema/25 hover:border-ocre hover:text-ocre-soft"><InstagramIcon /></a>
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Döner Kebab Cieza" className="grid h-11 w-11 place-items-center rounded-full border border-crema/25 hover:border-ocre hover:text-ocre-soft"><TikTokIcon /></a>
          </div>
        </div>

        <div>
          <Doc id="legal-alergenos" title="Alérgenos">
            <p>Nuestros platos pueden contener o tener trazas de gluten, lácteos, huevo, soja, mostaza, apio, sésamo, pescado, moluscos, frutos secos y otros de los 14 alérgenos de declaración obligatoria. Las frituras comparten aceite y la cocina es común, por lo que no podemos garantizar la ausencia total de trazas (tampoco en las opciones vegetarianas).</p>
            <p><strong>Si tienes alergia o intolerancia, avísanos antes de pedir.</strong> Tabla de alérgenos por plato: {PENDING.alergenos}.</p>
          </Doc>
          <Doc id="legal-aviso" title="Aviso legal">
            <p>Titular: {PENDING.titular} · NIF/CIF: {PENDING.nif} · Domicilio: {site.street}, {site.city} · Teléfono: {site.phoneDisplay} · Email: {PENDING.email}.</p>
            <p>Esta web es informativa. Los precios y la carta pueden cambiar; prevalece lo indicado en el local. Los contenidos y fotografías son propiedad del titular.</p>
          </Doc>
          <Doc id="legal-privacidad" title="Política de privacidad">
            <p>Esta web no tiene formularios ni cuentas y no recoge datos personales por sí misma. Si nos escribes por WhatsApp o nos llamas, usaremos tu número y tu mensaje solo para atender tu pedido o consulta. WhatsApp está gestionado por Meta, bajo su propia política.</p>
            <p>Responsable: {PENDING.titular} ({PENDING.nif}) · Contacto: {PENDING.email}. Puedes ejercer tus derechos de acceso, rectificación y supresión escribiendo a ese correo.</p>
          </Doc>
          <Doc id="legal-cookies" title="Cookies">
            <p>No usamos cookies propias, de analítica ni de publicidad, por lo que no mostramos banner. El mapa de Google solo se carga cuando pulsas «Cargar mapa» y, en ese momento, Google puede instalar sus cookies. Los enlaces a Instagram, TikTok, Google Maps o WhatsApp llevan a sitios de terceros con sus propias políticas.</p>
          </Doc>
        </div>
      </div>
      <p className="container-x mt-10 text-xs text-sand">© {new Date().getFullYear()} {site.name}. Textos legales orientativos: [REVISAR CON ASESOR].</p>
    </footer>
  )
}
