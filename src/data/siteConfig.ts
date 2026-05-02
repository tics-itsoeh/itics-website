/**
 * Configuración centralizada del sitio ITICs ITSOEH.
 *
 * Arquitectura: Single Source of Truth (SSOT).
 * Evita la duplicación de datos volátiles (como el número de WhatsApp, 
 * URLs de redes sociales o fechas de admisión) a lo largo de componentes,
 * layouts y páginas. Cuando el ciclo escolar o un número de contacto
 * cambie, solo se requiere modificar este archivo.
 */

/** 
 * Redes sociales oficiales de ITICs. 
 * TODO: Verificar que el link de TikTok sea el definitivo para el ciclo actual.
 */
export const socialLinks = {
  instagram: 'https://www.instagram.com/itics.itsoeh',
  facebook: 'https://www.facebook.com/ITIC.ITSOEHmx',
  tiktok: 'https://www.tiktok.com/@ing.tics',
  github: 'https://github.com/tics-itsoeh',
} as const;

/** 
 * Datos de contacto oficiales de la carrera.
 * Separados de las redes sociales porque estas vías (teléfono, correo, WhatsApp)
 * representan canales directos de atención para dudas de aspirantes y empresas.
 */
export const contactInfo = {
  phone: '772 139 7096',
  phoneUrl: 'tel:+527721397096',
  whatsapp: '+52 1 773 109 9748',
  whatsappUrl: 'https://wa.me/5217731099748',
  email: 'tics@itsoeh.edu.mx',
  emailUrl: 'mailto:tics@itsoeh.edu.mx',
} as const;

/** 
 * Datos del proceso de admisión vigente.
 * TODO: Actualizar estas fechas y el link del PDF para la convocatoria 2027-2028
 * una vez que control escolar la publique.
 */
export const admission = {
  year: '2026',
  cycle: '2026–2027',
  registerUrl: 'https://fichas.itsoeh.edu.mx/',
  pdfUrl: 'https://www.itsoeh.edu.mx/front/slider-images/docs/Conv_Admisi%C3%B3n_2026-20271.pdf',
} as const;

/** 
 * Identidad institucional — nombres oficiales.
 * Se define explícitamente "Ing. TICs" como shortName por decisión de branding:
 * acorta el nombre completo y facilita la asimilación visual en el header/footer.
 */
export const institution = {
  shortName: 'Ing. TICs',
  programName: 'Ingeniería en Tecnologías de la Información y Comunicaciones',
  campusName: 'Instituto Tecnológico Superior del Occidente del Estado de Hidalgo',
  campusShort: 'ITSOEH',
  system: 'Tecnológico Nacional de México',
  systemShort: 'TecNM',
} as const;

/** 
 * URL base del sitio en producción.
 * Utilizada para la generación estática de etiquetas canonical y OpenGraph SEO.
 * IMPORTANTE: No incluir trailing slash (/) al final.
 */
export const siteUrl = 'https://itics.itsoeh.edu.mx';

