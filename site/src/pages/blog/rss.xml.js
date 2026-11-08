import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => b.data.date - a.data.date);
  return rss({
    title: 'Ashutosh Wahane — Writing',
    description: 'Product stories, AI notes, and Android and Kotlin Multiplatform write-ups.',
    site: context.site,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/blog/${p.id}/` })),
  });
}
