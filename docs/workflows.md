# Flujos de Operación y Mantenimiento

Esta documentación mapea el recorrido principal de los usuarios y el proceso técnico para mantener el sitio.

## 🚶‍♂️ Flujo del Usuario Aspirante (Embudo de Conversión)
El sitio está diseñado para que un aspirante de preparatoria tenga un camino claro desde el descubrimiento hasta el contacto.

```mermaid
flowchart TD
    A[👨‍🎓 Ingresa al Sitio Web] --> B{Revisa el Hero}
    
    B --> |Interés general| C[Hace scroll en Inicio]
    C --> |Descubre áreas| D[Página de Formación]
    C --> |Ve potencial| E[Página de Proyectos/Comunidad]
    
    B --> |Decisión tomada| F[Click en 'Admisión 2026' en Navbar]
    
    D --> F
    E --> F
    
    F --> G[Página de Aspirantes]
    G --> H[Lee Perfil de Ingreso]
    H --> I[Revisa Requisitos y Fechas]
    I --> J[Preguntas Frecuentes FAQ]
    
    J --> |Aún tiene dudas| K[Página de Contacto]
    K --> L[Click WhatsApp / Correo]
    
    J --> |Está listo| M[Click en PDF Oficial o Sistema Fichas]
    M --> N(((Conversión Exitosa)))
```

---

## 💻 Flujo de Mantenimiento de Contenido
Para futuros administradores o desarrolladores, este es el flujo para modificar la información del sitio (como agregar un profesor o actualizar fechas de fichas).

```mermaid
flowchart LR
    A[🛠️ Editor/Dev] -->|Abre código| B(Localiza archivo)
    
    B -->|Cambios globales| C[`siteConfig.ts`]
    B -->|Cambios de texto| D[`src/messages/es/*.json`]
    B -->|Nuevas imágenes| E[`/public/`]
    
    C & D & E --> F[Pre-visualiza local]
    F -.->|npm run dev| G[localhost:4321]
    
    G -->|Si está OK| H[git add . / git commit]
    H --> I[git push origin main]
    
    I --> J{Despliegue Automático}
    J -->|Vercel / Cloudflare| K(((Sitio en Producción)))
```
