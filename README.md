# ITICs ITSOEH - Sitio Web Oficial

Repositorio oficial del sitio web de la carrera de **Ingeniería en Tecnologías de la Información y Comunicaciones (ITICs)** del Instituto Tecnológico Superior del Occidente del Estado de Hidalgo (ITSOEH).

## 📖 Descripción del Sitio
Este proyecto es una plataforma web moderna, rápida y accesible diseñada con un enfoque minimalista "Apple-like" (blanco, gris, azul, uso intensivo de *cards*, bordes redondeados y tipografía limpia). El sitio no solo funciona como un folleto informativo, sino como una herramienta de conversión para captar nuevos aspirantes y un escaparate de los logros de la comunidad estudiantil.

### Objetivo Institucional
Informar, captar aspirantes, mostrar proyectos estudiantiles destacados, explicar a fondo la carrera, presentar a la comunidad (mentores, clubes, docentes) y facilitar vías de contacto oficiales. Todo bajo la identidad institucional de la **SEP, TecNM, ITSOEH, Esparco (mascota)** y academias oficiales (**Huawei ICT Academy**, **Cisco Networking Academy**).

### Público Objetivo
1. **Aspirantes y Padres de Familia**: Que buscan información sobre el proceso de admisión, retícula y perfil de egreso.
2. **Estudiantes Actuales**: Para consultar proyectos, unirse a clubes o contactar docentes.
3. **Egresados y Empresas**: Para verificar la calidad académica, validar competencias tecnológicas y buscar talento.

---

## 🗺️ Páginas Disponibles
1. **Inicio (`/`)**: Resumen o *landing page* principal. Actúa como embudo hacia el resto del sitio.
2. **Carrera (`/formacion`)**: Detalles académicos, retícula (con PDF) y competencias profesionales.
3. **Aspirantes (`/unirse`)**: Flujo detallado para el proceso de admisión, fechas, requisitos y perfil de ingreso.
4. **Proyectos (`/proyectos`)**: Galería visual de evidencias de proyectos reales hechos por alumnos.
5. **Comunidad (`/mentores`)**: "Prueba social" de la carrera. Muestra egresados, clubes y docentes.
6. **Contacto (`/contacto`)**: Vías rápidas (WhatsApp/Correo) y vías institucionales (mapa/redes).

---

## 🛠️ Stack Tecnológico
- **Framework**: [Astro](https://astro.build/) (v4+) - *Para renderizado estático super rápido (SSG).*
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (v4) - *Sistema de utilidades.*
- **Internacionalización (i18n)**: Nativa / Custom via utilidades en `src/i18n`.
- **Renderizado 3D**: [Three.js](https://threejs.org/) - *Para el modelo interactivo del hero.*
- **Despliegue**: Optimizado para Edge / Estático (SSG).

---

## 🚀 Desarrollo e Instalación

### 1. Clonar e Instalar dependencias
Asegúrate de usar **Node.js 18+**.
```bash
git clone https://github.com/tics-itsoeh/itics-website.git
cd itics-website
npm install
```

### 2. Ejecutar en Desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:4321`. Los cambios se reflejarán automáticamente.

### 3. Compilar para Producción
Para verificar que todo funcione antes de hacer push:
```bash
npm run build
npm run preview
```
El build final se generará en la carpeta `dist/`.

---

## 📁 Estructura del Proyecto

```text
/
├── docs/                 # Documentación técnica detallada (Arquitectura, SEO, Guías)
├── public/               # Assets estáticos (imágenes, logos, modelos 3D, sw.js)
└── src/
    ├── components/       # Componentes reusables de UI (Navbar, Hero, Cards)
    ├── data/             # Configuración centralizada (siteConfig.ts)
    ├── i18n/             # Configuración de idiomas (es, en, zh)
    ├── layouts/          # Envoltorios de página (Layout.astro)
    ├── messages/         # Archivos JSON con el contenido de las páginas
    ├── pages/            # Rutas y páginas de la aplicación
    ├── scripts/          # Lógica interactiva en cliente (Three.js)
    └── styles/           # Tailwind CSS global
```

### Convenciones Generales
- **Single Source of Truth**: Teléfonos, links y fechas de admisión **solo** se modifican en `src/data/siteConfig.ts` o en los JSON de `messages/`. NUNCA se "hardcodean" en los archivos `.astro`.
- **Archivos JSON**: El contenido de las páginas vive en los JSON, no en el código.
- **Componentes Tontos**: Los componentes de Astro se limitan a recibir propiedades y renderizar HTML.

---

## ⚡ Manual Rápido para Mantenedores
> **"Soy nuevo, solo quiero actualizar el contenido, ¿qué hago?"**

1. **¿Quieres cambiar el número de WhatsApp, el teléfono, el ciclo escolar o links de Redes Sociales?**
   - Abre `src/data/siteConfig.ts`. Modifica los valores ahí y listo. Todo el sitio se actualizará solo.
2. **¿Quieres modificar el texto de un párrafo o agregar un proyecto/docente?**
   - Ve a `src/messages/es/`. Ahí verás archivos por cada página (ej. `projects.json`, `mentors.json`).
   - Modifica el archivo correspondiente. Si el sitio está en varios idiomas, recuerda actualizar también en `en/` y `zh/`.
3. **¿Quieres cambiar una imagen o un logo?**
   - Sube la imagen a la carpeta `public/` (asegúrate de optimizarla a `.webp` o `.svg`).
   - Copia la ruta (ej. `/logos/nuevo-logo.webp`) y pégala en el archivo JSON o `siteConfig.ts`.

---

## 📚 Documentación Técnica Completa
Para profundizar en cómo funciona este proyecto, revisa los manuales en la carpeta `/docs`:

- [Arquitectura, Diagramas y Modelo de Datos](/docs/architecture.md)
- [Flujos de Usuario y Edición](/docs/workflows.md)
- [Guía de Contenido y Editorial](/docs/content-guide.md)
- [Guía de Mantenimiento y Nuevas Secciones](/docs/maintenance.md)
- [Guía Visual y de Accesibilidad (WCAG)](/docs/visual-and-a11y.md)
- [Guía de SEO y Despliegue](/docs/seo-and-deployment.md)

---

## 🔮 Backlog Recomendado (Mejoras Futuras)
Si el equipo técnico desea evolucionar esta plataforma en ciclos posteriores:

1. **CMS Ligero**: Integrar [KeystoneJS], [Strapi] o [Sanity] si el volumen de contenido crece y los coordinadores no pueden editar JSON directamente.
2. **Blog / Noticias**: Implementar Colecciones de Astro (`src/content/`) para un blog de la carrera con archivos `.mdx`.
3. **Generación Dinámica (SSR)**: Si se implementa un buscador de proyectos, pasar partes del sitio a SSR.
4. **Páginas Dinámicas por Proyecto/Docente**: Crear rutas dinámicas (`/proyectos/[slug].astro`) para detallar las aportaciones técnicas de cada trabajo escolar en lugar de solo enlazar a Github.
5. **Formulario Integrado**: Sustituir la redirección al correo por un formulario con integración a Webhooks (ej. Formspree o Resend).
6. **Analytics**: Configurar PostHog o Google Analytics para medir la tasa de conversión de aspirantes en la página `/unirse`.
