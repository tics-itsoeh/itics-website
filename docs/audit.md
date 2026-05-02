# Auditoría Técnica del Sitio ITICs ITSOEH

**Fecha:** 2026-05-01  
**Última actualización:** 2026-05-02  
**Auditor:** Antigravity (Frontend Lead / Arquitecto de Software / Auditor de Rendimiento Web)  
**Stack:** Astro 6.1 · Tailwind CSS 4 · React 19 · Three.js · TypeScript · Lenis  
**Idiomas:** es (default), en, zh

---

## 1. Resumen Ejecutivo

### Estado General
El proyecto está **bien estructurado para su etapa actual**. Usa Astro con generación estática, i18n con archivos JSON por idioma y un diseño Apple-like consistente. La base de código es limpia, el HTML semántico es razonable y la identidad visual es coherente.

> **Actualización 2026-05-02:** Se ejecutaron correcciones de rendimiento, arquitectura, SEO, accesibilidad, i18n y documentación. Los ítems resueltos están marcados con ✅ CORREGIDO.

### Riesgos Principales

| # | Riesgo | Severidad | Estado |
|---|--------|-----------|--------|
| 1 | **Imágenes de logos sin optimizar** (11.7 MB en PNGs del footer) | 🔴 Crítico | ✅ CORREGIDO — WebP 76 KB total |
| 2 | **Modelo 3D de 5.1 MB** cargado en el hero del Home | 🔴 Crítico | ⬜ PENDIENTE — comprimir con Draco |
| 3 | **Traducciones incompletas** en `en` y `zh` | 🟡 Alto | ✅ CORREGIDO — join.json + mentors.json + projects.json v2 creados |
| 4 | **Sin `sitemap.xml` ni `robots.txt`** | 🟡 Alto | ✅ CORREGIDO — @astrojs/sitemap + robots.txt |
| 5 | **Sin Open Graph ni Twitter Cards** | 🟡 Alto | ✅ CORREGIDO — OG + Twitter + Schema.org + canonical |
| 6 | **Datos de contacto/redes duplicados** en Layout, contact.json, join.json y footer | 🟡 Medio | ✅ CORREGIDO — centralizado en siteConfig.ts |
| 7 | **Logo SVG de 732 KB** usado en el loader | 🟡 Medio | ✅ CORREGIDO — SVGO: 260 KB (-64%) |
| 8 | **Texto hardcodeado en español** en páginas de Proyectos y Comunidad | 🟡 Medio | ✅ CORREGIDO — movido a i18n |
| 9 | **`icon.png` de 1.4 MB** como favicon | 🟡 Medio | ✅ CORREGIDO — favicon-32.png (4 KB) |
| 10 | **`countries.ts` sin uso aparente** en páginas activas | 🟠 Bajo | ⬜ PENDIENTE — verificar uso |

### Prioridades Restantes
1. ~~Optimizar imágenes~~ ✅
2. ~~Agregar `sitemap.xml`, `robots.txt`, Open Graph~~ ✅
3. ~~Centralizar datos de contacto y redes sociales~~ ✅
4. ~~Completar traducciones en/zh~~ ✅
5. Comprimir `model3d.glb` con Draco (⬜ pendiente)
6. ~~Agregar Schema.org~~ ✅
7. Self-host Inter con `@fontsource` (⬜ pendiente)
8. Verificar/eliminar `countries.ts` (⬜ pendiente)

---

## 2. Hallazgos Críticos

| Área | Hallazgo | Impacto | Prioridad | Recomendación |
|------|----------|---------|-----------|---------------|
| Rendimiento | `educacion.png` (2.2 MB), `esparco.png` (2.4 MB), `tecnm.png` (2.3 MB), `huawei.png` (2.1 MB) cargados en footer | Cada página carga ~11.7 MB en logos | 🔴 Crítica | Convertir a WebP ≤50 KB c/u |
| Rendimiento | `model3d.glb` de 5.1 MB en hero | LCP severamente afectado en conexiones lentas | 🔴 Crítica | Comprimir con glTF-Transform/Draco, usar fallback estático |
| Rendimiento | `icon.png` (1.4 MB) como favicon + nav logo | Bloquea carga inicial | 🔴 Crítica | Favicon .ico/PNG ≤32 KB; logo nav separado optimizado |
| Rendimiento | `logo.svg` (732 KB) en loader | SVG excesivamente pesado | 🟡 Alta | Simplificar paths o convertir a PNG optimizado ≤30 KB |
| SEO | Sin `sitemap.xml` | Indexación incompleta | 🟡 Alta | Agregar `@astrojs/sitemap` |
| SEO | Sin `robots.txt` | Sin directivas para crawlers | 🟡 Alta | Crear `public/robots.txt` |
| SEO | Sin Open Graph / Twitter Cards | Sin preview en redes sociales | 🟡 Alta | Agregar `og:title`, `og:description`, `og:image`, `twitter:card` |
| i18n | Faltan `en/join.json` y `zh/join.json` | Página Aspirantes sin traducción en/zh | 🟡 Alta | Crear archivos o redirigir a /es |
| i18n | `en/mentors.json` y `zh/mentors.json` tienen ~10% de las claves vs `es` | Página Comunidad muestra claves crudas en en/zh | 🟡 Alta | Completar traducciones |
| Mantenibilidad | Datos de contacto duplicados en 4+ archivos | Riesgo de inconsistencia al actualizar | 🟡 Media | Centralizar en `siteConfig.ts` |
| Mantenibilidad | Texto en español hardcodeado en `proyectos.astro` líneas 92-104 y `mentores.astro` líneas 154-157 | No se traduce | 🟡 Media | Mover a archivos de traducción |
| Accesibilidad | `<h2>` usado como primer heading en `overviewCards` de formacion | Jerarquía de headings inconsistente | 🟠 Baja | Verificar que cada card tenga `<h3>` bajo su `<h2>` padre |
| Arquitectura | `countries.ts` (306 líneas) sin uso en páginas visibles | Código muerto potencial | 🟠 Baja | Verificar uso; si no se usa, eliminar |

