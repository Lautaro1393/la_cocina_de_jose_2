import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: getSiteUrl(),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${getSiteUrl()}/#menu`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];
}
