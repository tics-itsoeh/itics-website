# Guía de Mantenimiento

Este manual está diseñado para desarrolladores y mantenedores futuros. Explica cómo realizar tareas comunes sin romper el diseño ni la arquitectura.

## ➕ Cómo agregar un nuevo Proyecto o Docente
1. Prepara tu imagen:
   - Recórtala a un formato cuadrado (1:1) o rectangular panorámico (16:9).
   - Conviértela a `.webp` para que el sitio siga cargando rápido.
   - Guárdala en `public/projects/` o `public/mentors/`.
2. Abre `src/messages/es/projects.json` o `mentors.json`.
3. Copia un bloque JSON existente, pégalo al final de la lista, y cambia los datos.
4. **Importante**: Haz lo mismo en las carpetas `en/` y `zh/` para que el sitio no falle al cambiar de idioma.

## 🔄 Cómo actualizar Admisión 2026 a 2027
1. Abre `src/data/siteConfig.ts`.
2. Busca el objeto `admission`:
   ```typescript
   export const admission = {
     year: '2027',
     cycle: '2027–2028',
     registerUrl: 'https://fichas.itsoeh.edu.mx/',
     pdfUrl: 'URL_AL_NUEVO_PDF',
   }
   ```
3. Si los pasos o fechas (ej. "Entrega de fichas: Mayo") cambiaron, actualiza `src/messages/es/join.json`.

## 📸 Reemplazo de Logos Institucionales
Si la SEP, TecNM o ITSOEH cambian su logo de gobierno:
1. Sube el nuevo logo en formato `.svg` a `public/logos/`.
2. Abre `src/components/layout/Footer.astro`.
3. Localiza el componente `<img src="/logos/X.svg" ...>` y actualiza el atributo `src`.

## 🌐 Cómo agregar una nueva Red Social
1. Añade la URL en `src/data/siteConfig.ts` bajo `socialLinks`.
2. Añade el texto base en `src/messages/es/common.json` (ej. `"youtube": "YouTube"`).
3. Abre `src/components/layout/Footer.astro`.
4. Busca la sección `Redes sociales`. Copia un bloque `<a>` existente y pégalo.
5. Usa el SVG de la red social correspondiente (puedes sacarlo de [Lucide Icons](https://lucide.dev/)).

## 🚨 Checklist Antes de Publicar (Deploy)
Antes de hacer `git push`, siempre corre este checklist en tu terminal:

1. **¿Compila?**
   Ejecuta `npm run build`. Si Astro detecta que olvidaste traducir una llave (missing key), el build fallará y te avisará.
2. **¿Pesa mucho?**
   Si agregaste modelos 3D o imágenes gigantes, el build te advertirá sobre "Large assets". Reduce el peso usando herramientas como [Squoosh](https://squoosh.app/).
3. **¿Se ve bien en móvil?**
   Inicia `npm run preview` y abre el navegador inspeccionando en modo celular (iPhone/Android). Revisa que los márgenes no estén rotos.
