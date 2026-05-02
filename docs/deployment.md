# Guía de Compilación y Despliegue (Deploy)

El sitio de ITICs ITSOEH está construido empleando el paradigma SSG (Static Site Generator) de Astro. Esto significa que todo el procesamiento pesado (i18n, componentes, markdown) se resuelve en tu computadora durante el proceso de *Build*. 

Lo que sube al servidor es una simple carpeta `dist/` que contiene HTML pre-renderizado, CSS minimizado e imágenes locales. Esta es la forma más rápida y segura de construir webs.

## 🏗️ Comandos Esenciales

Antes de intentar desplegar, siempre verifica que tu código sea válido compilándolo localmente:

1. **`npm run dev`**: Inicia un servidor rápido en `localhost:4321`. Los errores aquí pueden ser tolerados.
2. **`npm run build`**: Activa el compilador rígido de Astro. Generará páginas para las 3 variantes de idiomas (es/en/zh). **Si olvidaste una traducción o dejaste un enlace roto, Astro detendrá el proceso aquí y te obligará a corregirlo.** Es imposible desplegar código roto.
3. **`npm run preview`**: Inicia un mini-servidor local pero consumiendo la carpeta de salida real (`/dist`). Así es exactamente cómo se verá y cargará el sitio en producción.

---

## 🚀 Plataforma Oficial de Despliegue: Cloudflare Pages

Dado que no hay base de datos backend, la arquitectura del sitio aprovecha las redes Edge/CDN. El sitio está oficialmente desplegado y alojado en **Cloudflare Pages**.

### 🏆 Por qué usamos Cloudflare Pages
Ideal para instituciones educativas como el ITSOEH por las siguientes razones:
- **Rendimiento Global**: Ofrece la CDN más rápida del mundo, sirviendo la carpeta `/dist` estática a velocidades ultrarrápidas desde servidores cercanos al usuario.
- **Escalabilidad y Seguridad**: Cuenta con ancho de banda teóricamente ilimitado y mitigación de ataques DDoS de grado empresarial. El sitio no se caerá por picos de tráfico intensos (ej. el día que publican las listas de admisión o inscripciones).
- **Integración Continua (CI/CD)**: Cloudflare está vinculado directamente al repositorio de GitHub (`itics-website`). Cualquier cambio empujado (push) a la rama `main` dispara automáticamente un *build* en la nube y actualiza el sitio en minutos.

### 🛠️ Flujo de Actualización en Producción

1. Realiza tus cambios en el código localmente.
2. Verifica que no haya errores ejecutando `npm run build` localmente.
3. Haz *commit* y *push* de tus cambios a la rama `main` en GitHub.
4. Cloudflare Pages detectará el nuevo commit de forma automática.
5. Cloudflare ejecutará el comando de compilación: `npm run build`.
6. Cloudflare desplegará el contenido del directorio de salida: `dist/`.
7. ¡Listo! El sitio estará actualizado globalmente en pocos minutos sin configuraciones adicionales.

### ⚙️ Consideraciones de Caché en Cloudflare

- **Archivos Estáticos Pesados**: Los modelos 3D (`.glb`) y recursos grandes en `/public` son cacheados por Cloudflare de manera automática.
- **Invalidación**: Cuando Cloudflare hace un nuevo despliegue desde GitHub, automáticamente purga la caché antigua, por lo que los usuarios siempre verán la versión más reciente del HTML y los datos de admisión.
