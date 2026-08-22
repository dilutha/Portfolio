export const SITE_URL = 'https://dilutha.vercel.app'
export const SITE_NAME = 'Dilutha Weerasinghe'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
