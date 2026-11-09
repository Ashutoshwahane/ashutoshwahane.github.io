import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    status: z.enum(['live', 'beta', 'building']),
    statusLabel: z.string(),
    platformsShort: z.string(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    features: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    theme: z.enum(['glass', 'night', 'sand']),
    icon: z.string().optional(),
    screenshot: z.string().optional(),
    screenshotAlt: z.string().optional(),
    image: z.string().optional(),
    website: z.string().url().optional(),
    primaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
    secondaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['story', 'ai', 'android']),
    product: reference('work').optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, blog };
