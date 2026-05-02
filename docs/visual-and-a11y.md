# Guías de Diseño y Accesibilidad

## 🎨 Guía Visual (Estilo "Apple-like")

El sitio oficial de ITICs está diseñado buscando un aura "Premium", emulando las interfaces modernas minimalistas. Para mantener este estilo, respeta los siguientes principios:

### 1. Sistema de Colores (Definido en `global.css` y `tailwind.config.mjs`)
- **Fondo Base (`--apple-bg`)**: Blanco roto/gris perla (`#fbfbfd`). Nunca blanco puro.
- **Texto Principal (`--apple-text`)**: Negro suave (`#1d1d1f`). Evita el negro `#000000` para reducir fatiga visual.
- **Texto Secundario (`--apple-muted`)**: Gris institucional (`#6e6e73`). Ideal para fechas, etiquetas o subtítulos.
- **Acento Primario (`--apple-blue`)**: Azul institucional moderno (`#0066cc`). Usado en CTAs principales, links hover y delineados.

### 2. Jerarquía Tipográfica
- Usamos la fuente **Inter** provista por Google Fonts (`wght@400;500;600;700;800;900`).
- Se descartó alojar la fuente "Variable" localmente porque alteraba el grosor percibido de los títulos (pesos 800/900). Mantén el link de Google Fonts para garantizar la solidez visual.
- **H1**: Grande, negrita (font-bold/font-black), con *tracking-tight* (letra apretada).
- **Párrafos**: Espaciado generoso (`leading-relaxed`), en color `--apple-muted`.

### 3. Componentes UI Base
- **Cards (Tarjetas)**: Tienen fondos blancos semi-transparentes (`bg-white/80`), bordes muy sutiles (`border-black/5`) y esquinas sumamente redondeadas (`rounded-2xl` o `rounded-3xl`).
- **Botones**: Los botones principales son "Pill-shaped" (`rounded-full`), sin sombras agresivas, confiando en el cambio de color al hacer `:hover`.
- **Blur (Glassmorphism)**: Usado en el Navbar (`backdrop-blur-md bg-apple-nav`) para que el contenido pase por detrás como si fuera un cristal.

### 4. Logos y Cintas (Logo Strip)
- Los logos del ITSOEH, TecNM y la SEP son visualmente ruidosos si se mezclan con el minimalismo. Por eso **viven en el Footer**.
- Si debes añadir un logo de academia (ej. AWS Academy), colócalo en formato SVG monocromático o escala de grises en la sección de Formación, nunca flotando solo en el Home.

---

## ♿ Guía de Accesibilidad (A11y)

Cumplir con las directrices WCAG AA no es opcional, es normativo para sitios institucionales.

1. **Textos Alternativos (`alt=""`)**
   - **Imágenes puramente decorativas** (como el fondo 3D): Deben tener `alt=""` vacío y `aria-hidden="true"`.
   - **Imágenes de información** (Fotos de proyectos, logos): Deben describir el contenido. *Incorrecto: `alt="foto-proyecto"`. Correcto: `alt="Interfaz del sistema IoT diseñado por alumnos"`.

2. **Botones e Íconos**
   - Si un botón es solo un icono de SVG (ej. Botón de Instagram en el footer), DEBE tener un `aria-label="Instagram"` o un `<span class="sr-only">Instagram</span>` dentro.

3. **Navegación por Teclado**
   - El usuario debe poder tabular (`Tab`) a través de todo el sitio.
   - Todos los links y botones deben tener un anillo de enfoque visible. En este proyecto se usa Tailwind: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue/40`.

4. **Contraste de Color**
   - Asegúrate de que el texto gris (`--apple-muted`) nunca se vuelva tan claro que no se pueda leer sobre fondo blanco.
   - No dependas solo del color. Si hay un link externo en el texto, usa la clase `sr-only` para añadir `(abre en nueva pestaña)` al lado.

5. **Semántica HTML**
   - Solo un `<h1>` por página.
   - Las sub-secciones deben usar `<h2>`, y los componentes dentro de ellas `<h3>`. No saltes jerarquías.
