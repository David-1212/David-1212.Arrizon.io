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
| WhatsApp | `523881058508` (+52 388 105 8508) | Verificar número |
| Teléfono | +52 388 105 5998 | Verificar |
| Correo | `hnos.arrizon.raicilla@gmail.com` | Ya es el oficial |
| Instagram | `https://www.instagram.com/hnos_arrizon/` | Ya es el oficial |
| TikTok | `https://www.tiktok.com/@hnos_arrizon` | Ya es el oficial |
| Facebook | `https://www.facebook.com/Hnos.Arrizon` | Ya es el oficial |

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
images/medalla-1.jpg    images/medalla-2.jpg
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
    <img src="images/mi-foto.jpg" alt="Describe la foto" loading="lazy">
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
(`raicillahnosarrizon.wordpress.com`): `historia_agave.jpg`, `agave1.jpg`,
`historia_taberna.jpg`, `maestros.jpg`, `botella 2.jpg`, `logo.png` y
`botella_cristalino.jpg`.

Para cambiar la velocidad del autoplay, busca `AUTOPLAY_MS` (milisegundos) en el
bloque "CARRUSEL HISTORIA" de `js/main.js`. Pon `0` para desactivarlo.

## Ponches de frutas

La sección de **`productos.html`** muestra los ponches con foto disponible, con fondo
transparente (`*-cutout.png` generados con rembg/u2net) en `images/productos/`:

```
images/productos/jamaica-cutout.png     images/productos/mango-cutout.png
images/productos/tamarindo-cutout.png   images/productos/maracuya-cutout.png
images/productos/cafe-cutout.png        images/productos/raicilla_normal-cutout.png
images/productos/madurado-cutout.png    images/productos/pachita-cutout.png
```

Cada tarjeta es clicable: la foto o "Detalles" abre un modal con foto y ficha completa
(notas, chips y botón de WhatsApp). Para cambiar datos de un producto, edita la entrada
correspondiente en `PRODUCTOS` dentro de `js/main.js` (las tarjetas `.shopcard` y sus
fotos viven en `productos.html`).

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
basta editar `src`/`data-video` del paso. Las fotos están en `images/proceso/*.jpg` y
los videos en `images/proceso/*.mp4` (semilla, vivero, transplante, jima, cocción,
molienda, fermentación y destilación).

> El frame se extrae del video solo en el mismo origen (HTTP/HTTPS); al abrir la página
> directo como archivo (`file://`) el canvas queda "tainted" y se usa la foto como póster.

> Peso: los 8 videos suman ~146 MB (`jima.mp4` pesa 71 MB). No afectan el rendimiento
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
aviso-privacidad.html → aviso de privacidad (LFPDPPP; enlace en el footer)
aviso-legal.html → aviso legal (18+, consumo responsable, propiedad intelectual; enlace en el footer)
404.html          → página de error (noindex; GitHub Pages la sirve automáticamente)
css/styles.css   → diseño y animaciones (compartido)
js/main.js       → age gate, scroll, WhatsApp, formulario, carrusel
images/          → fotos de la marca y fondos
robots.txt       → instrucciones para buscadores
sitemap.xml      → mapa del sitio para Google (con imágenes)
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

## SEO (lista de pendientes antes de publicar)

Cada página trae: `<title>`, `meta description`, `robots`, canonical, Open Graph,
Twitter Card, `preload` del hero y datos estructurados (`WebSite`, `ItemList` en
productos, `HowTo` en proceso, `Distillery`/`FAQPage` en contacto e inicio), además
de `robots.txt` y `sitemap.xml`.

Antes de subirlo a producción:

1. **Dominio real**: `https://arrizon.mx` ya está configurado en las 8 páginas
   (canonical, `og:url`, `og:image`, JSON-LD) y en `robots.txt`/`sitemap.xml`.
   Verifica en GitHub Pages (o el hosting elegido) que el dominio apunte aquí y que
   las URLs funcionen con HTTPS.
2. **Imágenes optimizadas** (hecho): `images/fondo.jpeg` pasó de 2.6 MB a 403 KB
   (LCP del hero), los fondos de `images/fondos/` y las fotos de `images/proceso/`
   se re-comprimieron, y los cutouts de productos se sirven en **WebP** con fallback
   PNG (`<picture>`). La carpeta pasó de 68.9 MB a 12.2 MB. Si cambias fotos,
   procura mantener ese peso (Squoosh/TinyPNG).
3. **(hecho)** Cronología de `historia.html` con fotos oficiales de la marca
   (`historia_agave.jpg`, `historia_taberna.jpg`, `maestros.jpg` y
   `botella_cristalino.jpg`). La tarjeta "Navidad" (Sandra como Embajadora) se
   sustituyó por la noticia real **IX Expo Tequila Tlaquepaque 2019** (primera
   exposición de la marca). Pendiente: foto real de **las esposas de los
   maestros** en la sección "Maestros" (hoy usa `historia_taberna.jpg` como
   placeholder); al tenerla, colócala en `images/` y cambia el `src` de la
   segunda tarjeta.
4. Registra el sitio en **Google Search Console** y **Bing Webmaster Tools**,
   y envía `sitemap.xml`.
5. Conecta **Google Analytics 4** (o Plausible/GA4 alternativo) antes del lanzamiento.
6. Revisa los `alt` de las imágenes y añade los que falten si cambias fotos.
7. Verifica que el **canonical** y los enlaces apunten a `arrizon.mx` una vez
   publicado, y que el correo/handles (Instagram, TikTok, WhatsApp) sean los
   oficiales (ya actualizados en `js/main.js` y `contacto.html`).


