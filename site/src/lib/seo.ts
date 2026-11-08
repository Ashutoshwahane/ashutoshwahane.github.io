export const SITE = {
  url: 'https://ashutoshwahane.dev',
  name: 'Ashutosh Wahane',
  defaultImage: 'https://ashutoshwahane.dev/og-default.jpg',
};

export const person = {
  '@type': 'Person',
  '@id': 'https://ashutoshwahane.dev/#person',
  name: 'Ashutosh Wahane',
  url: 'https://ashutoshwahane.dev/',
  image: 'https://ashutoshwahane.dev/assets/img/profile.jpg',
  jobTitle: 'Software developer',
  knowsAbout: ['Android', 'Kotlin', 'Kotlin Multiplatform', 'iOS', 'SwiftUI'],
  sameAs: [
    'https://github.com/Ashutoshwahane',
    'https://www.linkedin.com/in/ashutoshwahane/',
    'https://www.instagram.com/ashutoshwahane/',
  ],
};

export const website = {
  '@type': 'WebSite',
  '@id': 'https://ashutoshwahane.dev/#website',
  url: 'https://ashutoshwahane.dev/',
  name: 'Ashutosh Wahane',
  publisher: { '@id': 'https://ashutoshwahane.dev/#person' },
};

export const ld = (...nodes: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
