# Guía de Optimización en Buscadores (SEO)

La captación de aspirantes depende fuertemente del tráfico orgánico en buscadores. Para que el sitio oficial de ITICs indexe de manera correcta y competitiva en Google, hemos configurado una arquitectura dinámica de metadatos.

## 🔍 1. Metadatos de Cabecera Dinámicos (`Layout.astro`)
Todo el SEO estructural es inyectado por el componente maestro `Layout.astro`.

- **Etiquetas de Título (`<title>`)**: No te preocupes por colocar nombres de la institución manualmente. El layout concatena de forma automática "Ing. TICs - " con el título de la página que le pases como parámetro.
- **Meta Descripciones (`<meta name="description">`)**: Las descripciones breves que invitan al clic se extraen de las traducciones (`tagline`). Si creas una página nueva, pásale la prop `description="Tu texto..."` al Layout.
- **Open Graph (OG Tags)**: Para redes sociales (Facebook, LinkedIn, WhatsApp). El layout inyecta las etiquetas `og:title`, `og:description` y `og:url`.
- **Hreflang Dinámico para i18n**: Al ser un sitio con múltiples idiomas (Español, Inglés, Chino), evitar que Google nos penalice por "contenido duplicado" es vital. El Layout inserta las etiquetas `<link rel="alternate" hreflang="XX" href="..." />` mapeando todas las rutas alternativas de la URL actual.

## 🗂️ 2. URLs Limpias y Semánticas
Las URLs deben ser cortas, descriptivas y sin parámetros inútiles de rastreo.
- ✅ *Correcto*: `https://itics.itsoeh.edu.mx/es/unirse`
- ❌ *Incorrecto*: `https://itics.itsoeh.edu.mx/es/informacion-y-requisitos-de-admision-2026-final`

## 🧠 3. Microdatos Estructurados: Schema.org (JSON-LD)
Schema.org permite que los bots de los buscadores "entiendan" el contexto del sitio, logrando que muestren resúmenes enriquecidos (Rich Snippets) en la página de resultados (SERP).

Hemos añadido un bloque JSON-LD específico en la página principal de la retícula (`src/pages/[lang]/formacion/index.astro`). 

Se ha definido un esquema de tipo `@type: "Course"`. Este bloque inyecta en formato JSON que el programa "Ingeniería en Tecnologías de la Información y Comunicaciones" es un Curso Oficial impartido bajo el techo organizativo de la Entidad Educativa `@type: "EducationalOrganization"` llamada "ITSOEH".

**Si se crea una sección de Profesores Detallada o Proyectos**, se sugiere añadir microdatos de tipo `Person` (Docentes) o `SoftwareSourceCode` (Proyectos).

## 📊 4. Sitemap Estático y `robots.txt`
El proyecto utiliza el paquete oficial `@astrojs/sitemap`. Durante la fase de construcción para producción (`npm run build`), Astro escanea y genera dinámicamente un archivo XML listando las 40+ rutas disponibles. Este archivo se indexa mucho más rápido. No modifiques el sitemap manualmente; si una página no debe ser indexada, bloquéala en la configuración de Astro.
