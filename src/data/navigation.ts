/**
 * Configuración de navegación del sitio.
 *
 * Arquitectura:
 * Define las rutas principales que se usan en Navbar y Footer de forma centralizada.
 * En lugar de definir los labels (textos) aquí, se utilizan claves de traducción (`labelKey`).
 * Esto permite que la navegación sea verdaderamente dinámica y dependiente del idioma
 * (i18n) sin tener que duplicar la estructura para es/en/zh.
 */
import type { UiLanguage } from '../i18n/config';

/** 
 * Estructura de un ítem de navegación.
 */
export interface NavItem {
  /** Sufijo de ruta (se concatena dinámicamente con /{lang}). Vacío = home. */
  pathSuffix: string;
  /** Clave de traducción correspondiente en `common.json` bajo el objeto `nav`. */
  labelKey: string;
}

/** 
 * Items de navegación principal en orden de aparición.
 * El orden definido aquí dicta cómo se ven los enlaces en Navbar y Footer.
 */
export const navItems: NavItem[] = [
  { pathSuffix: '',           labelKey: 'nav.home' },
  { pathSuffix: '/formacion', labelKey: 'nav.formation' },
  { pathSuffix: '/unirse',    labelKey: 'nav.join' },
  { pathSuffix: '/proyectos', labelKey: 'nav.projects' },
  { pathSuffix: '/mentores',  labelKey: 'nav.mentors' },
  { pathSuffix: '/about',     labelKey: 'nav.about' },
  { pathSuffix: '/contacto',  labelKey: 'nav.contact' },
];

/** 
 * Genera las rutas de navegación resueltas para un idioma dado.
 * 
 * @param lang - El idioma actual de la UI (es, en, zh)
 * @param tc - Función de traducción cargada con el namespace 'common'
 * @returns Array de objetos listos para renderizarse en componentes visuales.
 */
export function resolveNavItems(lang: UiLanguage, tc: (key: string) => string) {
  return navItems.map(item => ({
    path: `/${lang}${item.pathSuffix}`,
    label: tc(item.labelKey),
  }));
}
