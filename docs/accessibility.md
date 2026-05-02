# Guía de Accesibilidad Web (a11y)

Cumplir con las directrices de Accesibilidad Web (WCAG - Web Content Accessibility Guidelines, Nivel AA) no es una opción estética, sino **un requisito técnico y ético indispensable** para plataformas educativas institucionales. El sitio web de ITICs debe poder ser navegado y comprendido por usuarios con discapacidades visuales o motoras.

Cualquier nuevo componente que se añada al código debe respetar las siguientes normas.

## 🖼️ 1. Alternativas de Texto (`alt=""`)

Los lectores de pantalla (como JAWS, NVDA o VoiceOver) dependen del atributo `alt` de las imágenes (`<img>`) para narrarle a una persona invidente lo que está viendo.

- **Imágenes de Contenido (Aportan información)**:
  - Como fotos de proyectos de estudiantes, logotipos oficiales o infografías.
  - **Deben tener una descripción explícita y contextual.**
  - ❌ *Incorrecto*: `alt="imagen1"` o `alt="foto-proyecto"`.
  - ✅ *Correcto*: `alt="Interfaz del sistema IoT agrícola diseñado por alumnos del 8vo semestre"`.
- **Imágenes Decorativas (No aportan información)**:
  - Como el fondo 3D, divisores visuales de sección o íconos estéticos.
  - **DEBEN tener el atributo alt vacío** y declarar que se escondan del árbol de accesibilidad. Si no lo haces, el lector de pantalla leerá el nombre crudo del archivo (ej: "leerá *img-bg-002-final.webp*").
  - ✅ *Correcto*: `<img src="fondo.svg" alt="" aria-hidden="true" />`

## ⌨️ 2. Navegación Exclusiva por Teclado

El sitio debe ser 100% navegable sin el uso de un mouse o touchpad, empleando únicamente las teclas direccionales, el tabulador (`Tab`) y la tecla de espacio/enter.

- **Orden del DOM**: El flujo visual debe coincidir con el flujo del código HTML.
- **Anillos de Enfoque (Focus Rings)**: Nunca elimines el `outline` sin proporcionar un reemplazo claro. Todos los links (`<a>`) y botones (`<button>`) deben resaltar claramente cuando el usuario los selecciona con el tabulador.
- En este proyecto, usamos un estilo azul y elegante de Tailwind para marcar el enfoque activo: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue/40`. 
- Asegúrate de agregar estas clases a cualquier botón nuevo que crees.

## 🔤 3. Contraste de Color y Dependencia Visual

- **Contraste Mínimo**: Asegúrate de que el texto gris (`text-apple-muted`) nunca se reduzca en opacidad hasta el punto de que sea ilegible contra el fondo blanco o gris claro. El ratio de contraste mínimo esperado es de `4.5:1`.
- **No Depender Solo del Color**: Si el color es la única forma de transmitir un mensaje (por ejemplo, si los links fuesen azules pero sin subrayado en una pared de texto negro), los usuarios con daltonismo pueden perderse información crítica.
- **Indicadores SR-Only para Redirecciones Ocultas**: Si un enlace abre una nueva pestaña del navegador (`target="_blank"`), puede ser desorientador para usuarios de lectores de pantalla. Debemos avisarles añadiendo un texto invisible a la vista pero audible.
  - ✅ *Correcto*:
    ```html
    <a href="https://github.com/..." target="_blank" rel="noopener">
      Ver repositorio <span class="sr-only">(abre en nueva pestaña)</span>
    </a>
    ```

## 🏷️ 4. Etiquetas ARIA (Accessible Rich Internet Applications)

Las etiquetas ARIA dotan de semántica a elementos visuales que para las máquinas no significan nada (como íconos SVGs sueltos).

- **Botones con Íconos Solos**: Si creas un botón que solo tiene un ícono dentro (como el menú de hamburguesa en móvil o el link de Instagram en el footer), el botón DEBE tener la propiedad `aria-label` descriptiva.
  - ❌ *Incorrecto*: `<button><svg>...</svg></button>`
  - ✅ *Correcto*: `<button aria-label="Abrir menú de navegación"><svg>...</svg></button>`
- **Menús Desplegables**: Los botones que abren menús (como el selector de idiomas en el Navbar) implementan el patrón `aria-expanded="false"` o `"true"`, así como `aria-controls`, para informar al dispositivo si hay contenido oculto desplegado o no.

## 🏗️ 5. Semántica HTML Estricta

Un diseño hermoso no justifica un HTML desastroso. El orden semántico ayuda a las herramientas de análisis SEO y accesibilidad a armar un esquema lógico del sitio.

- **Jerarquía de Encabezados (Heading Hierarchy)**:
  - Solo debe existir **UN (1) único elemento `<h1>`** por página. Si la página es "Mentores", el `<h1>` será "Nuestra Comunidad".
  - Las sub-secciones principales del contenido deben descender de manera estricta usando `<h2>`, y los componentes anidados dentro de esas sub-secciones usarán `<h3>`.
  - **Nunca te saltes niveles semánticos** (no pases de un `H1` a un `H4` solo porque el tamaño de la letra del H4 "se ve más bonito"). Controla el tamaño visual mediante clases de CSS, no usando un tag de encabezado incorrecto.
