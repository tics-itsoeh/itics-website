# Guía de Contribuciones (Contributing)

¡Gracias por tu interés en contribuir a la página oficial de Ingeniería en Tecnologías de la Información y Comunicaciones (ITICs) del ITSOEH!

Para mantener el código limpio y profesional, hemos definido ciertas reglas sobre cómo interactuar con este repositorio. Ya sea que estés haciendo servicio social escolar o seas un alumno entusiasta aportando un PR, por favor lee estas reglas.

## 🌿 Flujo de Ramas (Git Flow Simplificado)

1. **`main`**: Es la rama de producción. NUNCA se hace push directo a `main` si el cambio implica código o estilos nuevos. Solo se permite push directo para correcciones ortográficas de emergencia o cambios rápidos de fechas en `siteConfig.ts`.
2. **`feature/*`**: Para añadir una nueva funcionalidad (ej. `feature/dark-mode`).
3. **`fix/*`**: Para reparar bugs o errores visuales (ej. `fix/mobile-navbar-overflow`).

## ✍️ Convención de Commits (Conventional Commits)

Exigimos que los mensajes de tus commits sigan el estándar de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Esto nos permite leer el historial y generar Changelogs automáticamente.

El formato básico es: `<tipo>: <descripción corta en inglés o español>`

Tipos permitidos:
- **`feat`**: Una nueva funcionalidad (ej. `feat: add new projects showcase section`).
- **`fix`**: Corrección de un error o bug (ej. `fix: resolve hydration error on mobile footer`).
- **`docs`**: Cambios exclusivos de documentación (ej. `docs: update maintenance guide`).
- **`style`**: Cambios que no afectan el significado del código (espaciado, comas, punto y coma) o retoques muy sutiles de Tailwind.
- **`refactor`**: Cambio de código que ni arregla un bug ni añade una funcionalidad, pero lo mejora.
- **`chore`**: Tareas de mantenimiento general (ej. actualizar una librería de `package.json`).

## 📥 Pasos para hacer un Pull Request (PR)

1. Haz un Fork del repositorio o pide permisos de escritura para crear tu rama.
2. Crea tu rama descriptiva: `git checkout -b feature/novedad`
3. Realiza tus cambios localmente.
4. Antes de hacer commit, corre:
   ```bash
   npm run build
   ```
   **Si tu código hace que Astro lance un error (por ejemplo, porque olvidaste importar un componente o te faltó una traducción en un JSON), tu PR no será aceptado.**
5. Haz tus commits siguiendo la convención:
   ```bash
   git commit -m "feat: implementar buscador de egresados"
   ```
6. Sube tus cambios a GitHub:
   ```bash
   git push origin feature/novedad
   ```
7. Abre un Pull Request en el repositorio original.
8. En la descripción del PR, explica detalladamente QUÉ hiciste y POR QUÉ (adjunta capturas de pantalla si fue un cambio visual).

## ✋ Código de Conducta
- Sé respetuoso con el trabajo anterior.
- No añadas librerías de NPM masivas a menos que sea estrictamente necesario.
- Sigue las reglas de [Estilo Visual Apple-like](visual-guidelines.md) antes de proponer colores nuevos o sombras agresivas.
