# Raicilla Hnos. Arrizón — Sitio web

Sitio multi-página (HTML + CSS + JS puros, sin frameworks) con estilos
(`css/styles.css`) e interacciones (`js/main.js`). Diseño artesanal-premium,
claro, con animaciones y optimización SEO (meta tags, datos estructurados,
sitemap y robots).

Páginas:

- `index.html` → Inicio: age gate, hero, presentación, medallas, destacados, FAQ.
- `historia.html` → Historia: cronología en carrusel, maestros, valores.
- `productos.html` → Productos: 3 destilados con notas sensoriales y 8 ponches.
- `proceso.html` → Proceso: 8 pasos del agave maximiliana + sostenibilidad.
- `contacto.html` → Contacto: WhatsApp, tour, mapa y formulario.
- `tour.html` → Página oculta del Tour a La Vieja (no aparece en el menú; se accede
  desde la tarjeta "Visita la Taberna" de `productos.html`).
- `raicilla.html` → Guía sobre la raicilla (origen, denominación y tabla comparativa).
  Se accede desde el enlace "raicilla" en la presentación de `index.html`.
- `compartir/*.html` → 13 páginas ligeras (una por producto) para compartir por
  WhatsApp. Son `noindex`, tienen Open Graph propio y enlazan al producto en
  `productos.html`. Se abren desde los botones de compartir de esa página.
- `aviso-privacidad.html` → Aviso de privacidad (LFPDPPP). Solo enlace en el footer.
- `aviso-legal.html` → Aviso legal (restricción de edad, consumo responsable,
  propiedad intelectual). Solo enlace en el footer.


La navegación es la misma en todas (navbar + footer + botón flotante de WhatsApp)
y `js/main.js` activa solo lo que existe en cada página.

## Cómo ver el sitio

Abre `index.html` en tu navegador. Se recomienda un servidor local (para que todo
cargue bien): si tienes Python o Node, desde esta carpeta corre:

```
# Python
python -m http.server 8080

# Node
npx serve .
```

y abre `http://localhost:8080`.

## IMPORTANTE: datos que debes reemplazar

Todo está centralizado en **`js/main.js`**, arriba, en el objeto `CONTACT`:

| Dato | Valor actual | Qué hacer |
|---|---|---|
| WhatsApp | `523881025335` (+52 388 102 5335) | Verificar número |
| Teléfono | +52 388 102 5335 (mismo que WhatsApp) | Verificar |
| Correo | `hnos.arrizon.raicilla@gmail.com` | Ya es el oficial |
| Instagram | `https://www.instagram.com/hnos_arrizon/` | Ya es el oficial |
| TikTok | `https://www.tiktok.com/@hnos_arrizon` | Ya es el oficial |
| Facebook | `https://www.facebook.com/Hnos.Arrizon` | Ya es el oficial |

> Los enlaces de WhatsApp, teléfono, correo, mapa y redes ya no usan `href="#"`: cada
> `<a>` tiene su URL real en el HTML (para que los buscadores y los visitantes sin JS
> vean un destino válido), y `wireLinks()` en `js/main.js` los sobrescribe al cargar.
> Si cambias un dato en `CONTACT`, actualiza también el `href` del HTML correspondiente.
> `#footerTel` es un `tel:` real, no un enlace a WhatsApp.

La **frase principal** está en el hero de `index.html` (sección `hero__title`).
El texto actual *"Sabor y tradición es Raicilla Hnos. Arrizón"* es un **placeholder**
que el dueño aún debe confirmar; cámbialo en `index.html`.

La **ubicación del mapa** está como iframe de OpenStreetMap en `contacto.html`
(sección `map__embed`). Para afinar la ubicación exacta de la Taberna La Vieja,
busca el punto en Google Maps, elige "Compartir → Insertar un mapa" y sustituye
el iframe en `contacto.html`.

## Notas sobre las medallas

En `index.html` hay una sección **premium de medallas** (`.medals__row`) con dos
círculos dorados que muestran una foto de cada medalla real de la marca. Mientras
no existan las fotos, cada círculo muestra el sello "RA" como respaldo.

Para usar las medallas reales, agrega en `images/`:

