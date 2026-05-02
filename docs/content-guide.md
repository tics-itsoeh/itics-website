# Guía de Contenido y Editorial

Para mantener la coherencia y el profesionalismo del sitio, todo texto nuevo debe adherirse a las siguientes reglas editoriales institucionales.

## 📏 Reglas Editoriales

### Nombres Institucionales
- **Primera mención en una página**: Se debe usar el nombre completo: *"Ingeniería en Tecnologías de la Información y Comunicaciones (ITICs)"*.
- **Menciones subsecuentes**: Usar la abreviación oficial **"ITICs"** (con la 's' minúscula al final).
- **El área de estudio**: Usar "TICs" (solo cuando se hable del área en general, ej: *"El sector de las TICs en México..."*).
- **Institución Matriz**: "Instituto Tecnológico Superior del Occidente del Estado de Hidalgo (ITSOEH)" y "Tecnológico Nacional de México (TecNM)".

### Tono de Voz
- **Aspiracional pero Técnico**: El sitio debe motivar al estudiante de preparatoria, pero usando términos técnicos correctos (ej. hablar de "Desarrollo de Software" y no "Hacer programitas").
- **Cercano e Inclusivo**: Se recomienda usar la primera persona del plural ("Únete a nuestra comunidad", "Aprende con nosotros").
- **Institucional pero Moderno**: Evitar lenguaje burocrático extenso. El texto debe ser fácil de escanear (párrafos de máximo 3-4 líneas).

---

## 📝 Mapeo de Archivos de Contenido

Dado que el sitio usa una arquitectura internacionalizada (i18n), **el texto nunca se cambia directamente en los archivos de interfaz `.astro`**. 

Siempre debes buscar el archivo correspondiente en la carpeta `src/messages/es/` (y si aplica, traducir y replicar en `en/` y `zh/`).

### Inicio (`home.json`)
- Títulos principales del Hero 3D.
- Beneficios rápidos (Píldoras informativas o Feature Cards).

### Fechas de Admisión y Requisitos (`join.json`)
- Perfil de ingreso esperado.
- Pasos de admisión detallados.
- FAQ (Preguntas frecuentes) de aspirantes.
- **Excepción importante**: El año ("2026") y el link exacto al PDF oficial de la convocatoria **no se cambian aquí**, sino en `src/data/siteConfig.ts` para que se replique en todo el sitio sin fallos.

### Proyectos (`projects.json`)
Contiene un arreglo bajo `v2.featured.items`. Cada proyecto requiere estrictamente:
```json
{
  "title": "Nombre del Sistema",
  "description": "Descripción corta de lo que hace (máximo 2 líneas).",
  "image": "/projects/imagen.webp",
  "tags": ["React", "Python"],
  "demoUrl": "https://...",
  "githubUrl": "https://github.com/..."
}
```

### Docentes, Mentores y Clubes (`mentors.json`)
Dividido en tres secciones clave para demostrar la comunidad activa:
1. `community.alumni`: Egresados destacados (Casos de éxito).
2. `community.teachers`: Profesores de la academia de la carrera.
3. `community.clubs`: Clubes extracurriculares como Robótica, IoT o Desarrollo web.

### Retícula (`formation.json`)
- Contiene los nombres exactos de las materias divididos por semestres (1 al 9).
- Lista de competencias profesionales.
- Descripción de las academias oficiales (Huawei / Cisco).

### Redes Sociales y Contacto
- **NO ESTÁN EN LOS JSON**. Viven de forma centralizada en `src/data/siteConfig.ts` porque se usan en el Footer, el Navbar y la página de Contacto simultáneamente. Mantenemos una única fuente de la verdad para no tener números de WhatsApp muertos o enlaces rotos.
