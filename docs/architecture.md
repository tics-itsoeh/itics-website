# Arquitectura y Estructura del Sitio

El sitio de **ITICs ITSOEH** está diseñado bajo los principios de **JAMstack**, utilizando [Astro](https://astro.build/) para lograr generación de sitios estáticos (SSG) de ultra alto rendimiento.

## 🏛️ Principios Arquitectónicos
1. **Zero JavaScript by Default**: El sitio envía HTML y CSS puros al cliente. El único JS cargado es el de interacciones específicas (como Three.js en el hero o el menú móvil).
2. **Single Source of Truth (SSOT)**: Configuración global, enlaces institucionales y datos de contacto se consumen desde `src/data/siteConfig.ts` para evitar la redundancia y errores de sincronización.
3. **i18n Basado en Datos**: Las páginas no contienen texto duro. Extraen diccionarios de traducciones (`src/messages/[lang]/`) permitiendo escalar a múltiples idiomas sin duplicar componentes Astro.

## 🗂️ Responsabilidad de Carpetas Principales

### `src/pages/`
Aquí se define el enrutamiento. Las páginas `.astro` no deben contener estilos largos ni textos. Su única responsabilidad es:
1. Extraer el idioma de la URL.
2. Consumir los datos del JSON correspondiente.
3. Llamar a los componentes de UI pasándole los datos extraídos.

### `src/components/`
Componentes "tontos" (Dumb Components) de UI pura. 
Deben estar altamente aislados. Si se requiere un botón, se importa la clase de Tailwind o el componente `<Button>`. Nunca mezclan lógica de negocio o fetch de APIs externas.

### `src/layouts/`
Contiene los "App Shells". El archivo `Layout.astro` es responsable de:
1. Configuración del `<head>` (SEO, Metadatos).
2. Carga de dependencias globales como Lenis (smooth scroll).
3. Inserción de la navegación principal (Navbar) y el pie de página (Footer) alrededor de la etiqueta `<slot />`.

### `src/data/`
Centraliza la información estática pero volátil (como fechas de admisión y teléfonos) para que no dependan del idioma, evitando inconsistencias entre la versión en español y en inglés.

### `src/messages/`
La base de datos estática. Se agrupa en carpetas por idioma (`/es`, `/en`, `/zh`). Cada archivo JSON representa una página (`home.json`, `projects.json`).

> Para ver cómo estas piezas interactúan visualmente, consulta [Diagramas del Sistema](diagrams.md).