```
images/medalla-1.webp    images/medalla-2.webp
```

y edita el `src` y los textos dentro de `medals__row` en `index.html`. Además de
los premios, la sección cita logros verificados:
- Primer registro de marca de raicilla en la zona de Mascota.
- Sandra Arrizón, Embajadora de la Raicilla 2019 (XII Festival de la Raicilla).
- Denominación de Origen de la Raicilla (2019).
- Participación en IX Expo Tequila Tlaquepaque y XII Festival de la Raicilla.

## Carrusel de la historia

La sección "Cronología" de **`historia.html`** es un carrusel **estilo Netflix**:
una fila de tarjetas del mismo tamaño que se desliza horizontalmente con scroll
nativo (arrastra con el dedo o el mouse, con efecto de encaje por tarjeta) y un
adelanto de la siguiente. Avance automático cada ~4.5 segundos; las flechas ‹ ›
avanzan de 1 en 1. Al llegar al final, vuelve al inicio. Se pausa al pasar el
mouse o al tocar la fila.

Cada tarjeta (`article.hcard`) muestra una foto, el año y un texto:

```html
<article class="hcard">
  <div class="hcard__media">
    <img src="images/mi-foto.webp" alt="Describe la foto" width="800" height="600" loading="lazy" decoding="async">
    <span class="hcard__year">1932</span>
  </div>
  <div class="hcard__body">
    <h3>Título del capítulo</h3>
    <p>Texto…</p>
  </div>
</article>
```

Coloca la foto en `images/` y cambia `src`, `alt` y `hcard__year`. No importa
cuántas tarjetas haya: el bucle infinito funciona con cualquiera. Las fotos de
ejemplo usan imágenes reales de la marca extraídas de su sitio oficial
(`raicillahnosarrizon.wordpress.com`). Las que se sirven hoy están en WebP:
`historia_agave.webp`, `agave1.webp`, `maestros.webp`, `logo.webp` y
`botella_cristalino.webp`.

Para cambiar la velocidad del autoplay, busca `AUTOPLAY_MS` (milisegundos) en el
bloque "CARRUSEL HISTORIA" de `js/main.js`. Pon `0` para desactivarlo.

## Ponches de frutas

La sección de **`productos.html`** muestra los ponches con foto disponible, con fondo
transparente (`*-cutout.webp`, generados con rembg/u2net y convertidos a WebP) en `images/productos/`:

```
images/productos/jamaica-cutout.webp     images/productos/mango-cutout.webp
images/productos/tamarindo-cutout.webp   images/productos/maracuya-cutout.webp
images/productos/cafe-cutout.webp        images/productos/raicilla_normal-cutout.webp
images/productos/madurado-cutout.webp    images/productos/pachita-cutout.webp
```

Cada tarjeta es clicable: la foto o "Detalles" abre un modal con foto y ficha completa
(notas, chips y botón de WhatsApp). Para cambiar datos de un producto, edita la entrada
correspondiente en `PRODUCTOS` dentro de `js/main.js` (las tarjetas `.shopcard` y sus
fotos viven en `productos.html`).

## Botella giratoria (360°)

En la sección "Quiénes somos" de `index.html` hay una botella que gira al arrastrar
con el mouse o el dedo; también responde a las flechas ← → cuando tiene el foco.
La lógica está en `js/bottle360.js` y los cuadros que se muestran son
`images/botella-360/display/frame-00.webp` … `frame-19.webp`.

Sólo se precargan el frame visible y sus vecinos (no los 20 al inicio), para no
penalizar la carga. Las carpetas `aligned/`, `ordered/`, `smooth/`, `turntable/`,
`uniform/`, los `norm-frame-*` y `images/botella-3d/` son material de trabajo y
**no** se referencian desde el sitio: borrarlos no cambia la web.

## Proceso con fotos y videos reales