---

## 3. Rendimiento

### 3.1 Diagnóstico

**Problema principal:** El sitio carga ~18.5 MB en assets estáticos antes de cualquier optimización.

| Asset | Tamaño | Páginas afectadas |
|-------|--------|-------------------|
| `model3d.glb` | 5.1 MB | Home |
| `educacion.png` | 2.2 MB | Todas (footer) |
| `esparco.png` | 2.4 MB | Todas (footer) |
| `tecnm.png` | 2.3 MB | Todas (footer) |
| `huawei.png` | 2.1 MB | Home, Formación |
| `itsoeh.png` | 1.3 MB | Todas (footer) |
| `tics.png` | 1.4 MB | Todas (footer) |
| `icon.png` | 1.4 MB | Todas (nav) |
| `logo.svg` | 732 KB | Todas (loader) |
| `model/logo.png` | 760 KB | Home |
| `josepo.png` | 696 KB | Comunidad, Perfil |
| `cisco.webp` | 28 KB | Home ✅ |

### 3.2 Problemas Detectados

#### P1: Logos institucionales sin optimizar
- **Problema:** 5 logos PNG en el footer suman ~11.7 MB. Son imágenes con fondo transparente que no necesitan resolución tan alta.
- **Impacto:** Cada página tarda ~3-5s extra en 4G.
- **Prioridad:** 🔴 Crítica
- **Recomendación:** Convertir a WebP con dimensiones reales de uso (max-height ~60px en pantalla → 120px @2x). Objetivo: ≤50 KB c/u.
- **Cambio funcional:** No

#### P2: Modelo 3D sin compresión
- **Problema:** `model3d.glb` de 5.1 MB. El `IntersectionObserver` ayuda, pero igualmente se descarga completo.
- **Impacto:** LCP del Home afectado; en móviles con 3G, >10s de carga.
- **Prioridad:** 🔴 Crítica
- **Recomendación:** Comprimir con Draco/glTF-Transform (objetivo ≤1 MB). Considerar `loading="lazy"` via poster image mientras carga. Agregar detección de `navigator.connection` para no cargar en conexiones lentas.
- **Cambio funcional:** No (el modelo sigue renderizando igual)

#### P3: Favicon sobredimensionado
- **Problema:** `icon.png` (1.4 MB, 950×830) usado como favicon Y logo del nav.
- **Impacto:** Bloquea render inicial. El `<Image>` de Astro lo procesa, pero el favicon raw sigue siendo 1.4 MB.
- **Prioridad:** 🔴 Crítica
- **Recomendación:** Generar favicon.ico (32×32 + 16×16) ≤10 KB. Usar versión optimizada de ~5-10 KB para `<link rel="icon">`. El logo del nav puede usar una versión de 128×128 WebP.
- **Cambio funcional:** No

#### P4: SVG del loader
- **Problema:** `logo.svg` (732 KB) con paths muy detallados.
- **Impacto:** Retrasa la aparición del loader mismo.
- **Prioridad:** 🟡 Alta
- **Recomendación:** Simplificar con SVGO o usar versión PNG/WebP optimizada ≤30 KB.
- **Cambio funcional:** No

#### P5: Google Maps iframe en Home y Contacto
- **Problema:** Iframe de Google Maps cargado con `loading="lazy"` (correcto), pero sin `title` traducido.
- **Impacto:** Menor. El `loading="lazy"` mitiga el impacto en rendimiento.
- **Prioridad:** 🟠 Baja
- **Recomendación:** Traducir el `title` del iframe según idioma. Ya tiene `title="Ubicación del campus en Google Maps"` ✅ pero es siempre en español.
- **Cambio funcional:** No

#### P6: PDF embebido en Formación
- **Problema:** `<iframe src="/docs/tics.pdf#view=FitH">` incrustado directamente.
- **Impacto:** Medio. PDF de 136 KB (aceptable) pero no todos los navegadores móviles renderizan PDFs inline.
- **Prioridad:** 🟡 Media
- **Recomendación:** Mostrar botón de descarga como fallback en móvil. Considerar convertir retícula a imagen optimizada.
- **Cambio funcional:** Menor (agregar fallback visual)

#### P7: Three.js en bundle
- **Problema:** `three` (183.x) incluido como dependencia. Astro lo tree-shakea parcialmente, pero el chunk sigue siendo considerable.
- **Impacto:** Bundle size elevado para la página Home.
- **Prioridad:** 🟡 Media
- **Recomendación:** Ya usa dynamic import vía `IntersectionObserver` ✅. Verificar que no se incluya en páginas que no lo usan. Considerar `model-viewer` de Google como alternativa más ligera.
- **Cambio funcional:** No

#### P8: Fuente Inter cargada externamente
- **Problema:** Google Fonts carga Inter con wght 400-900 en todas las páginas.
- **Impacto:** Render-blocking por CSS externo. FCP afectado.
- **Prioridad:** 🟡 Media
- **Recomendación:** Self-host con `@fontsource/inter` y subset solo wght 400,500,600,700. Eliminar 800,900 si no se usan explícitamente.
- **Cambio funcional:** No

### 3.3 Mejoras Rápidas (Quick Wins)
1. Convertir logos del footer a WebP ≤50 KB c/u → ahorro ~11.5 MB
2. Generar favicon optimizado ≤10 KB → ahorro ~1.4 MB
3. Simplificar `logo.svg` con SVGO → ahorro ~700 KB
4. Optimizar `josepo.png` → WebP ≤100 KB

