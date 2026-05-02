# Colección de Diagramas del Sistema

Esta sección proporciona una representación visual integral del sitio web de ITICs ITSOEH. Todos los diagramas están construidos con [Mermaid](https://mermaid.js.org/) para asegurar su renderizado automático en GitHub, Notion y otras herramientas compatibles con Markdown.

---

## 1. Arquitectura General
*Representa la vista de alto nivel del sistema JAMstack, desde el usuario hasta los datos subyacentes.*

```mermaid
flowchart TD
    User([👨‍💻 Aspirante / Usuario])
    Browser[Navegador]

    subgraph EdgeCDN[Cloudflare Pages / Vercel]
        SSG[Archivos Estáticos HTML/CSS]
        Assets[Imágenes / PDF / Modelos 3D]
    end

    subgraph AstroLayer[Capa de Presentación Astro]
        Layouts[Layout Maestro]
        Pages(Páginas .astro)
        Components((Componentes UI))
    end

    subgraph DataLayer[Capa de Datos Estáticos]
        JSON[(messages/i18n JSONs)]
        Config[(siteConfig.ts)]
    end

    User --> Browser
    Browser --> EdgeCDN
    EdgeCDN -- Sirve contenido --> AstroLayer
    AstroLayer --> Layouts
    Layouts --> Pages
    Pages --> Components
    Components -. Consume .-> DataLayer
    Pages -. Consume .-> DataLayer
```
**Explicación:** El sitio no posee base de datos tradicional ni servidor activo (Node/PHP). En su lugar, Astro genera archivos HTML planos estáticos durante el proceso de *build*, inyectando la información desde la capa de configuración (DataLayer).

---

## 2. Sitemap Estructural
*Muestra la jerarquía de navegación y las ramificaciones principales del sitio.*

```mermaid
mindmap
  root((ITICs ITSOEH))
    Inicio
      Hero 3D
      Llamados a la Acción
    Formación
      Competencias
      Academias Cisco/Huawei
      Retícula Curricular
    Aspirantes
      Perfil de Ingreso
      Proceso de Admisión
      Fechas Clave / FAQ
    Proyectos
      Proyectos Destacados
      Enlaces a Repositorios
    Comunidad
      Egresados Exitosos
      Clubes Estudiantiles
      Profesores (Academia)
    Contacto
      Redes Sociales
      Contacto Directo (Mail/WA)
      Ubicación Física (Mapa)
```
**Explicación:** La estructura está optimizada para guiar a los aspirantes. Mantiene la profundidad de clics al mínimo, asegurando que la información de admisión y contacto sea accesible desde cualquier nivel del árbol.

---

## 3. Árbol de Componentes Reutilizables
*Mapea la relación padre-hijo entre los bloques de construcción de la interfaz gráfica.*

```mermaid
flowchart LR
    Layout[Layout.astro\nSEO + Base CSS] --> Nav[Navbar.astro]
    Layout --> Footer[Footer.astro]
    Layout --> SiteLoader[SiteLoader.astro]
    Layout --> Slot((`slot`\nContenido))

    Slot --> Hero[Hero.astro]
    Slot --> CardGrid[Grid de Tarjetas]
    Slot --> CTA[Banner Call-to-Action]
    
    Hero --> Model[Model3DCanvas.astro]
    CardGrid --> ProjectCard[Card Proyecto]
    CardGrid --> MentorCard[Card Perfil]
    CardGrid --> GenericCard[Card Genérica]
    
    Footer -. Extrae Links .-> siteConfig[siteConfig.ts]
    Nav -. Extrae Rutas .-> navigation[navigation.ts]
```
**Explicación:** `Layout.astro` actúa como el *App Shell* o marco de todas las páginas, inyectando el SEO y las dependencias globales. Dentro del `<slot>`, las páginas ensamblan vistas usando componentes "tontos" y reutilizables.

---

## 4. Flujo del Usuario Aspirante (Conversión)
*Ruta esperada que recorre un prospecto desde que entra hasta que se inscribe.*

```mermaid
flowchart TD
    A[Aspirante Entra] --> B{Revisa Inicio}
    B --> |Curiosidad Académica| C[Página: Formación / Carrera]
    B --> |Curiosidad Estudiantil| D[Página: Proyectos / Comunidad]
    B --> |Decidido a Inscribirse| E[Click 'Admisión']
    
    C --> E
    D --> E
    
    E --> F[Página: Aspirantes]
    F --> G[Lee Perfil y Requisitos]
    G --> H[Revisa Fechas Clave y FAQ]
    
    H --> |Tiene Dudas| I[Página: Contacto]
    I --> J[Envía WhatsApp / Correo]
    
    H --> |Cero Dudas| K[Click: Sistema de Fichas ITSOEH]
    K --> L(((Conversión Exitosa)))
```
**Explicación:** El diseño sigue una lógica de embudo (Funnel). Cada página del sitio tiene como objetivo final redirigir al estudiante hacia el flujo de admisión o resolución de dudas de contacto.

---

## 5. Flujo General de Mantenimiento de Contenido
*Ciclo de vida para actualizar la información sin arriesgar la plataforma.*

```mermaid
flowchart LR
    Dev[👨‍🔧 Mantenedor] --> A[Edita Código Local]
    
    A --> |Cambios Globales| B[`src/data/`]
    A --> |Cambios Textuales| C[`src/messages/es/`]
    A --> |Imágenes| D[`public/`]
    
    B & C & D --> E[Test: `npm run dev`]
    E --> F{¿Build Exitoso?}
    
    F -- No --> G[Corregir Errores TS/JSON]
    G --> E
    
    F -- Sí --> H[git commit & push]
    H --> I[Vercel/Cloudflare lanza Build]
    I --> J(((Sitio Actualizado)))
```
**Explicación:** Se prioriza un desarrollo defensivo. Al usar `npm run build` localmente, Astro verificará que todas las llaves JSON existan y que no haya enlaces rotos antes de impactar producción.

---

## 6. Modelo Conceptual de Datos
*Estructura de las entidades de información, aunque no exista una base de datos real.*

```mermaid
erDiagram
    SITE_CONFIG ||--o{ SOCIAL_LINK : "Define URL de"
    SITE_CONFIG ||--|| ADMISSION_DATA : "Define Año/URL de"
    
    I18N_DICTIONARY ||--o{ PROJECT : "Contiene Lista de"
    I18N_DICTIONARY ||--o{ MENTOR : "Contiene Lista de"
    I18N_DICTIONARY ||--o{ CLUB : "Contiene Lista de"
    I18N_DICTIONARY ||--o{ FAQ : "Contiene Lista de"

    PROJECT {
        string title
        string description
        string imageUrl
        string demoUrl
        string githubUrl
    }

    ADMISSION_DATA {
        string year
        string cycle
        string registerUrl
        string pdfUrl
    }
```
**Explicación:** Demuestra cómo las entidades "entran" al sistema. Mientras que los proyectos, clubes y mentores viven en diccionarios de traducciones (i18n), la configuración dura (fechas, links de registro) vive centralizada en la configuración.

---

## 7. Flujo de Actualización de Proyectos
*Protocolo estricto para agregar un nuevo proyecto estudiantil.*

```mermaid
flowchart TD
    A[Recibir Material del Proyecto] --> B[Recortar imagen a 16:9 y optimizar a .webp]
    B --> C[Guardar en `public/projects/`]
    
    C --> D[Abrir `src/messages/es/projects.json`]
    D --> E[Duplicar un nodo dentro de `v2.featured.items`]
    
    E --> F[Actualizar title, description, imageUrl y links]
    
    F --> G{¿El sitio es multilenguaje?}
    G -- Sí --> H[Replicar cambios en `en/projects.json` y `zh/projects.json`]
    G -- No --> I[Build Local]
    H --> I
    
    I --> J[git push -> Producción]
```
**Explicación:** Subraya la importancia crítica de la optimización de imágenes (WebP) y la obligación arquitectónica de replicar las llaves en los otros archivos de idiomas para evitar rupturas de Astro.

---

## 8. Flujo de Actualización de Admisión (Cambio de Ciclo)
*Protocolo para el salto anual de ciclo escolar (Ej. 2026 -> 2027).*

```mermaid
flowchart TD
    A[Nueva Convocatoria Publicada por ITSOEH] --> B[Obtener nuevo PDF oficial]
    B --> C[Subir PDF a `public/docs/`]
    
    C --> D[Abrir `src/data/siteConfig.ts`]
    D --> E[Actualizar variable `admission.year` y `admission.cycle`]
    E --> F[Actualizar `admission.pdfUrl`]
    
    F --> G{¿Cambiaron los pasos o requisitos?}
    G -- Sí --> H[Abrir `src/messages/es/join.json`]
    H --> I[Modificar textos de pasos y timeline]
    I --> J[Test y Push]
    
    G -- No --> J
```
**Explicación:** Desvincula la actualización de variables "duras" (año, ciclo) de los textos narrativos de la convocatoria, centralizando los links en TypeScript (`siteConfig`) y no en archivos Astro.

---

## 9. Relación de Simbiosis: Páginas, Secciones y Datos
*Muestra cómo la vista web, el componente parcial y el JSON se unen en la pantalla del usuario final.*

```mermaid
flowchart LR
    subgraph Pagina [Página Astro]
        P[src/pages/.../mentores.astro]
    end

    subgraph Secciones [Componentes]
        C1[MentorsGrid.astro]
        C2[AlumniCarousel.astro]
    end

    subgraph Datos [Fuentes de Datos]
        J1[mentors.json 'teachers']
        J2[mentors.json 'alumni']
        S1[siteConfig.ts]
    end

    P -->|Renderiza| C1
    P -->|Renderiza| C2
    
    J1 -.->|Pasa array como props| C1
    J2 -.->|Pasa array como props| C2
    
    S1 -.->|Pasa Configuración| P
```
**Explicación:** Describe el flujo de datos unidireccional. La Página actúa como controlador: extrae la información del JSON y de SiteConfig, y la pasa "hacia abajo" a los componentes en forma de propiedades (props) para ser renderizadas.
