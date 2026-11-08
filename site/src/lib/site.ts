import { getCollection, type CollectionEntry } from 'astro:content';

export const CATEGORIES = {
  story: 'Product story',
  ai: 'AI & tech',
  android: 'Android / KMP',
} as const;

// Drafts show while running `npm run dev`, never in the built site.
const visible = (d: { data: { draft: boolean } }) => import.meta.env.DEV || !d.data.draft;

export async function getWork() {
  return (await getCollection('work', visible)).sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts() {
  return (await getCollection('blog', visible)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingMinutes(post: CollectionEntry<'blog'>) {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}