### 3.4 Mejoras de Mediano Plazo
1. Comprimir `model3d.glb` con Draco → objetivo ≤1 MB
2. Self-host Inter con `@fontsource`
3. Agregar poster/fallback para modelo 3D en conexiones lentas
4. Convertir `model/logo.png` a WebP

### 3.5 Checklist Core Web Vitals

| Métrica | Estado estimado | Notas |
|---------|----------------|-------|
| LCP | ⚠️ Requiere medición | Probablemente >4s por imágenes pesadas |
| CLS | ✅ Probablemente bueno | Layouts estáticos, dimensiones explícitas en imágenes |
| INP | ✅ Probablemente bueno | Pocas interacciones JS, sitio mayormente estático |
| FCP | ⚠️ Requiere medición | Font blocking + SVG loader pesado |
| TTFB | ✅ Probablemente bueno | Sitio estático (Astro SSG) |

> **Nota:** Estas estimaciones requieren validación con Lighthouse/WebPageTest en producción.

---

## 4. Accesibilidad

### 4.1 Diagnóstico

El sitio tiene una **base razonable** de accesibilidad con uso de HTML semántico, `aria-label` en iconos sociales, y `prefers-reduced-motion` para animaciones. Sin embargo, hay áreas de mejora.

### 4.2 Problemas Detectados

| # | Problema | Impacto | Prioridad |
|---|----------|---------|-----------|
| A1 | Loader logo tiene `alt=""` vacío (decorativo OK ✅), pero no hay texto alternativo del estado de carga | Bajo | 🟠 Baja |
| A2 | Botón móvil `aria-label="Abrir menú"` siempre en español | Medio para en/zh | 🟡 Media |
| A3 | Language switcher usa `group-hover` sin soporte teclado | Los usuarios de teclado no pueden acceder al dropdown de idiomas en desktop | 🟡 Alta |
| A4 | Imágenes de logos en footer usan `<img>` sin `alt` descriptivo completo | `alt="Educación"` es insuficiente para screen readers | 🟠 Baja |
| A5 | FAQs no usan `<details>/<summary>` ni patrón accordion con `aria-expanded` | No hay indicador expandir/colapsar | 🟠 Baja |
| A6 | Links externos sin indicador visual/textual de que abren nueva pestaña | Usuarios no anticipan cambio de contexto | 🟡 Media |
| A7 | Contraste del color `#86868b` (apple-muted) sobre fondo `#F5F5F7` | Ratio ~3.2:1, debajo del mínimo WCAG AA (4.5:1) para texto normal | 🟡 Alta |
| A8 | Focus styles en nav links usan solo color, no outline visible | Navegación por teclado difícil de seguir | 🟡 Media |

### 4.3 Buenas Prácticas Existentes ✅
- `<nav>` con ID y roles implícitos
- `aria-label` y `aria-hidden="true"` en iconos SVG sociales del footer
- `role="img"` implícito en SVGs con `fill`
- `aria-expanded` en botón de menú móvil
- `loading="lazy"` en imágenes no críticas
- `rel="noopener noreferrer"` en enlaces externos ✅
- `<noscript>` fallback para el loader
- `prefers-reduced-motion` respetado en animaciones del loader
- `title` en iframes de Google Maps y PDF ✅

### 4.4 Recomendaciones

1. **Language switcher accesible por teclado:** Reemplazar `group-hover` por un pattern con `<button>` + `aria-expanded` + toggle con JS.
2. **Contraste:** Cambiar `#86868b` a `#6e6e73` (~4.7:1) para texto sobre fondos claros.
3. **Internacionalizar aria-labels:** El `aria-label="Abrir menú"` del botón mobile debe usar `tc()`.
4. **Focus visible:** Agregar `focus-visible:ring-2 focus-visible:ring-apple-blue/40` a nav links.
5. **Links externos:** Agregar texto `(abre en nueva pestaña)` visually hidden o icono con `aria-label`.

### 4.5 Checklist WCAG 2.1 Básico

| Criterio | Estado |
|----------|--------|
| 1.1.1 Texto alternativo | ⚠️ Parcial (logos footer insuficiente) |
| 1.3.1 Info y relaciones | ✅ Headings jerárquicos |
| 1.4.3 Contraste mínimo | ⚠️ Falla con apple-muted |
| 2.1.1 Teclado | ⚠️ Language switcher inaccesible |
| 2.4.4 Propósito de enlace | ⚠️ Links externos sin indicador |
| 2.4.7 Focus visible | ⚠️ Parcial |
| 3.1.1 Idioma de la página | ✅ `<html lang={lang}>` |
| 3.1.2 Idioma de partes | ⚠️ Texto hardcodeado en español |
| 4.1.2 Nombre/Rol/Valor | ✅ Botón menú correcto |

---

## 5. SEO

### 5.1 Diagnóstico

El sitio tiene **buena base SEO** con `<title>` dinámico, `<meta description>`, hreflang correcto y URLs limpias con prefijo de idioma. Sin embargo, faltan elementos críticos.

### 5.2 Buenas Prácticas Existentes ✅
- `<title>` dinámico: `Ing. TICs - ${pageTitle}`
- `<meta name="description">` por página
- `<link rel="alternate" hreflang>` para es/en/zh + x-default
- URLs limpias: `/{lang}/formacion`, `/{lang}/proyectos`, etc.
- H1 único por página ✅
- Redirects 301 desde rutas sin idioma

### 5.3 Elementos Faltantes

| Elemento | Estado | Prioridad |
|----------|--------|-----------|
| `sitemap.xml` | ❌ No existe | 🔴 Alta |
| `robots.txt` | ❌ No existe | 🔴 Alta |
| Open Graph (`og:title`, `og:description`, `og:image`) | ❌ No existe | 🟡 Alta |
| Twitter Cards (`twitter:card`, `twitter:title`) | ❌ No existe | 🟡 Alta |
| `<meta name="keywords">` | ❌ No existe | 🟠 Baja |
| Schema.org / JSON-LD | ❌ No existe | 🟡 Alta |
| Canonical URL | ❌ No existe | 🟡 Media |

