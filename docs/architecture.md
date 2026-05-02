# Arquitectura y Estructura del Sitio

El sitio de **ITICs ITSOEH** está diseñado bajo los principios de **JAMstack**, utilizando [Astro](https://astro.build/) para lograr generación de sitios estáticos (SSG) de ultra alto rendimiento.

## 🏛️ Principios Arquitectónicos
1. **Zero JavaScript by Default**: El sitio envía HTML y CSS puros al cliente. El único JS cargado es el de interacciones específicas (como Three.js en el hero o el menú móvil).
2. **Single Source of Truth (SSOT)**: Configuración global, enlaces institucionales y datos de contacto se consumen desde `src/data/siteConfig.ts` para evitar la redundancia y errores de sincronización.
3. **i18n Basado en Datos**: Las páginas no contienen texto duro. Extraen diccionarios de traducciones (`src/messages/[lang]/`) permitiendo escalar a múltiples idiomas sin duplicar componentes Astro.

---

## 🗺️ Diagrama de Arquitectura General

```mermaid
flowchart TD
    User([👨‍💻 Usuario / Aspirante])
    Browser[Navegador Web]

    subgraph CDN[Edge / Hosting CDN]
        SSG[HTML/CSS Estático Generado]
        Assets[Imágenes / Modelos 3D / PDFs]
    end

    subgraph Frontend[Astro Frontend]
        Pages(Páginas .astro)
        Components((Componentes UI))
        Layouts[Layout Base]
    end

    subgraph DataLayer[Capa de Datos]
        i18n[(JSON Diccionarios)]
        Config[(siteConfig.ts)]
    end

    User --> Browser
    Browser --> CDN
    CDN -- Sirve páginas --> Frontend
    Frontend --> Layouts
    Layouts --> Pages
    Pages --> Components
    Components --> DataLayer
    Pages --> DataLayer
```

---

## 🌐 Sitemap del Sitio

```mermaid
mindmap
  root((ITICs ITSOEH))
    Inicio
      Hero 3D
      Secciones CTA
    Formación
      Retícula PDF
      Competencias
      Academias Cisco/Huawei
    Aspirantes
      Perfil de Ingreso
      Proceso Admisión
      Fechas Clave
    Proyectos
      Proyectos Destacados
      Repositorios GitHub
    Comunidad
      Egresados
      Clubes Estudiantiles
      Profesores
    Contacto
      Redes Sociales
      WhatsApp / Correo
      Mapa Interactivo
```

---

## 🧩 Diagrama de Componentes Principales

```mermaid
flowchart LR
    Layout[Layout.astro\nSEO & Wrapper] --> Nav[Navbar.astro]
    Layout --> Footer[Footer.astro]
    Layout --> PageContent((Contenido de la Página))

    PageContent --> Hero[Hero.astro]
    PageContent --> Models[Model3DCanvas.astro]
    
    Footer --> Config[siteConfig.ts\n(Links y Teléfonos)]
    Nav --> NavData[navigation.ts\n(Rutas)]
    
    subgraph Patrones de UI en Páginas
        PageContent -.-> FeatureCard[Tarjetas de Información]
        PageContent -.-> CTASection[Llamados a la Acción]
        PageContent -.-> LogoStrip[Cintas de Logos]
    end
```

---

## 💾 Modelo de Datos Conceptual
Aunque no hay una base de datos tradicional, el sitio maneja "Entidades" a nivel de archivos de configuración (`.json` y `.ts`).

```mermaid
erDiagram
    SITE_CONFIG ||--o{ SOCIAL_LINK : contains
    SITE_CONFIG ||--|| CONTACT_INFO : contains
    SITE_CONFIG ||--|| ADMISSION_DATA : contains

    PAGE ||--o{ SECTION : renders
    SECTION ||--o{ COMPONENT : uses

    I18N_DICTIONARY ||--o{ PROJECT : stores
    I18N_DICTIONARY ||--o{ CLUB : stores
    I18N_DICTIONARY ||--o{ MENTOR : stores

    PROJECT {
        string title
        string description
        string imageUrl
        string tags
        string demoUrl
        string githubUrl
    }

    CLUB {
        string name
        string target
        string url
    }

    ADMISSION_DATA {
        string year
        string cycle
        string pdfUrl
    }
```
