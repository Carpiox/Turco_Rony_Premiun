import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Despliegue:
 *  - GitHub Pages (por defecto):  base /Turco_Rony_Premiun/ y URL https://carpiox.github.io/Turco_Rony_Premiun/
 *  - Cloudflare / dominio propio: VITE_BASE=/  VITE_SITE_URL=https://tu-dominio.com
 * VITE_SITE_URL es la URL pública absoluta; con ella se generan canonical, Open Graph,
 * JSON-LD, sitemap.xml y robots.txt. Sin ella (y con VITE_BASE definido) se omiten, en lugar de
 * publicar URLs de otro sitio.
 */
const GH_BASE = '/Turco_Rony_Premiun/'
const GH_URL = 'https://carpiox.github.io/Turco_Rony_Premiun/'
const base = process.env.VITE_BASE ?? GH_BASE
const rawSite = process.env.VITE_SITE_URL || (process.env.VITE_BASE === undefined ? GH_URL : '')
const siteUrl = rawSite ? rawSite.replace(/\/*$/, '/') : ''

function seo(): Plugin {
  return {
    name: 'site-url-seo',
    transformIndexHtml(html) {
      // JSON-LD: se rehace con la URL real (o sin url/image si no la hay)
      html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/, (_m, a, json, c) => {
        const data = JSON.parse(json.replaceAll('__SITE_URL__', siteUrl))
        if (!siteUrl) { delete data.url; delete data.image; delete data.logo }
        return `${a}\n${JSON.stringify(data, null, 2)}\n    ${c}`
      })
      // metas con URL absoluta: se quitan si no hay URL del sitio
      if (!siteUrl) html = html.split('\n').filter((l) => !l.includes('__SITE_URL__')).join('\n')
      return html.replaceAll('__SITE_URL__', siteUrl)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}sitemap.xml\n` : ''}` })
      if (siteUrl) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}</loc></url></urlset>\n` })
      else this.warn('VITE_SITE_URL no definida: se omiten canonical, og:url, og:image, twitter:image, sitemap.xml y la url/image/logo del JSON-LD.')
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), seo()],
  build: { target: 'es2020', chunkSizeWarningLimit: 900 },
})