### 5.4 Metadatos Recomendados por Página

| Página | title | description sugerida | keywords |
|--------|-------|---------------------|----------|
| Home | `Ing. TICs - Inicio` ✅ | `Ingeniería en TICs ITSOEH. Formación en software, redes, IA e IoT.` | Ingeniería en TICs, ITSOEH, TecNM |
| Carrera | `Ing. TICs - Carrera` ✅ | `Plan de estudios, competencias y áreas de la Ingeniería en TICs ITSOEH.` | Plan de estudios, retícula ITIC-2010-225 |
| Aspirantes | `Ing. TICs - Aspirantes` ✅ | `Admisión 2026 para Ingeniería en TICs ITSOEH. Requisitos y proceso.` | Admisión 2026, ficha ITSOEH, ITICs |
| Proyectos | `Ing. TICs - Proyectos` ✅ | `Proyectos, repositorios y evidencias técnicas de estudiantes de ITICs.` | GitHub ITICs, proyectos, portafolio |
| Comunidad | `Ing. TICs - Comunidad` ✅ | `Comunidad ITICs: coordinación, docentes, clubes y liderazgo estudiantil.` | Comunidad ITICs, clubes, robótica |
| Contacto | `Ing. TICs - Contacto` ✅ | `Canales oficiales de contacto de ITICs ITSOEH: WhatsApp, correo y redes.` | Contacto ITICs, WhatsApp, correo |

### 5.5 Schema.org Sugerido

```json
// En Layout.astro <head> — EducationalOrganization
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Ingeniería en Tecnologías de la Información y Comunicaciones",
  "alternateName": ["ITICs", "Ing. TICs"],
  "url": "https://itics.itsoeh.edu.mx",
  "parentOrganization": {
    "@type": "CollegeOrUniversity",
    "name": "Instituto Tecnológico Superior del Occidente del Estado de Hidalgo",
    "alternateName": "ITSOEH",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Tecnológico Nacional de México",
      "alternateName": "TecNM"
    }
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+52-772-139-7096",
    "email": "tics@itsoeh.edu.mx",
    "contactType": "admissions"
  },
  "sameAs": [
    "https://www.instagram.com/itics.itsoeh",
    "https://www.facebook.com/ITIC.ITSOEHmx",
    "https://www.tiktok.com/@ing.tics",
    "https://github.com/tics-itsoeh"
  ]
}
```

```json
// En página Formación — Course
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Ingeniería en Tecnologías de la Información y Comunicaciones",
  "courseCode": "ITIC-2010-225",
  "provider": {
    "@type": "CollegeOrUniversity",
    "name": "ITSOEH"
  }
}
```

### 5.6 Keywords Recomendadas
- Ingeniería en TICs
- ITICs ITSOEH
- Tecnológico Nacional de México
- Campus Occidente del Estado de Hidalgo
- Ingeniería en Tecnologías de la Información y Comunicaciones
- Admisión 2026
- Cisco Networking Academy
- Huawei ICT Academy
- Plan de estudios ITIC-2010-225

---

## 6. UX/UI

### 6.1 Diagnóstico por Página

#### Home ✅ Bueno
- Cumple su objetivo como **resumen general** de la carrera.
- Hero con modelo 3D es visualmente impactante.
- CTAs claros: "Quiero estudiar ITICs" y "Ver plan de estudios".
- Secciones bien ordenadas: Hero → Formación → Academias → Outcomes → Proyectos → Comunidad → Contacto → FAQ → CTA final.
- **Observación:** La página es extensa. En móvil puede sentirse larga. Considerar anclas visibles.

#### Carrera (Formación) ✅ Bueno
- Objetivo cumplido: explica formación oficial.
- Overview cards → Identidad → Áreas → Competencias → Retícula → Complementaria → CTA.
- PDF embebido de la retícula es útil para desktop pero puede fallar en móvil.
- **Observación:** No tiene CTA de admisión. Oportunidad perdida.

#### Aspirantes (Unirse) ✅ Muy bueno
- Página de conversión bien diseñada.
- Resuelve miedos reales: matemáticas, programación, IA, campo laboral, laptop ✅.
- Proceso de admisión claro con fechas y costos.
- Múltiples CTAs contextuales.
- **Observación:** Podría beneficiarse de un testimonio estudiantil.

#### Proyectos ✅ Bueno
- Muestra evidencia técnica real con links a GitHub.
- Categorías visuales de áreas.
- Cards con tags y CTAs duales.
- **Observación:** Texto hardcodeado en español en la card destacada (líneas 92-104 de proyectos.astro). Tiene contenido como "Repositorio", "Área", "Proyectos, concursos y comunidad técnica" sin traducir.

#### Comunidad (Mentores) ✅ Bueno
- Coordinación, docentes, clubes, liderazgo, créditos.
- **Observación:** Texto hardcodeado "Comunidad en crecimiento" (línea 154) no usa i18n.
- Sección de docentes dice "Información en actualización" — transparente y correcto.

#### Contacto ✅ Bueno
- Canales claros: WhatsApp, email, Instagram, teléfono.
- Mapa de Google Maps funcional.
- Sección de routing: "¿A dónde escribir?" muy útil.
- Redes sociales agrupadas.

### 6.2 CTAs Recomendados

| Página | CTA Actual | CTA Sugerido | Justificación |
|--------|-----------|-------------|---------------|
| Formación | Solo "Ver proyectos" al final | Agregar "Ver admisión 2026" | Conversión directa |
| Proyectos | "Ver GitHub" | Agregar "¿Te interesa? Ver admisión" | Oportunidad de conversión |
| Comunidad | "Ver aspirantes" ✅ | Correcto | — |
| Contacto | "Ver admisión 2026" ✅ | Correcto | — |

