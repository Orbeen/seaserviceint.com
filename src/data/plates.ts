import type { PlateVariant } from './services';

/**
 * PHOTOGRAPHY SWAP POINT.
 *
 * The site currently ships generated SVG illustrations, not photographs.
 * This is the single largest content gap and a launch blocker — the site
 * should not go live on illustrations alone.
 *
 * To replace one: drop the file in public/img/ and uncomment its line.
 * Plate.astro then renders an <img> instead of the SVG, reusing the same
 * alt text and aspect box, so no page markup changes and layout cannot
 * shift. Variants convert independently, so partial photography is fine —
 * and each one's "Illustrative placeholder" chip disappears automatically.
 */
export const PLATE_IMAGES: Partial<Record<PlateVariant, string>> = {
  // ship:   '/img/ship-at-sea.jpg',
  // port:   '/img/vessel-alongside.jpg',
  // crew:   '/img/crew-gangway.jpg',
  // supply: '/img/stores-on-quay.jpg',
  // repair: '/img/hull-repair.jpg',
  // clean:  '/img/hull-cleaning.jpg',
  // spares: '/img/machinery-spares.jpg',
  // survey: '/img/hull-survey.jpg',
  // docs:   '/img/containers.jpg',
  // anchor: '/img/vessel-at-anchor.jpg',
};

/**
 * Show the "Illustrative placeholder" chip on placeholder images.
 *
 * Off for the live site so it doesn't advertise itself as a draft to
 * customers. Set to true while reviewing internally to make it obvious at a
 * glance which images are still placeholders.
 *
 * The images themselves are unchanged either way — nothing is passed off as
 * a real photograph, and each one still carries "Illustration of…" alt text
 * for screen readers and search engines.
 */
export const SHOW_PLACEHOLDER_CHIP = false;

/** Descriptive alt text, used by both the SVG and photo branches. */
export const PLATE_LABELS: Record<PlateVariant, string> = {
  ship: 'Illustration of a container vessel at sea',
  port: 'Illustration of a vessel alongside port cranes',
  crew: 'Illustration of a gangway and crew at a vessel',
  supply: 'Illustration of stores on a quay beside a vessel',
  repair: 'Illustration of welding on a steel hull plate',
  clean: 'Illustration of cleaning along a vessel hull',
  spares: 'Illustration of machinery spares beside a vessel',
  survey: 'Illustration of a marine survey inspection of a hull',
  docs: 'Illustration of stacked containers beside a vessel',
  anchor: 'Illustration of a vessel at anchor',
};
