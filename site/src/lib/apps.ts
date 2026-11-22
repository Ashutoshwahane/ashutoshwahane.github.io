import { getWork } from './site';

// The app from this week's Instagram reels. Change this one line when the push changes.
export const FEATURED_APP = 'glasspad';

// Tiles shown before "Show all" once the grid gets long.
export const SHOW_FIRST = 6;

export async function getApps() {
  const apps = (await getWork()).filter((w) => w.data.apps);
  const featured = apps.find((a) => a.id === FEATURED_APP) ?? apps[0];
  return { featured, rest: apps.filter((a) => a !== featured) };
}