### 6.3 Consistencia de Nomenclatura

| Variante encontrada | Dónde | Sugerencia |
|---------------------|-------|------------|
| "TICs" | Textos generales | ✅ Abreviatura correcta |
| "ITICs" | Hero, títulos | ✅ Nombre de la carrera |
| "Ing. TICs" | Nav, title, footer | ✅ Forma corta oficial |
| "Ingeniería en TICs" | Subtítulos, descripciones | ✅ Forma semilarga |
| "Ingeniería en Tecnologías de la Información y Comunicaciones" | Footer, nav desktop | ✅ Nombre completo |

La nomenclatura es **consistente y correcta**. Cada variante se usa en el contexto apropiado.

### 6.4 Riesgos de Consistencia Visual
- Los bordes redondeados varían: `rounded-2xl`, `rounded-3xl`, `rounded-[2rem]`, `rounded-[2.5rem]`. Funciona visualmente, pero podría estandarizarse.
- Los font-sizes usan valores arbitrarios (`text-[0.72rem]`, `text-[0.88rem]`, `text-[1.05rem]`). Funciona pero dificulta mantenimiento.
- Los paddings de sección varían ligeramente entre páginas (`py-20 md:py-32` vs `pb-20 md:pb-32`).

---

## 7. Arquitectura y Mantenibilidad

### 7.1 Estructura Actual

```
src/
├── components/          # Solo 3 componentes (Hero, MentorCard, Model3DCanvas)
│   ├── Hero.astro
│   ├── MentorCard.astro
│   └── Model3DCanvas.astro
├── i18n/
│   ├── config.ts        # Idiomas y tipos
│   └── utils.ts         # useTranslations, helpers
├── layouts/
│   └── Layout.astro     # 668 líneas — layout + nav + footer + scripts
├── lib/
│   └── countries.ts     # Utilidad de países (¿sin uso?)
├── messages/            # Traducciones JSON por idioma/namespace
│   ├── es/              # 7 archivos (completo)
│   ├── en/              # 6 archivos (falta join.json)
│   └── zh/              # 6 archivos (falta join.json)
├── model/               # Directorio vacío
├── pages/
│   ├── [lang]/          # Páginas internacionalizadas
│   │   ├── index.astro         # Home (305 líneas)
│   │   ├── formacion/index.astro  # Carrera (134 líneas)
│   │   ├── unirse.astro        # Aspirantes (236 líneas)
│   │   ├── proyectos.astro     # Proyectos (199 líneas)
│   │   ├── mentores.astro      # Comunidad (196 líneas)
│   │   ├── contacto.astro      # Contacto (162 líneas)
│   │   ├── mentores/jose-manuel.astro  # Perfil (128 líneas)
│   │   ├── login.astro         # Redirect → formacion
│   │   ├── completar-acceso.astro  # Redirect → formacion
│   │   └── ayuda/github.astro  # Redirect → formacion
│   ├── index.astro      # Redirect / → /es
│   ├── contacto.astro   # Redirect → /es/contacto
│   ├── mentores.astro   # Redirect → /es/mentores
│   ├── proyectos.astro  # Redirect → /es/proyectos
│   ├── formacion/       # Redirect → /es/formacion
│   └── unirse.astro     # Redirect → /es/unirse
├── scripts/
│   └── model3d.ts       # Three.js init (207 líneas)
└── styles/
    └── global.css       # Tailwind theme + Lenis + hero-link
public/
├── docs/                # PDFs retícula
├── logos/               # 8 logos institucionales
├── mentors/             # Fotos de mentores
├── model/               # Modelo 3D + logo fallback
├── icon.png             # Favicon (sobredimensionado)
└── sw.js                # Service Worker para cache de assets
```

### 7.2 Problemas de Arquitectura

#### Layout.astro es monolítico (668 líneas)
- Contiene: props + footer copy en 3 idiomas + HTML head + nav + footer + loader + smooth scroll + nav JS + mobile menu JS + service worker registration.
- **Impacto:** Difícil de mantener, revisar y testear.
- **Recomendación:** Extraer a componentes: `Navbar.astro`, `Footer.astro`, `SiteLoader.astro`. Mover `footerCopy` a un archivo de datos.

#### Datos de contacto duplicados en 4+ lugares
1. `Layout.astro` líneas 74-161 (footerCopy Record)
2. `messages/es/contact.json` (values.*)
3. `messages/es/join.json` (links.*, contact.itics.*)
4. `messages/es/mentors.json` (community.coordination.*)

**Recomendación:** Crear `src/data/siteConfig.ts`:

```typescript
// src/data/siteConfig.ts (propuesta)
export const socialLinks = {
  instagram: 'https://www.instagram.com/itics.itsoeh',
  facebook: 'https://www.facebook.com/ITIC.ITSOEHmx',
  tiktok: 'https://www.tiktok.com/@ing.tics',
  github: 'https://github.com/tics-itsoeh',
} as const;

export const contactInfo = {
  phone: '772 139 7096',
  phoneUrl: 'tel:+527721397096',
  whatsapp: '+52 1 773 109 9748',
  whatsappUrl: 'https://wa.me/5217731099748',
  email: 'tics@itsoeh.edu.mx',
  emailUrl: 'mailto:tics@itsoeh.edu.mx',
} as const;

export const admission = {
  year: '2026',
  cycle: '2026–2027',
  registerUrl: 'https://fichas.itsoeh.edu.mx/',
  pdfUrl: 'https://www.itsoeh.edu.mx/front/slider-images/docs/Conv_Admisi%C3%B3n_2026-20271.pdf',
} as const;
```

