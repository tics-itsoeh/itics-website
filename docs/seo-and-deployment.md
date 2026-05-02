# Guía de SEO y Despliegue

## 🔍 Guía de Optimización en Buscadores (SEO)

### 1. Etiquetas de Cabecera (Layout.astro)
El archivo principal maneja el SEO de forma dinámica:
- **Títulos**: Se genera concatenando "Ing. TICs - " + el título de la página.
- **Meta Descriptions**: Breves descripciones que invitan al clic. Si no se provee, usa el "tagline" general del sitio.
- **Open Graph (OG)**: Inyecta etiquetas para previsualizaciones ricas en WhatsApp, Facebook y LinkedIn.
- **Hreflang**: Al ser un sitio i18n, incluye automáticamente `<link rel="alternate" hreflang="es" href="..." />` para evitar penalizaciones por contenido duplicado.

### 2. Schema.org (JSON-LD)
Añadimos metadatos semánticos para los bots de Google.
- **En la página de Formación**: Hay un script tipo `Course` de Schema.org, indicando explícitamente a Google que el ITSOEH imparte el curso/carrera "Ingeniería en Tecnologías de la Información y Comunicaciones".

### 3. Buenas Prácticas Continuas
- Mantén las URLs limpias (ej. `/es/unirse`, no `/es/unirse-y-admision-2026`).
- Asegúrate de que las `Keywords` (si se usan) fluyan naturalmente en los títulos `<h2>` y párrafos `p`, no amontonadas en una lista oculta.

---

## 🚀 Guía de Despliegue

El sitio está construido como un **SSG (Static Site Generator)** en Astro, lo que significa que el comando `npm run build` genera una carpeta `/dist` con puros archivos `.html`, `.css` y `.js` sin servidor backend requerido.

### Opciones de Despliegue Recomendadas

#### 1. Cloudflare Pages (🏆 Recomendado)
- **Por qué**: Ofrece el CDN más rápido, mitigación DDoS integrada, y ancho de banda infinito gratis. Ideal para un sitio institucional que podría recibir ataques o picos de tráfico en temporada de admisiones.
- **Cómo**: Conecta el repositorio de GitHub en el dashboard de Cloudflare. Usa el framework preset "Astro" (`npm run build` y carpeta de salida `dist`).

#### 2. Vercel
- **Por qué**: Extremadamente fácil de configurar y maneja optimización de imágenes (Edge Image Optimization) muy bien de fábrica.
- **Cómo**: Importa el proyecto desde GitHub en Vercel, seleccionará Astro automáticamente.

#### 3. GitHub Pages
- **Por qué**: Gratuito y el código ya vive en GitHub.
- **Cómo**: Requiere configurar un GitHub Action (archivo `.github/workflows/deploy.yml`) para ejecutar Astro y publicar la carpeta `/dist` en la rama `gh-pages`.

### Notas de Servidor (Configuraciones Especiales)
Si llegaran a montar el sitio en un servidor Apache tradicional interno del ITSOEH (`.htaccess`):
1. Quitar los trailing slashes.
2. Forzar HTTPS permanentemente.
3. Configurar caché larga (1 año) para `/public/model/` y assets con hash, y caché corta (0) para `.html`.
