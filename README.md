# ITZGA · Jabones y Velas

Sitio estático (HTML, CSS y JS, sin dependencias) listo para **GitHub Pages**.

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub (por ejemplo `itzga`).
2. Sube **el contenido** de esta carpeta a la raíz del repositorio (`index.html` debe quedar en la raíz).
3. En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch**, elige la rama `main` y la carpeta `/ (root)`.
4. Tu sitio quedará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Configurar la URL (importante para Google)
Los archivos incluyen la URL de ejemplo `https://TU-USUARIO.github.io/TU-REPO/` en las etiquetas canonical, Open Graph, datos estructurados, `sitemap.xml` y `robots.txt`. Cámbiala por la real con:

    python configurar_url.py https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/

(O usa buscar y reemplazar en todo el proyecto.) Si usas dominio propio, pon ese dominio.

## Aparecer en Google
1. Entra a [Google Search Console](https://search.google.com/search-console) y agrega tu sitio.
2. Envía el sitemap: `sitemap.xml`.
3. Pide la indexación de la página de inicio.

## Estructura
- Páginas: `index`, `jabones-botanicos`, `jabones-artesanales`, `jabones-clasicos`, `velas-artesanales`, `velas-aromaticas`, `velas-comestibles`, `nosotros`, `contacto` y `404`.
- `css/style.css`, `js/main.js`, `images/`.
- SEO y PWA: `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicons e imagen para redes (`images/og-itzga.jpg`).
- Contacto: itzgaoficial@gmail.com
