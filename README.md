# ITZGA · Jabones y Velas

Sitio estático (HTML, CSS y JS, sin dependencias) listo para **GitHub Pages**.

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub (por ejemplo `itzga`).
2. Sube **el contenido** de esta carpeta a la raíz del repositorio (`index.html` debe quedar en la raíz).
3. En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch**, elige la rama `main` y la carpeta `/ (root)`.
4. Tu sitio quedará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Configurar la URL (importante para Google)
Los archivos ya traen tu URL (`https://itzga-artesanal.github.io/itzga-oficial/`) en las etiquetas canonical, Open Graph, datos estructurados, `sitemap.xml` y `robots.txt`. Si cambias de dominio o de repositorio, actualízala con:

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

## Idiomas
- Español: raíz del sitio (`index.html`, `jabones-botanicos.html`, ...).
- Inglés: carpeta `en/` (`en/index.html`, `en/botanical-soaps.html`, ...), con su propio `js/main.en.js`.
- El botón **English / Español** del menú lleva a la misma página en el otro idioma. Las etiquetas `hreflang` y el `sitemap.xml` ya incluyen ambos idiomas para Google.
- Si cambias un texto, hazlo en las dos versiones.