Los 8 pasos de `proceso.html` muestran la foto real de cada etapa y un slot de video.
Cada paso declara `data-video="images/proceso/<paso>.mp4"` en el `<article class="step">`;
`js/main.js` crea el `<video>` bajo demanda (muted, `preload="metadata"`, sin descarga
hasta que se pulsa). El slot muestra un **frame de preview**: al cargar los metadatos se
extrae un fotograma real del propio video (canvas → `poster` en data-URL) y, si falla,
se usa la foto del paso como póster. El frame de preview se muestra con un suave
desenfoque y oscurecido (`filter: blur(6px) brightness(.82)`) para que resalte el
símbolo de reproducir; al pulsar ▶ el video se ve nítido. Clic en el slot ▶ reproduce
y oculta el icono;
otro clic sobre el video lo pausa y regresa al frame. Para cambiar una foto o video
basta editar `src`/`data-video` del paso. Las fotos están en `images/proceso/*.webp` y
los videos en `images/proceso/*.mp4` (semilla, vivero, transplante, jima, cocción,
molienda, fermentación y destilación).

> El frame se extrae del video solo en el mismo origen (HTTP/HTTPS); al abrir la página
> directo como archivo (`file://`) el canvas queda "tainted" y se usa la foto como póster.

> Peso: los 8 videos suman ~22 MB (`jima.mp4` pesa 6.5 MB). No afectan el rendimiento
> de carga porque se sirven con `preload="metadata"`, pero considera comprimirlos o
> subirlos por separado a YouTube/Vimeo si el hosting te limita el tamaño.

## Estructura

```
index.html       → inicio: age gate, hero, presentación, medallas, destacados, FAQ
historia.html    → cronología, maestros y valores
productos.html   → destilados y ponches
proceso.html     → 8 pasos de elaboración + sostenibilidad
contacto.html    → WhatsApp, tour, mapa y formulario
tour.html        → página oculta del tour (sin enlace en menú; desde la tarjeta en productos.html)
raicilla.html    → guía sobre la raicilla y tabla comparativa
compartir/       → 13 páginas ligeras para compartir cada producto por WhatsApp
aviso-privacidad.html → aviso de privacidad (LFPDPPP; enlace en el footer)
aviso-legal.html → aviso legal (18+, consumo responsable, propiedad intelectual; enlace en el footer)
404.html          → página de error (noindex; GitHub Pages la sirve automáticamente)
css/styles.css   → diseño y animaciones (compartido)
js/main.js       → age gate, scroll, WhatsApp, formulario, carrusel
js/bottle360.js  → botella giratoria del inicio (frames bajo demanda)
images/          → fotos de la marca y fondos
robots.txt       → instrucciones para buscadores
sitemap.xml      → mapa del sitio para Google: 22 URLs (9 indexables + 13 de
                   `compartir/`), con imágenes y videos. `404.html` queda fuera
                   porque es noindex y una página de error no debe indexarse
```

## Extras ya incluidos

- Aviso de mayoría de edad (18+) en `index.html`, que aparece en cada visita nueva
  al sitio (se recuerda por `sessionStorage` solo durante esa sesión de navegación).
- Botones de pedido por WhatsApp con mensaje prellenado (producto + visita) en todas
  las páginas.
- Formulario de contacto que envía el mensaje directo a WhatsApp (sin servidor).
- Cronología animada, contadores, parallax, reveal on scroll, botón flotante de
  WhatsApp y menú móvil.
- Barra de progreso de lectura y año dinámico en el footer.
- Botella 360 en el inicio: arrastra o usa ← →; precarga sólo los frames vecinos.
- Cero `href="#"` en todo el sitio: cada enlace tiene destino real en el HTML.
- `.sr-only` (texto solo para lectores de pantalla) en los enlaces que sólo
  contienen un ícono: logo del navbar y los tres botones sociales del footer.
- `.ext` en los enlaces a fuentes externas, que añade la flecha `↗` (content CSS,
  sin carácter en el texto, para no romper los lectores de pantalla).
- Las Google Fonts se cargan sin bloquear el render
  (`media="print" onload="this.media='all'"` + `<noscript>` de respaldo).
  `css/styles.css` sigue siendo bloqueante a propósito: es CSS crítico.
- `js/main.js` lleva `defer`; el mini `<script>` inline del `<head>` que cambia
  `no-js` → `js` se mantiene, porque el CSS depende de esas clases para el
  age gate y el preloader (moverlo provocaría destellos).

## SEO (lista de pendientes antes de publicar)

