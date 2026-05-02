/**
 * Configuración centralizada del sitio ITICs ITSOEH.
 *
 * Single source of truth para datos de contacto, redes sociales,
 * admisión e identidad institucional. Evita duplicación entre
 * Layout, footer, páginas de contacto y archivos de traducción.
 */

/** Redes sociales oficiales de ITICs. */
export const socialLinks = {
  instagram: 'https://www.instagram.com/itics.itsoeh',
  facebook: 'https://www.facebook.com/ITIC.ITSOEHmx',
  tiktok: 'https://www.tiktok.com/@ing.tics',
  github: 'https://github.com/tics-itsoeh',
} as const;

/** Datos de contacto oficiales de la carrera. */
export const contactInfo = {
  phone: '772 139 7096',
  phoneUrl: 'tel:+527721397096',
  whatsapp: '+52 1 773 109 9748',
  whatsappUrl: 'https://wa.me/5217731099748',
  email: 'tics@itsoeh.edu.mx',
  emailUrl: 'mailto:tics@itsoeh.edu.mx',
} as const;

/** Datos del proceso de admisión vigente. */
export const admission = {
  year: '2026',
  cycle: '2026–2027',
  registerUrl: 'https://fichas.itsoeh.edu.mx/',
  pdfUrl: 'https://www.itsoeh.edu.mx/front/slider-images/docs/Conv_Admisi%C3%B3n_2026-20271.pdf',
} as const;

/** Identidad institucional — nombres oficiales. */
export const institution = {
  shortName: 'Ing. TICs',
  programName: 'Ingeniería en Tecnologías de la Información y Comunicaciones',
  campusName: 'Instituto Tecnológico Superior del Occidente del Estado de Hidalgo',
  campusShort: 'ITSOEH',
  system: 'Tecnológico Nacional de México',
  systemShort: 'TecNM',
} as const;

/** URL base del sitio para canonical y OG (sin trailing slash). */
export const siteUrl = 'https://itics.itsoeh.edu.mx';
