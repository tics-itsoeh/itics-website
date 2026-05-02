# Guía de Mantenimiento y Extensión

Este manual está diseñado para desarrolladores y administradores del sitio. Explica cómo realizar tareas de rutina de forma segura sin romper la interfaz gráfica (UI) ni la arquitectura.

## ➕ Cómo agregar un nuevo Proyecto o Docente
1. **Prepara tu imagen**:
   - Recórtala a un formato cuadrado (1:1) para docentes/clubes o rectangular panorámico (16:9) para proyectos.
   - Conviértela a formato `.webp` para que el sitio siga cargando ultra rápido.
   - Nómbrala en minúsculas y sin espacios (ej. `proyecto-iot-2025.webp`).
   - Guárdala en `public/projects/` o `public/mentors/`.
2. Abre `src/messages/es/projects.json` o `mentors.json`.
3. Copia un bloque JSON existente, pégalo al final de la lista correspondiente, y actualiza los valores y la ruta de la imagen.
4. **Importante**: Haz lo mismo en las carpetas `en/` y `zh/` para que el sitio no lance un error de "Missing Key" al cambiar de idioma.

## 🔄 Cómo actualizar la Convocatoria de Admisión
Cuando el ciclo escolar cambia (por ejemplo de 2026 a 2027):
1. Abre `src/data/siteConfig.ts`.
2. Busca la constante `admission`:
   ```typescript
   export const admission = {
     year: '2027',
     cycle: '2027–2028',
     registerUrl: 'https://fichas.itsoeh.edu.mx/',
     pdfUrl: 'URL_AL_NUEVO_PDF',
   }
   ```
3. Si los pasos o fechas textuales (ej. "Entrega de fichas: Del 15 de Mayo al...") cambiaron radicalmente, actualiza el bloque de timeline en `src/messages/es/join.json`.

## 📸 Reemplazo de Logos Institucionales
Si la SEP, TecNM o ITSOEH cambian su logotipo gubernamental u oficial:
1. Sube el nuevo logo **estrictamente en formato `.svg`** (para que escale perfectamente en pantallas Retina/4K) a la carpeta `public/logos/`.
2. Abre `src/components/layout/Footer.astro`.
3. Localiza el componente `<img>` del logo viejo y actualiza su atributo `src`.

## 🌐 Cómo agregar una nueva Red Social al Footer
1. Añade la URL en `src/data/siteConfig.ts` bajo el objeto `socialLinks`.
2. Añade el texto base en `src/messages/es/common.json` bajo la clave `footer` (ej. `"youtube": "YouTube"`). Asegúrate de traducirlo también al inglés y chino.
3. Abre `src/components/layout/Footer.astro`.
4. Busca la sección que dice `{/* Redes sociales */}`. Copia un bloque de enlace `<a>` existente y pégalo.
5. Cambia el atributo `href={socialLinks.youtube}` y el `aria-label={ft.youtubeLabel}`.
6. Reemplaza el SVG interior por el icono de la nueva red social. Recomendamos usar [Lucide Icons](https://lucide.dev/) para mantener la coherencia visual con el grosor de línea (`stroke-width="2"`).

## 🚀 Cómo agregar una Nueva Página Completa
1. Crea el archivo de la página bajo `src/pages/[lang]/nueva-pagina.astro`.
2. Usa la plantilla estándar de Astro importando el Layout:
   ```astro
   ---
   import Layout from '../../layouts/Layout.astro';
   const { lang } = Astro.params;
   ---
   <Layout lang={lang} title="Título de la Página">
     <h1>Contenido...</h1>
   </Layout>
   ```
3. Agrega la nueva ruta en `src/data/navigation.ts` para que aparezca automáticamente en el Navbar y Footer.
4. Traduce la etiqueta (label) de navegación en `common.json`.

## 🚨 Checklist Antes de Publicar (Deploy)
Antes de hacer `git push origin main`, siempre corre este checklist en tu terminal local para evitar caídas en producción:

1. **¿El código compila correctamente?**
   - Ejecuta `npm run build`. Si Astro detecta que olvidaste traducir una llave en el JSON o que un enlace está roto, el build fallará y te mostrará el error exacto. No subas código que no pase este build.
2. **¿El peso de los archivos es adecuado?**
   - Durante el build, revisa si hay advertencias de "Large assets". Si agregaste un modelo 3D o imágenes gigantes de 5MB, el sitio tardará en cargar. Reduce el peso usando herramientas como [Squoosh](https://squoosh.app/) o convierte el modelo con compresión Draco.
3. **¿La responsividad funciona bien?**
   - Inicia `npm run preview` y abre la URL `http://localhost:4321`. Inspecciona la web usando el modo de desarrollador de Chrome simulando un teléfono móvil (iPhone 13 o similar). Verifica que los textos y márgenes no se desborden de la pantalla.
