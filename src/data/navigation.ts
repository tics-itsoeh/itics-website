/**
 * Configuración de navegación del sitio.
 *
 * Define las rutas principales que se usan en Navbar y Footer.
 * Los labels se resuelven vía i18n en tiempo de render.
 */
import type { UiLanguage } from '../i18n/config';

/** Clave de traducción en common.json para cada item de navegación. */
export interface NavItem {
  /** Sufijo de ruta (se concatena con /{lang}). Vacío = home. */
  pathSuffix: string;
  /** Clave en common.json bajo nav.* */
  labelKey: string;
}

/** Items de navegación principal en orden de aparición. */
export const navItems: NavItem[] = [
  { pathSuffix: '',           labelKey: 'nav.home' },
  { pathSuffix: '/formacion', labelKey: 'nav.formation' },
  { pathSuffix: '/unirse',    labelKey: 'nav.join' },
  { pathSuffix: '/proyectos', labelKey: 'nav.projects' },
  { pathSuffix: '/mentores',  labelKey: 'nav.mentors' },
  { pathSuffix: '/contacto',  labelKey: 'nav.contact' },
];

/** Genera las rutas de navegación resueltas para un idioma dado. */
export function resolveNavItems(lang: UiLanguage, tc: (key: string) => string) {
  return navItems.map(item => ({
    path: `/${lang}${item.pathSuffix}`,
    label: tc(item.labelKey),
  }));
}