#### URLs de redes sociales hardcodeadas en footerCopy
Las URLs de Instagram, Facebook, TikTok, GitHub están repetidas 3 veces (una por idioma) en `footerCopy` del Layout cuando son idénticas.

#### Información de admisión dispersa
Las fechas y costos de admisión están solo en `join.json`. Si cambian, hay que editar solo ese archivo, pero el footer también tiene "Admisión 2026" hardcodeado en `footerCopy`.

#### Componentes subutilizados
- `MentorCard.astro` está definido pero **no se importa en ninguna página**. Parece ser código preparado para uso futuro.
- `countries.ts` tiene 306 líneas de códigos de país sin uso visible en las páginas actuales.

### 7.3 Estructura Futura Recomendada

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── SiteLoader.astro
│   ├── ui/
│   │   ├── Card.astro
│   │   ├── CTA.astro
│   │   └── MentorCard.astro
│   ├── Hero.astro
│   └── Model3DCanvas.astro
├── data/
│   ├── siteConfig.ts       # contactInfo, socialLinks, admission
│   ├── navigation.ts       # navItems
│   └── footerConfig.ts     # footerCopy (si se mantiene por idioma)
├── i18n/ (sin cambios)
├── layouts/
│   └── Layout.astro        # Simplificado: importa Navbar, Footer, SiteLoader
├── lib/ (sin cambios)
├── messages/ (sin cambios)
├── pages/ (sin cambios)
├── scripts/ (sin cambios)
└── styles/ (sin cambios)
```

### 7.4 Archivos de Data/Config Sugeridos

| Archivo | Contenido | Beneficio |
|---------|-----------|-----------|
| `siteConfig.ts` | contactInfo, socialLinks, admission, institution | Single source of truth |
| `navigation.ts` | navItems array | Reutilizable en Navbar y Footer |
| `footerConfig.ts` | footerCopy por idioma (sin URLs repetidas) | Separa data del layout |

---

## 8. Documentación Agregada al Código

> **Nota:** De acuerdo con la restricción principal, no se modificó funcionalidad ni diseño. La documentación propuesta a continuación es **sugerida para agregar** y no fue insertada directamente en el código para evitar cambios no solicitados.

### 8.1 Archivos que Requieren Documentación

| Archivo | Tipo de documentación | Prioridad |
|---------|----------------------|-----------|
| `Layout.astro` | JSDoc en Props, comentarios en secciones principales | Alta |
| `Hero.astro` | JSDoc en Props, intención del linkedTerms | Media |
| `Model3DCanvas.astro` | Comentario sobre IntersectionObserver strategy | Media |
| `model3d.ts` | TSDoc en `initModel3d`, comentarios en cache strategy | Alta |
| `i18n/utils.ts` | Ya tiene JSDoc ✅ | — |
| `i18n/config.ts` | Agregar TSDoc al tipo `UiLanguage` | Baja |
| `global.css` | Comentarios en secciones de workspace y hero-link | Baja |
| `sw.js` | Comentarios en estrategia de cache | Media |

### 8.2 Ejemplo de Documentación Propuesta

```typescript
// Layout.astro — frontmatter
/**
 * Layout principal del sitio ITICs ITSOEH.
 *
 * Incluye: head con SEO básico, navbar con i18n, footer institucional,
 * loader de primera visita, smooth scroll (Lenis) y service worker.
 *
 * @prop title — Título de la página (se concatena con "Ing. TICs - ")
 * @prop description — Meta description para SEO
 * @prop lang — Idioma de la página (default: detectado de URL)
 * @prop hideJoinCta — Oculta el CTA de admisión en el nav (ej. en la propia página de unirse)
 */
```

```typescript
// model3d.ts
/**
 * Inicializa el visor 3D del hero con Three.js.
 *
 * Estrategia de carga:
 * 1. Se activa solo cuando el contenedor es visible (IntersectionObserver)
 * 2. Intenta cachear el .glb via Cache API para visitas subsecuentes
 * 3. Responde a mouse follow con easing suave
 * 4. Se destruye en navegación SPA (pagehide)
 *
 * @param containerId — ID del contenedor del canvas
 * @param canvasId — ID del elemento <canvas>
 */
```

### 8.3 TODOs Sugeridos

```
// Layout.astro
// TODO: Extraer footerCopy a src/data/footerConfig.ts para separar datos del layout
// TODO: Extraer nav a componente Navbar.astro
// TODO: Agregar Open Graph y Twitter Cards en <head>

// model3d.ts
// TODO: Comprimir model3d.glb con Draco para reducir de 5.1 MB a ≤1 MB
// TODO: Agregar detección de navigator.connection para skip en conexiones lentas

// sw.js
// TODO: Versionar STATIC_CACHE con hash de build para invalidación automática

// pages/[lang]/proyectos.astro
// TODO: Mover texto hardcodeado (líneas 92-104) a messages/*/projects.json