Cada página trae: `<title>`, `meta description`, `robots`, canonical, Open Graph,
Twitter Card, `preload` del hero y datos estructurados, además de `robots.txt` y
`sitemap.xml`. El sitemap incluye las 22 páginas HTML (las 9 indexables y las 13
de `compartir/`, que siguen con `noindex,follow` y por eso Google las mostrará
como «excluidas» en Search Console; no afecta al ranking).

**Identidad de marca (grafo de entidades):** las 9 páginas indexables publican un
mismo nodo `Organization` (`https://arrizon.mx/#organization`, con `sameAs` a
Facebook/Instagram/TikTok, `contactPoint` y `knowsAbout`) y un `Brand`
(`#brand`). El resto de nodos lo referencian por `@id`: `LiquorStore` e
`WebSite` en inicio, `AboutPage` en historia, `Article` en raicilla, `TouristTrip`
en tour, `HowTo` en proceso, `ContactPage` en contacto, `WebPage` en los avisos e
`ItemList` en productos. Las 13 páginas de `compartir/` publican un `Product`
con precio, marca y vendedor; sus tarjetas sociales y las del resto del sitio
usan la misma imagen OG 1200×630. El buscador acepta `?q=` para que el
`SearchAction` del sitio funcione de verdad.

Antes de subirlo a producción:

1. **Dominio real**: `https://arrizon.mx` ya está configurado en todas las páginas
   (incluidas las 13 de `compartir/`): canonical, `og:url`, `og:image`, JSON-LD,
   además de `robots.txt`/`sitemap.xml`.
   Verifica en GitHub Pages (o el hosting elegido) que el dominio apunte aquí y que
   las URLs funcionen con HTTPS.
2. **Imágenes optimizadas** (hecho): todo el contenido visual se sirve en **WebP**
   (`fondo.webp` del hero pasó de 346 KB a 265 KB; la foto grande de `raicilla.html`,
   de 315 KB a 227 KB). Se borraron 54 originales JPG/PNG que ya tenían gemelo WebP
   y no eran referenciados: 14.1 MB menos. `images/` quedó en 49.2 MB, de los cuales
   22 MB son videos y 18.7 MB los frames de la botella 360 (sólo se descargan 3).
   Se conservan como PNG/JPEG los favicons, el icono del manifest y los 14 OG de
   `images/og/` (1200×630, JPEG para máxima compatibilidad con WhatsApp/Facebook/X).
   Los fondos de `images/fondos/` siguen en JPEG porque su versión WebP pesaba más.
   Si cambias fotos, conviértelas a WebP (Squoosh/TinyPNG) y actualiza la extensión
   en HTML, CSS, JS, `sitemap.xml` y los datos estructurados.
 3. **(hecho)** Cronología de `historia.html` con fotos oficiales de la marca
    (`images/historia/1.blas arrizon.webp`, `2. generacion a generacion.webp`,
    `taberna.webp`, `DENOMICACION DE ORIGEN.webp`, `maestras raicilleras.webp` y
    `productos/jamaica-cutout.webp`). La tarjeta "Navidad" (Sandra como Embajadora)
    pasó a contar la introducción de los **ponches** (impulsada por la
    participación de las mujeres en la marca, para paladares que prefieren
    sabores más suaves). `maestras raicilleras.webp` es la foto real de **Luisa
    Fregoso y Carolina Quintero** (producción de los ponches) en la sección
    "Maestros". La imagen `WhatsApp Image 2026-08-01 at 6.49.48 PM.webp` se usa
    en `raicilla.html` (reducida a 850×850, de 315 KB a 227 KB).
4. Registra el sitio en **Google Search Console** y **Bing Webmaster Tools**,
   y envía `sitemap.xml`.
5. Conecta **Google Analytics 4** (o Plausible/GA4 alternativo) antes del lanzamiento.
6. Revisa los `alt` de las imágenes y añade los que falten si cambias fotos.
7. Verifica que el **canonical** y los enlaces apunten a `arrizon.mx` una vez
   publicado, y que el correo/handles (Instagram, TikTok, WhatsApp) sean los
   oficiales (ya actualizados en `js/main.js` y `contacto.html`).


