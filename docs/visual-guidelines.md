# Guía Visual y de Estilos

El sitio web oficial de ITICs ITSOEH está diseñado buscando un aura "Premium" y corporativa, emulando las interfaces modernas minimalistas (comúnmente llamadas estilo "Apple-like" o *Glassmorphism*). 

Para mantener la estética institucional sin perder la elegancia visual, respeta estrictamente los siguientes principios.

## 🎨 1. Sistema de Colores
Todos los colores base están centralizados como tokens CSS en `src/styles/global.css` (con sus alias de Tailwind en `tailwind.config.mjs`). NUNCA uses colores hexadecimales duros (`#fff`, `#000`) directamente en las clases HTML.

- **Fondo Base (`--apple-bg`)**: Blanco roto/gris perla (`#fbfbfd`). El blanco puro (`#ffffff`) puede cansar la vista en monitores brillantes, por lo que el fondo principal siempre tiene este ligerísimo tono grisáceo.
- **Texto Principal (`--apple-text`)**: Negro suave o *Charcoal* (`#1d1d1f`). Evita usar texto en negro absoluto; el `#1d1d1f` suaviza la lectura.
- **Texto Secundario (`--apple-muted`)**: Gris institucional (`#6e6e73`). Ideal para fechas, etiquetas, links pasivos o subtítulos.
- **Acento Primario (`--apple-blue`)**: Azul institucional moderno (`#0066cc`). Usado en CTAs principales, links con efecto hover, y delineados de botones (rings). En *hover*, se oscurece ligeramente a `--apple-blue-hover` (`#0077ed`).

## 🖋️ 2. Jerarquía Tipográfica
El proyecto descansa fuertemente sobre una tipografía excepcionalmente legible.

- Usamos la fuente **Inter** importada nativamente vía Google Fonts CDN (pesos `400, 500, 600, 700, 800, 900`).
- **Decisión Arquitectónica**: Se descartó alojar la fuente "Variable" localmente porque alteraba el grosor percibido de los títulos pesados (pesos 800/900). Mantén siempre el link de Google Fonts (`<link href="...">` en `Layout.astro`) para garantizar la solidez visual y el Anti-aliasing perfecto.
- **Títulos Grandes (H1, H2)**: Letra grande, en negrita máxima (`font-bold` o `font-black`), y con el espacio entre letras contraído (*tracking-tight*) para lograr un look más condensado y moderno.
- **Párrafos Base**: Texto de tamaño regular (`text-base` o `text-lg`), pero con un interlineado generoso (`leading-relaxed`) en color secundario `--apple-muted`.

## 📦 3. Componentes y UI

### Tarjetas (Cards)
El sitio abusa del diseño de tarjetas para organizar la información y hacerla amigable.
- **Fondos**: Tienen fondos blancos semi-transparentes (`bg-white/80`) para permitir que fondos dinámicos o gradientes resalten.
- **Bordes**: Tienen delineados sumamente sutiles y transparentes (`border border-black/5`) que apenas separan la tarjeta del fondo general.
- **Esquinas**: Las esquinas son marcadamente redondas. Usa siempre `rounded-2xl` o `rounded-3xl` en elementos estructurales grandes.

### Botones (CTAs)
- **Forma**: Los botones principales y etiquetas son en forma de píldora ("Pill-shaped", clase `rounded-full`).
- **Sombras**: El minimalismo huye de las sombras de caja oscuras y agresivas (`shadow-lg`). En su lugar, confiamos en el contraste de colores o en sombras hiper difuminadas.
- **Efectos Hover**: Siempre deben incluir una transición suave en opacidad o color (`transition-colors duration-300`).

### Desenfocado Cristalino (Glassmorphism)
- Usado para componentes que "flotan" sobre el contenido principal, especialmente en el Navbar superior.
- Utiliza la clase de Tailwind `backdrop-blur-md` o `backdrop-blur-xl` en conjunto con fondos muy transparentes (ej. `bg-apple-nav` que es rgba al 82%) para que el contenido pase por detrás como si fuera un cristal opaco.

## 🏛️ 4. Uso de Logos Institucionales y "Logo Strip"
- Los logos gubernamentales de la SEP, el Estado de Hidalgo, TecNM y el ITSOEH son visualmente ruidosos (usando banderas, escudos complejos y múltiples tipografías). Si se colocan flotando en el área superior (Header), destruirán por completo el minimalismo Apple-like.
- **Por normativa legal deben existir en el sitio**, por eso **viven unificados en el Footer**. Allí cumplen con la institucionalidad requerida sin comprometer la limpieza de la navegación principal.
- Si debes añadir un logo de academia externa (ej. AWS Academy, Oracle), colócalo en formato SVG de un solo color (preferentemente gris oscuro) en la sección correspondiente de Formación. Nunca los insertes a todo color, ya que compiten por atención con los botones de acción principal.
