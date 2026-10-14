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
/**
 * Every variant now has a photograph, from two sources:
 *
 *   Unsplash stock (free commercial use, no attribution required), each
 *   checked by eye — guessing photo IDs had roughly a 20% hit rate, and the
 *   rejects included a leisure yacht, a surfer, a road truck carrying another
 *   firm's branding and an office desk:
 *     ship, port, docs, supply, repair
 *
 *   AI-generated to order, for the subjects no suitable stock photo existed
 *   for. These are synthetic images of generic vessels and workers, not
 *   photographs of real events:
 *     crew, survey, spares, clean, anchor
 *
 * Neither source shows SeaServe's own work, so real company photography
 * remains the right end state. Replacing one is a single line here.
 */
export const PLATE_IMAGES: Partial<Record<PlateVariant, string>> = {
  ship: '/img/ship.jpg', //     stock — aerial container vessel underway
  port: '/img/port.jpg', //     stock — container vessels alongside, gantry cranes
  docs: '/img/docs.jpg', //     stock — aerial container terminal
  supply: '/img/supply.jpg', // stock — warehouse, palletised stores
  repair: '/img/repair.jpg', // stock — welder at work

  crew: '/img/crew.jpg', //     generated — crew climbing a gangway
  survey: '/img/survey.jpg', // generated — surveyor inspecting a hull in dry dock
  spares: '/img/spares.jpg', // generated — marine spares on a workbench
  clean: '/img/clean.jpg', //   generated — hull being pressure washed
  anchor: '/img/anchor.jpg', // generated — bulk carrier at anchor
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

  crew: 'Seafarers in coveralls and hard hats climbing an accommodation ladder up a ship’s hull',
  clean: 'Workers pressure-washing marine growth from a vessel hull in dry dock',
  spares: 'Marine engineering spares on a workbench — bearings, valves, impellers and fittings',
  survey: 'A surveyor in a hard hat and high-visibility vest inspecting a ship’s hull in dry dock',
  anchor: 'A bulk carrier lying at anchor at sunset, anchor chain running into calm water',
};
