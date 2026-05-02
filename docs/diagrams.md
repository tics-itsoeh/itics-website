# Diagramas del Sistema

Esta sección consolida todos los gráficos y flujos operativos que describen cómo interactúan los usuarios con la información y cómo está ensamblado el sitio a nivel de módulos. Estos diagramas son generados automáticamente en GitHub usando la tecnología **Mermaid**.

---

## 1. Diagrama de Arquitectura (Frontend a Servidor)
Demuestra el ciclo desde que un aspirante entra al navegador hasta que nuestro sitio estático (SSG) extrae sus JSONs y sirve la vista terminada.

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

    subgraph DataLayer[Capa de Datos Estáticos]
        i18n[(JSON Traducciones)]
        Config[(siteConfig.ts)]
    end

    User --> Browser
    Browser --> CDN
    CDN -- Sirve páginas a máx vel. --> Frontend
    Frontend --> Layouts
    Layouts --> Pages
    Pages --> Components
    Components --> DataLayer
    Pages --> DataLayer
```

---

## 2. Sitemap del Sitio ITICs ITSOEH
Muestra las seis ramificaciones estructurales principales a las que un aspirante o empresa tiene acceso desde el Navbar superior.

```mermaid
mindmap
  root((ITICs ITSOEH))
    Inicio
      Hero Interactivo 3D
      Secciones Rápidas (CTAs)
    Formación
      Retícula PDF (Visualizador)
      Competencias Profesionales
      Academias Cisco/Huawei
    Aspirantes
      Perfil de Ingreso Ideal
      Proceso de Admisión a detalle
      Fechas Clave y FAQ
    Proyectos
      Proyectos Destacados (Cards)
      Repositorios GitHub / Demos
    Comunidad
      Egresados Exitosos (Alumni)
      Clubes Estudiantiles
      Profesores (Planta)
    Contacto
      Redes Sociales
      Botones WhatsApp / Correo
      Mapa Interactivo del Campus
```

---

## 3. Diagrama de Composición (Component Tree)
Indica qué componente maestro es padre de cuáles otros sub-componentes.

```mermaid
flowchart LR
    Layout[Layout.astro\n(SEO, Metadatos, Base CSS)] --> Nav[Navbar.astro]
    Layout --> Footer[Footer.astro]
    Layout --> SiteLoader[SiteLoader.astro]
    Layout --> PageContent((Contenido de la Página .astro))

    PageContent --> Hero[Hero.astro\n(Homepage)]
    PageContent --> CTAS[CTABanners]
    
    Hero --> Models[Model3DCanvas.astro\nLazy-loaded Three.js]
    
    Footer -.-> |Lee Redes Sociales de| Config[siteConfig.ts]
    Nav -.-> |Lee Rutas de| NavData[navigation.ts]
```

---

## 4. Flujo del Usuario Aspirante (Conversión)
El sitio tiene un objetivo de negocio: Informar de tal manera que un estudiante de prepa elija estudiar ITICs e inicie su proceso de inscripción ("Conversión Exitosa").

```mermaid
flowchart TD
    A[👨‍🎓 Usuario entra al Home] --> B{Primer Vistazo}
    
    B --> |Curiosidad| C[Hace scroll en Inicio]
    C --> |Descubre materias| D[Ve Página Formación]
    C --> |Quiere evidencia| E[Revisa Proyectos/Egresados]
    
    B --> |Decisión ya tomada| F[Click directo 'Admisión' en Navbar]
    
    D --> F
    E --> F
    
    F --> G[Página Especial de Aspirantes]
    G --> H[Lee Perfil de Ingreso]
    H --> I[Revisa Requisitos de Ingreso]
    I --> J[Lee FAQ para quitar dudas]
    
    J --> |Aún tiene dudas técnicas| K[Navega a Página Contacto]
    K --> L[Click en Botón WhatsApp o Manda Correo]
    
    J --> |Está completamente listo| M[Click en PDF Fichas o Sistema Fichas ITSOEH]
    M --> N(((Conversión Exitosa)))
```

---

## 5. Modelo de Datos Conceptual
Aunque JAMstack se basa en archivos (no hay Base de Datos MySQL), el código maneja un modelo de dominio fuertemente estructurado.

```mermaid
erDiagram
    SITE_CONFIG ||--o{ SOCIAL_LINK : contains
    SITE_CONFIG ||--|| CONTACT_INFO : contains
    SITE_CONFIG ||--|| ADMISSION_DATA : contains

    I18N_DICTIONARY ||--o{ PROJECT : stores
    I18N_DICTIONARY ||--o{ CLUB : stores
    I18N_DICTIONARY ||--o{ MENTOR : stores
    I18N_DICTIONARY ||--o{ FAQ_ITEM : stores

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
        string image
    }

    ADMISSION_DATA {
        string year
        string cycle
        string pdfUrl
        string registerUrl
    }
```

---

## 6. Flujo de Mantenimiento de Contenido para Desarrolladores
Pasos que sigue el mantenedor oficial del sitio (Servicio Social / Coordinador).

```mermaid
flowchart LR
    A[🛠️ Editor ITICs] -->|Abre Repositorio| B(Localiza el archivo)
    
    B -->|Cambios Fechas/Tel| C[`siteConfig.ts`]
    B -->|Textos Nuevos| D[`messages/es/*.json`]
    B -->|Fotos Nuevas| E[`/public/`]
    
    C & D & E --> F[Test Local]
    F -.->|npm run dev| G[Navegador localhost]
    
    G -->|Errores| B
    G -->|Pasa revisión visual| H[git add . / git commit]
    H --> I[git push origin main]
    
    I --> J{Detectado por CI/CD Vercel/Cloudflare}
    J --> K[Se activa npm run build]
    K --> L(((Sitio Actualizado en Producción)))
```
