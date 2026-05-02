# Guía Visual y de Estilos

El sitio web oficial de ITICs ITSOEH está diseñado buscando un aura "Premium" y corporativa, emulando las interfaces modernas minimalistas (comúnmente llamadas estilo "Apple-like" o *Glassmorphism*).

Para mantener la estética institucional sin perder la elegancia visual y garantizar la compatibilidad perfecta con el **Modo Oscuro**, respeta estrictamente los siguientes principios.

## 🎨 1. Sistema de Colores y Modo Oscuro (Dark Mode)
El sitio utiliza un sistema avanzado de **variables semánticas**. Todos los colores base están centralizados en `src/styles/global.css` y cambian automáticamente cuando el usuario activa el modo oscuro o cambia la preferencia de su sistema operativo.

**NUNCA uses colores hexadecimales fijos (`#ffffff`, `#000000`, `bg-white`, `bg-black`) directamente en las clases de Tailwind.** 

Usa exclusivamente las siguientes clases semánticas:
- **`bg-apple-bg`**: Fondo principal de la aplicación. En modo claro es un gris perla (`#fbfbfd`) y en oscuro es negro puro (`#000000`).
- **`bg-apple-surface`**: Fondo para tarjetas primarias. Es blanco en modo claro y casi negro en modo oscuro.
- **`bg-apple-surface-alt`**: Fondo alternativo para tarjetas secundarias o secciones destacadas (gris claro -> gris oscuro).
- **`text-apple-text`**: Para todo el texto principal (negro suave -> blanco humo).
- **`text-apple-muted`**: Texto secundario (Gris institucional). Ideal para subtítulos y fechas.
- **`border-apple-border`**: Bordes ultra finos sutiles.
- **`bg-apple-blue` / `text-apple-blue`**: Color de acento primario (Botones y enlaces). Se adapta en modo oscuro para garantizar legibilidad.

*Nota: La transición de temas es gestionada de manera fluida y sin parpadeos (Anti-FOUC) por un script inyectado en `Layout.astro`.*

## 🖋️ 2. Jerarquía Tipográfica
El proyecto descansa fuertemente sobre una tipografía excepcionalmente legible.

- Usamos la fuente **Inter** importada nativamente vía Google Fonts CDN (pesos `400, 500, 600, 700, 800, 900`).
- **Títulos Grandes (H1, H2)**: Letra grande, en negrita máxima (`font-bold` o `font-black`), y con el espacio entre letras contraído (*tracking-tight*) para lograr un look más condensado y moderno.
- **Párrafos Base**: Texto de tamaño regular (`text-base` o `text-[1.05rem]`), pero con un interlineado generoso (`leading-relaxed`) en color secundario `text-apple-muted`.

## 📦 3. Componentes y UI

### Tarjetas (Cards)
El sitio utiliza el diseño de tarjetas para organizar la información y hacerla amigable.
- **Fondos**: Usa `bg-apple-surface` o `bg-apple-surface-alt`. No uses opacidades forzadas a menos que sea un componente flotante.
- **Bordes**: Aplica `border border-apple-border` para apenas separar la tarjeta del fondo general sin ruido visual.
- **Esquinas**: Las esquinas son marcadamente redondas. Usa siempre `rounded-2xl` o `rounded-[2rem]` en elementos estructurales grandes.
- **Interactividad**: Las tarjetas interactivas (como los laboratorios) deben usar la clase `group`, `hover:-translate-y-1` y `transition-all duration-300` para un efecto sutil al pasar el cursor.

### Botones (CTAs)
- **Forma**: Los botones principales y etiquetas son en forma de píldora ("Pill-shaped", clase `rounded-full`).
- **Sombras**: El minimalismo huye de las sombras de caja agresivas. Para botones principales, usa sombras coloreadas difuminadas (ej. `shadow-[0_8px_20px_rgba(0,102,204,0.25)]`).

### Desenfocado Cristalino (Glassmorphism)
- Usado para componentes que "flotan" sobre el contenido principal (Navbar inferior, modales, alertas).
- Utiliza la clase de Tailwind `backdrop-blur-md` o `backdrop-blur-xl` en conjunto con fondos transparentes (`bg-apple-nav`) para que el contenido pase por detrás como si fuera un cristal.

## 🏛️ 4. Uso de Logos Institucionales
- Los logos gubernamentales (SEP, TecNM, ITSOEH) son visualmente ruidosos si se colocan flotando en la navegación principal superior, rompiendo la experiencia minimalista.
- **Por normativa legal deben existir en el sitio**, por eso **viven unificados en el Footer**. Allí cumplen con la institucionalidad sin comprometer la limpieza de la navegación de conversión.
- Todos los logos están convertidos al formato moderno `WebP` para tiempos de carga ultrarrápidos y se muestran en el pie de página.
