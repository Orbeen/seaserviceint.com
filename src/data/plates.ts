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
  // Stock photography (Unsplash License — free commercial use, no attribution
  // required). Each was checked by eye before use: guessing photo IDs has a
  // ~20% hit rate, and the rejects included a leisure yacht, a surfer, a
  // road truck carrying another firm's branding, and an office desk.
  //
  // These show OTHER companies' vessels and facilities. Replace with real
  // SeaServe photography when available — that is still the right end state.
  ship: '/img/ship.jpg', //   aerial container vessel underway, pilot boat alongside
  port: '/img/port.jpg', //   container vessels alongside, gantry cranes
  docs: '/img/docs.jpg', //   aerial container terminal
  supply: '/img/supply.jpg', // warehouse, palletised stores
  repair: '/img/repair.jpg', // welder at work

  // Still illustrations — no suitable free photo found for these subjects:
  // crew (gangway/crew change), clean (hull cleaning), spares (machinery
  // spares), survey (hull inspection), anchor (vessel at anchorage).
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

/**
 * Alt text. Photo variants describe the photograph; the rest say
 * "Illustration of…" so nothing is passed off as a photo of real work.
 * Keep these in step with PLATE_IMAGES above.
 */
export const PLATE_LABELS: Record<PlateVariant, string> = {
  ship: 'A container vessel underway at sea, seen from above, with a pilot boat alongside',
  port: 'Container vessels alongside a terminal quay beneath ship-to-shore gantry cranes',
  docs: 'A container terminal from above, with stacked containers and yard cranes',
  supply: 'Palletised stores on racking in a supply warehouse',
  repair: 'A welder working on steel, sparks flying from the arc',

  crew: 'Illustration of a gangway and crew at a vessel',
  clean: 'Illustration of cleaning along a vessel hull',
  spares: 'Illustration of machinery spares beside a vessel',
  survey: 'Illustration of a marine survey inspection of a hull',
  anchor: 'Illustration of a vessel at anchor',
};
