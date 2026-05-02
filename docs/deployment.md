# Guía de Compilación y Despliegue (Deploy)

El sitio de ITICs ITSOEH está construido empleando el paradigma SSG (Static Site Generator) de Astro. Esto significa que todo el procesamiento pesado (i18n, componentes, markdown) se resuelve en tu computadora durante el proceso de *Build*. 

Lo que sube al servidor es una simple carpeta `dist/` que contiene HTML pre-renderizado, CSS minimizado e imágenes locales. Esta es la forma más rápida y segura de construir webs.

## 🏗️ Comandos Esenciales

Antes de intentar desplegar, siempre verifica que tu código sea válido compilándolo localmente:

1. **`npm run dev`**: Inicia un servidor rápido en `localhost:4321`. Los errores aquí pueden ser tolerados.
2. **`npm run build`**: Activa el compilador rígido de Astro. Generará páginas para las 3 variantes de idiomas (es/en/zh). **Si olvidaste una traducción o dejaste un enlace roto, Astro detendrá el proceso aquí y te obligará a corregirlo.** Es imposible desplegar código roto.
3. **`npm run preview`**: Inicia un mini-servidor local pero consumiendo la carpeta de salida real (`/dist`). Así es exactamente cómo se verá y cargará el sitio en producción.

---

## 🚀 Opciones de Plataformas Cloud (Alojamiento Edge)

Dado que no hay base de datos backend, no recomendamos en absoluto usar servidores compartidos tradicionales (HostGator, cPanel, Apache). Eso solo alentará artificialmente al sitio.

Recomendamos conectar tu repositorio de GitHub directamente a una red Edge/CDN.

### 🏆 1. Cloudflare Pages (La Opción Primordial)
Ideal para instituciones educativas como el ITSOEH.
- **Por qué usarlo**: Ofrece el CDN más rápido del planeta de manera gratuita. Cuenta con ancho de banda teóricamente ilimitado y una capa brutal de mitigación de ataques DDoS de fábrica. Perfecto por si el sitio sufre caídas de tráfico intenso el día que publican las listas de admisión o inscripciones.
- **Cómo desplegar**:
  1. Entra al dashboard de Cloudflare -> Workers & Pages.
  2. Vincula tu repositorio de GitHub `itics-website`.
  3. Cloudflare detectará que es Astro. El comando de build es `npm run build` y el directorio de salida (output) es `dist`.

### ⚡ 2. Vercel
Ideal para iterar rápidamente (Despliegues de PRs) y obtener optimización de imágenes avanzada.
- **Por qué usarlo**: Tiene la mejor experiencia de desarrollador (DX). Si activas el Vercel Image Optimization en Astro, comprimirá las imágenes de estudiantes y profesores de forma magistral en el aire.
- **Cómo desplegar**: Crea una cuenta en Vercel, importa el repositorio desde GitHub. Configuración en un clic.

### 🌐 3. GitHub Pages
Ideal si la institución no permite dependencias externas y exige mantenerlo todo donde vive el código.
- **Por qué usarlo**: Es totalmente gratuito y el código fuente ya reside aquí. 
- **Cómo desplegar**: Debes escribir un flujo YAML (`.github/workflows/deploy.yml`) usando Github Actions. El action correrá `npm run build` en un servidor de Microsoft en la nube y subirá la carpeta `dist` estática a una rama especial (ej. `gh-pages`), que el servicio montará en el aire de forma automática.

## 🔐 Configuración Manual en Servidor Universitario (Apache/Nginx)
Si las reglas de Control Escolar u otra área forzan a instalar los archivos HTML crudos en el viejo servidor del Campus (vía FTP/CPanel):

1. **Evita el comportamiento `Trailing Slash`**: Astro compila `/unirse` como `/unirse/index.html`. Asegúrate de que las reglas de redirección del servidor o el archivo `.htaccess` apunten las URLs limpias a la carpeta `/index.html` correcta.
2. **Fuerza HTTPS Strict**: Nunca sirvas datos institucionales en HTTP inseguro.
3. **Control de Caché de Assets**: Configura los headers para que la carpeta `/model` (donde vive el monstruoso archivo `.glb` 3D) tenga una orden de "Cache-Control" de larga duración (max-age=31536000), ya que el modelo nunca cambia. Para los HTML, debes permitir revalidación (`must-revalidate`) para evitar que se quede pegada información de admisión vieja.
