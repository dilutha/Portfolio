import { useEffect } from 'react'
import { absoluteUrl, DEFAULT_OG_IMAGE } from '@/lib/seo'

interface PageMetaOptions {
  title: string
  description: string
  /** Route path, e.g. '/' or '/projects/kapruka-ai-agent'. */
  path: string
  /** Absolute image URL. Falls back to the site-wide OG image. */
  image?: string
  type?: 'website' | 'article'
  /** JSON-LD object(s) specific to this page. Omit for pages with no page-level schema. */
  structuredData?: object | object[]
}

const STRUCTURED_DATA_ID = 'route-structured-data'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets document title, description, canonical URL, Open Graph/Twitter tags,
 * and (optionally) page-specific JSON-LD for the currently mounted route.
 *
 * This is a client-side-only update (no SSR in this Vite SPA), so it's
 * primarily seen by JS-executing crawlers (Google) rather than non-JS bots
 * (social link-preview scrapers) — the homepage's static tags in index.html
 * remain the fallback those bots see everywhere.
 */
export function usePageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
  structuredData,
}: PageMetaOptions) {
  useEffect(() => {
    const url = absoluteUrl(path)
    const ogImage = image ?? DEFAULT_OG_IMAGE

    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(url)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', ogImage)

    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    const existingScript = document.getElementById(STRUCTURED_DATA_ID)
    if (structuredData) {
      const script =
        (existingScript as HTMLScriptElement | null) ??
        Object.assign(document.createElement('script'), {
          type: 'application/ld+json',
          id: STRUCTURED_DATA_ID,
        })
      script.textContent = JSON.stringify(structuredData)
      if (!existingScript) document.head.appendChild(script)
    } else {
      existingScript?.remove()
    }
  }, [title, description, path, image, type, structuredData])
}