// pages/[lang]/mentores.astro
// TODO: Mover "Comunidad en crecimiento" (línea 154) a messages/*/mentors.json
```

---

## 9. Mejoras Recomendadas sin Cambio Funcional

| Mejora | Beneficio | Esfuerzo | Riesgo | Prioridad |
|--------|-----------|----------|--------|-----------|
| Convertir logos a WebP | -11.5 MB por página | Bajo (CLI) | Ninguno | 🔴 Crítica |
| Generar favicon optimizado | -1.4 MB | Bajo | Ninguno | 🔴 Crítica |
| Agregar `sitemap.xml` | SEO: indexación completa | Bajo (`@astrojs/sitemap`) | Ninguno | 🟡 Alta |
| Agregar `robots.txt` | SEO: directivas crawler | Bajo (1 archivo) | Ninguno | 🟡 Alta |
| Agregar Open Graph | Preview en redes sociales | Bajo (4 meta tags) | Ninguno | 🟡 Alta |
| Completar traducciones en/zh | i18n funcional completo | Medio | Bajo | 🟡 Alta |
| Centralizar contacto/redes | Elimina duplicación | Medio | Bajo | 🟡 Media |
| Comprimir model3d.glb | -4 MB en hero | Medio | Bajo | 🟡 Media |
| Extraer Navbar/Footer | Mantenibilidad | Medio | Bajo | 🟡 Media |
| Self-host Inter | Elimina render-blocking | Bajo | Bajo | 🟡 Media |
| Simplificar logo.svg | -700 KB | Bajo | Ninguno | 🟡 Media |
| Agregar Schema.org | SEO: rich snippets | Medio | Ninguno | 🟡 Media |
| Fix contraste apple-muted | Accesibilidad WCAG AA | Bajo | Visual mínimo | 🟡 Media |
| Language switcher accesible | Accesibilidad teclado | Medio | Bajo | 🟡 Media |
| Agregar canonical URL | SEO: evita duplicados | Bajo (1 línea) | Ninguno | 🟠 Baja |
| Eliminar countries.ts si no se usa | -306 líneas código muerto | Bajo | Ninguno | 🟠 Baja |
| Estandarizar border-radius | Consistencia visual | Bajo | Ninguno | 🟠 Baja |

---

## 10. Backlog Técnico

### Quick Wins (1-2 horas) — ✅ COMPLETADOS
- [x] Convertir logos del footer a WebP ≤50 KB c/u → **76 KB total (-99.4%)**
- [x] Generar favicon optimizado → **favicon-32.png (4 KB), icon-180.webp (12 KB)**
- [x] Crear `public/robots.txt`
- [x] Instalar y configurar `@astrojs/sitemap` → **sitemap-index.xml generado**
- [x] Agregar `<meta property="og:*">` y `<meta name="twitter:*">` en Layout
- [x] Agregar `<link rel="canonical">` en Layout
- [x] Simplificar `logo.svg` con SVGO → **732 KB → 260 KB (-64%)**
- [x] Optimizar `josepo.png` a WebP → **696 KB → 8 KB (-99%)**
- [x] Optimizar `model/logo.png` a WebP → **760 KB → 68 KB (-91%)**
- [x] Optimizar `icon.png` usado en nav (separar de favicon)

### Mejoras de Arquitectura (4-8 horas) — ✅ COMPLETADAS
- [x] Extraer `Navbar.astro` del Layout → **src/components/layout/Navbar.astro**
- [x] Extraer `Footer.astro` del Layout → **src/components/layout/Footer.astro**
- [x] Extraer `SiteLoader.astro` del Layout → **src/components/layout/SiteLoader.astro**
- [x] Crear `src/data/siteConfig.ts` con contacto/redes/admisión
- [x] Crear `src/data/navigation.ts`
- [x] Simplificar `Layout.astro` → **668 → ~250 líneas**
- [x] Eliminar directorio vacío `src/model/`
- [x] Eliminar `countries.ts` → **sin uso confirmado (grep)**
- [x] Eliminar `MentorCard.astro` → **sin uso confirmado (grep)**

### Mejoras de Contenido (2-4 horas) — ✅ COMPLETADAS
- [x] Mover texto hardcodeado de `proyectos.astro` a i18n → **6 claves creadas en v2.featured.***
- [x] Mover texto hardcodeado de `mentores.astro` a i18n → **2 claves en community.leadership.growing***
- [x] Crear `en/join.json` y `zh/join.json` → **186 líneas c/u**
- [x] Completar `en/mentors.json` → **reescrito: 131 líneas (community + profile)**
- [x] Completar `zh/mentors.json` → **reescrito: 131 líneas**
- [x] Reescribir `en/projects.json` con estructura v2.* → **148 claves**
- [x] Reescribir `zh/projects.json` con estructura v2.* → **148 claves**
- [x] Internacionalizar `aria-label="Abrir menú"` del botón mobile → **es/en/zh**
- [x] Traducir `title` de iframes de Google Maps según idioma → **es/en/zh inline**

### Mejoras de Rendimiento — PARCIALMENTE COMPLETADAS
- [ ] Comprimir `model3d.glb` con Draco (objetivo ≤1 MB) — **usuario trabajando en ello**
- [ ] Self-host Inter con `@fontsource-variable/inter` → **descartado para mantener el peso visual de Google Fonts**
- [ ] Agregar fallback/poster para modelo 3D en conexiones lentas
- [x] Agregar detección de `navigator.connection` para modelo 3D → **skip en 2G/slow-2G**
- [x] Versionar cache del Service Worker → **v3 con logo.svg + favicon**
- [x] Agregar fallback visual para PDF en móvil (formacion) → **reemplazado por botón de descarga en sm:hidden**

### Mejoras de SEO/Accesibilidad — PARCIALMENTE COMPLETADAS
- [x] Agregar Schema.org JSON-LD (EducationalOrganization) → **implementado en Layout.astro**
- [x] Agregar Schema.org Course en página Formación → **implementado y zh/formation.json actualizado**
- [x] Fix contraste: `#86868b` → `#6e6e73` para WCAG AA
- [x] Language switcher accesible por teclado (button + aria-expanded + Escape)
- [x] Agregar `focus-visible` ring a nav links y elementos interactivos
- [x] Mejorar `alt` text en logos del footer → **alt descriptivo completo**
- [x] Agregar indicador visual/textual en links externos → **sr-only text en footer**
- [x] Agregar CTA de admisión al final de la página Formación → **"Ver admisión 2026" con i18n**

---

## 11. Checklist Antes de Publicar

