# Changelog (Historial de Versiones)

Todos los cambios notables en el proyecto del Sitio Web Oficial de ITICs ITSOEH serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/), y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.0.0] - 2026-05-02
### Añadido (Added)
- **Lanzamiento Oficial (Producción)**: Primera versión estable de la nueva arquitectura SSG con Astro.
- **Modelo 3D Interactivo**: Implementación de renderizado Three.js para el Hero de la página de inicio.
- **Módulos i18n**: Soporte completo para Español, Inglés y Chino usando diccionarios JSON en `src/messages`.
- **Estructura Documental Profesional**: Creación de la carpeta `/docs` con diagramas, flujos operativos y guías exhaustivas de mantenimiento.

### Cambiado (Changed)
- **Rendimiento**: Se implementó una lógica de *fallback* para el **modelo 3D** en dispositivos con conexiones lentas (2G/slow-2G) mostrando una imagen póster optimizada (`logo.webp`).
- **Tipografía**: Se revirtió el uso de alojamiento local (self-hosting variable) a favor de la CDN de Google Fonts para estabilizar el Anti-Aliasing y el peso percibido de los H1.

### Arreglado (Fixed)
- **Fallback Móvil para PDFs**: Se detectó que iOS/móviles rompen el `iframe` del PDF de la retícula escolar. Se introdujo una vista alternativa (`sm:hidden`) que bloquea el iframe y pinta un botón grande de "Descargar PDF".
- **Accesibilidad**: Inyección de textos ocultos (`sr-only`) en el pie de página avisando sobre redirecciones de pestañas externas para usuarios invidentes.

---

## [0.9.0] - 2026-04-20
### Añadido (Added)
- **Borrador Alpha**: Se maquetó la versión inicial usando Tailwind CSS.
- **Glassmorphism**: Pruebas de diseño "Apple-like" en el Navbar.
- Mapeo inicial de las rutas del proyecto (`/formacion`, `/unirse`, `/proyectos`).

*(Versiones anteriores a 0.9.0 fueron de experimentación y diseño en Figma).*
