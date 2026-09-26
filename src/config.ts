export const site = {
  name: 'FATCAT-3D',
  tagline: 'De la idea al objeto: fabricamos lo que imaginas en 3D.',
  /** Número de WhatsApp con código de país, solo dígitos. EDITA AQUÍ. */
  whatsapp: '573107537360',
  whatsappMessage:
    'Hola FATCAT-3D 👋, quiero cotizar una impresión 3D.',
  instagram: 'https://instagram.com/fatcat3d',
  email: 'contacto@fatcat3d.com',
  /** Puerto publicado en el VPS (nginx dentro del contenedor escucha en 80). */
  port: 3107,
}

export const waLink = () =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`