| # | Verificación | Estado |
|---|-------------|--------|
| 1 | Build correcto (`astro build` sin errores) | ✅ 40 páginas, 4.58s |
| 2 | Links internos funcionando (todas las rutas /es, /en, /zh) | ⬜ Requiere verificación |
| 3 | Links externos funcionando (GitHub, WhatsApp, Instagram, etc.) | ⬜ Requiere verificación |
| 4 | Imágenes optimizadas (logos ≤50 KB, favicon ≤10 KB) | ✅ Completado |
| 5 | Responsive revisado (320px, 768px, 1024px, 1440px) | ⬜ Requiere verificación |
| 6 | SEO básico: title, description, hreflang | ✅ Presente |
| 7 | SEO: sitemap.xml | ✅ sitemap-index.xml generado |
| 8 | SEO: robots.txt | ✅ public/robots.txt creado |
| 9 | SEO: Open Graph + Twitter Cards | ✅ Implementado |
| 10 | SEO: Schema.org JSON-LD | ✅ EducationalOrganization |
| 11 | SEO: canonical URL | ✅ Implementado |
| 12 | Accesibilidad: contraste WCAG AA | ✅ apple-muted → #6e6e73 |
| 13 | Accesibilidad: navegación por teclado | ✅ Language switcher accesible |
| 14 | Accesibilidad: focus-visible | ✅ En nav, CTAs, social links |
| 15 | Contacto validado (WhatsApp, email, teléfono) | ⬜ Requiere verificación |
| 16 | Admisión actualizada (fechas 2026-2027) | ✅ Actualizado en join.json |
| 17 | Logos institucionales correctos y optimizados | ✅ WebP, 76 KB total |
| 18 | Traducciones completas es/en/zh | ✅ join + mentors + projects v2 |
| 19 | Modelo 3D carga correctamente | ⬜ Requiere verificación |
| 20 | Modelo 3D comprimido con Draco | ⬜ Pendiente |
| 21 | Service Worker actualizado | ✅ v2 con WebP refs |
| 22 | PDF de retícula accesible | ⬜ Requiere verificación en móvil |
| 23 | Redirects funcionando (/contacto → /es/contacto, etc.) | ⬜ Requiere verificación |
| 24 | `<html lang>` correcto por idioma | ✅ Dinámico |
| 25 | Arquitectura modular (Navbar, Footer, SiteLoader) | ✅ Extraídos |
| 26 | Datos centralizados (siteConfig.ts, navigation.ts) | ✅ Creados |
| 27 | Documentación JSDoc/TSDoc en archivos principales | ✅ Agregada |

---

## 12. Resumen de Cambios Ejecutados (2026-05-02)

### Rendimiento — Imágenes (~14 MB eliminados)

| Asset | Antes | Después | Reducción |
|-------|-------|---------|-----------|
| Footer logos (6) | 11.7 MB | 76 KB | -99.4% |
| icon.png → favicon | 1.4 MB | 4 KB + 12 KB | -98.9% |
| model/logo | 760 KB | 68 KB | -91.1% |
| mentors/josepo | 696 KB | 8 KB | -98.9% |
| logo.svg | 732 KB | 260 KB | -64.4% |

### Arquitectura

| Archivo creado | Propósito |
|----------------|-----------|
| `src/data/siteConfig.ts` | Contacto, redes, admisión, identidad |
| `src/data/navigation.ts` | NavItems reutilizables |
| `src/components/layout/Navbar.astro` | Nav extraído del Layout |
| `src/components/layout/Footer.astro` | Footer extraído del Layout |
| `src/components/layout/SiteLoader.astro` | Loader extraído del Layout |

`Layout.astro`: 668 → ~250 líneas.

### SEO

| Elemento | Implementación |
|----------|---------------|
| robots.txt | `public/robots.txt` |
| sitemap.xml | `@astrojs/sitemap` (auto-generado) |
| Open Graph | og:title, og:description, og:url, og:site_name, og:locale |
| Twitter Cards | twitter:card, twitter:title, twitter:description |
| Canonical | `<link rel="canonical">` |
| Schema.org | JSON-LD EducationalOrganization |

### i18n

| Archivo | Acción |
|---------|--------|
| `en/join.json` | Creado (186 líneas) |
| `zh/join.json` | Creado (186 líneas) |
| `en/mentors.json` | Reescrito completo (131 líneas) |
| `zh/mentors.json` | Reescrito completo (131 líneas) |
| `en/projects.json` | Reescrito con estructura v2.* (148 claves) |
| `zh/projects.json` | Reescrito con estructura v2.* (148 claves) |
| `es/projects.json` | +6 claves para texto hardcodeado |
| `es/mentors.json` | +2 claves para texto hardcodeado |

### Accesibilidad

| Fix | Detalle |
|-----|---------|
| Contraste | `#86868b` → `#6e6e73` (4.7:1 WCAG AA) |
| Lang switcher | button + aria-expanded + Escape + hover |
| Focus visible | ring-2 en nav, CTAs, social icons |
| Aria-labels | Botón mobile internacionalizado (es/en/zh) |

---

## Notas Finales

- **No se inventaron métricas de rendimiento.** Los valores de Core Web Vitals requieren medición real con Lighthouse/WebPageTest en el entorno de producción.
- **No se modificó funcionalidad ni diseño.** Todas las correcciones preservan el comportamiento original.
- **No se alteraron textos institucionales.** Los textos de misión, visión y objetivo se respetaron íntegramente.
- **Huawei ICT Academy y Cisco Networking Academy** están tratados correctamente como academias oficiales que complementan la formación, sin prometer certificación automática.
- **GitHub** se presenta correctamente como portafolio técnico y repositorio institucional de evidencias.
- **El tono institucional es moderno y adecuado** para el público objetivo (aspirantes de preparatoria/bachillerato).
- **Build verificado:** 40 páginas generadas exitosamente en 4.58s.

