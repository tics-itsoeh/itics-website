# Guía de Contenido y Editorial

Para mantener la coherencia y el profesionalismo del sitio, todo texto nuevo debe adherirse a las siguientes reglas editoriales.

## 📏 Reglas Editoriales

### 1. Nombres Institucionales
- **Primera mención en una página**: Se debe usar el nombre completo: *"Ingeniería en Tecnologías de la Información y Comunicaciones (ITICs)"*.
- **Menciones subsecuentes**: Usar la abreviación oficial **"ITICs"** (con la 's' minúscula al final).
- **El área de estudio**: Usar "TICs" (solo cuando se hable del área en general, ej: *"El sector de las TICs en México..."*).
- **Institución**: ITSOEH y TecNM.

### 2. Tono de Voz
- **Aspiracional pero Técnico**: El sitio debe motivar al estudiante de preparatoria, pero usando términos técnicos correctos (ej. hablar de "Desarrollo de Software" y no "Hacer programitas").
- **Cercano e Inclusivo**: "Únete a nuestra comunidad", "Aprende con nosotros".
- **Institucional pero Moderno**: Evitar lenguaje burocrático. El texto debe ser fácil de escanear (párrafos de máximo 3-4 líneas).

---

## 📝 Dónde actualizar el contenido

Dado que el sitio usa una arquitectura internacionalizada (i18n), **el texto nunca se cambia en los archivos `.astro`**. 

Siempre debes buscar el archivo correspondiente en la carpeta `src/messages/es/` (y si aplica, en `en/` y `zh/`).

### Inicio (`home.json`)
- Títulos del Hero.
- Beneficios rápidos (Píldoras informativas).

### Fechas de Admisión y Requisitos (`join.json`)
- Pasos de admisión.
- FAQ de aspirantes.
- **Excepción**: El año ("2026") y el link al PDF de la convocatoria se cambian en `src/data/siteConfig.ts`.

### Proyectos (`projects.json`)
Contiene un arreglo bajo `v2.featured.items`. Cada proyecto requiere:
```json
{
  "title": "Nombre del Sistema",
  "description": "Descripción corta de lo que hace.",
  "image": "/projects/imagen.webp",
  "tags": ["React", "Python"],
  "demoUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

### Docentes, Mentores y Clubes (`mentors.json`)
Dividido en tres secciones:
1. `community.alumni`: Egresados destacados.
2. `community.teachers`: Profesores de la academia.
3. `community.clubs`: Clubes como Robótica o IoT.

### Retícula (`formation.json`)
- Si las competencias o el nombre de una materia cambia, búscalo en este archivo.

### Redes Sociales y Contacto (`siteConfig.ts`)
- **NO ESTÁN EN LOS JSON**. Viven en `src/data/siteConfig.ts` porque se usan en el Footer, el Navbar y la página de Contacto. Mantenemos una única fuente de la verdad para no tener números de WhatsApp desactualizados.
