import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'

const config = useRuntimeConfig();
const directusUrl = config.public.directusUrl;

export default defineSitemapEventHandler(async () => {
  const client = createDirectus(directusUrl).with(rest());
  
  const pages = await client.request(
    readItems('pages',{
      filter: {
        _and: [
          {
            status: {
              _eq: 'published'
            },
            seo: {
              no_index: {
                _eq: false
              }
            },
            slug: {
              _nin: ['startseite']
            }
          }
        ]
      },
      fields: ['slug', 'date_updated'],
    }));

  const sitemapUrls: SitemapUrlInput[] = pages.map(page => ({
    // Transform external URL to your domain
    loc: page.slug, // NOT page.link
    lastmod: page.date_updated,
    changefreq: 'weekly',
    priority: 0.7,
  }))
  
  return sitemapUrls
})