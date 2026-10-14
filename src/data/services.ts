/**
 * The nine services. All nine service pages generate from this file plus
 * one template (src/pages/services/[slug].astro) — adding a tenth service
 * means adding an entry here, not writing markup.
 *
 * Copy is carried from the approved prototype, which in turn took it from
 * the live seaservint.com. Where the live site names a service without
 * describing it, `needsConfirmation` is true and the page renders a notice
 * rather than inventing scope.
 */

export type PlateVariant =
  | 'ship'
  | 'port'
  | 'crew'
  | 'supply'
  | 'repair'
  | 'clean'
  | 'spares'
  | 'survey'
  | 'docs'
  | 'anchor';

/** Extra request-form fields triggered by the selected service. */
export type ConditionalKind = 'crew' | 'supply' | 'spares';

export interface ServiceSubItem {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Card text and meta description. Keep ≤155 chars for SEO. */
  shortDescription: string;
  /** Hero lede on the service page. */
  intro: string;
  /** Overview section heading. */
  heading: string;
  /** Overview section body. */
  body: string;
  heroVariant: PlateVariant;
  /** Pill tags on the /services index rows. */
  tags: string[];
  subItemsTitle: string;
  subItems: ServiceSubItem[];
  /** Live site names this service without describing it — show a notice. */
  needsConfirmation: boolean;
  /** Exactly 3 sibling slugs. Asserted at build time. */
  related: string[];
  conditional?: ConditionalKind;
}

export const SERVICES: readonly Service[] = [
  {
    slug: 'shipping-agents',
    title: 'Shipping Agents',
    shortDescription:
      'Port agency, owner’s protective agency, husbandry and marine survey support for owners, charterers, managers and operators.',
    intro:
      'Reliable and professional port agency, owner’s protective agency, husbandry, crew change and marine survey services for shipowners, charterers, managers and operators.',
    heading: 'Agency support for your vessel’s port call',
    body: 'Our agency team coordinates the port-side requirements of a vessel’s call, drawing on SeaServe’s wider supply, crew and repair services.',
    heroVariant: 'port',
    tags: ['Port Agency', 'OPA', 'Husbandry', 'Crew Change', 'Marine Survey'],
    subItemsTitle: 'Agency services',
    subItems: [
      { title: 'Port Agency', description: 'Agency coordination for your vessel’s port call.' },
      {
        title: 'OPA / Owner’s Protective Agency',
        description: 'Protective agency support on behalf of the shipowner.',
      },
      { title: 'Husbandry Services', description: 'Husbandry support during the port call.' },
      { title: 'Crew Change', description: 'Crew sign on and sign off support.' },
      { title: 'Marine Survey Services', description: 'Survey services arranged through SeaServe.' },
    ],
    needsConfirmation: false,
    related: ['crew-sign-on-off', 'ship-husbandry', 'marine-survey'],
  },
  {
    slug: 'crew-sign-on-off',
    title: 'Crew Sign On / Off',
    shortDescription:
      'Crew change support through every step, at Chattogram, Mongla, Payra and Matarbari.',
    intro:
      'Comprehensive crew change services at all major Bangladeshi seaports, with support through every step of the process.',
    heading: 'Crew sign on and sign off support',
    body: 'SeaServe supports crew changes from start to finish. Crew change support is offered at the following ports.',
    heroVariant: 'crew',
    tags: ['Chattogram', 'Mongla', 'Payra', 'Matarbari'],
    subItemsTitle: 'Ports served',
    subItems: [
      { title: 'Chattogram', description: 'Crew sign on / off support.' },
      { title: 'Mongla', description: 'Crew sign on / off support.' },
      { title: 'Payra', description: 'Crew sign on / off support.' },
      { title: 'Matarbari', description: 'Crew sign on / off support.' },
    ],
    needsConfirmation: false,
    related: ['shipping-agents', 'ship-husbandry', 'general-ship-supply'],
    conditional: 'crew',
  },
  {
    slug: 'general-ship-supply',
    title: 'General Ship Supply',
    shortDescription:
      'Fresh provisions, bonded, deck, engine, electrical and cabin stores, matched to each vessel.',
    intro:
      'A comprehensive range of fresh provisions, bonded stores, deck, engine and electrical stores, cabin supplies and general marine supplies.',
    heading: 'Ship supplies matched to each vessel',
    body: 'Supplies are adjusted to the requirements of each vessel. Tell us what is needed and we will coordinate it.',
    heroVariant: 'supply',
    tags: ['Fresh Provisions', 'Bonded Stores', 'Deck', 'Engine', 'Electrical', 'Cabin Supplies'],
    subItemsTitle: 'Supply categories',
    subItems: [
      { title: 'Fresh Provisions', description: 'Provisions for the crew’s galley.' },
      { title: 'Bonded Stores', description: 'Bonded items for onboard use.' },
      { title: 'Deck Stores', description: 'Stores for deck department needs.' },
      { title: 'Engine Stores', description: 'Stores for engine room needs.' },
      { title: 'Electrical Stores', description: 'Electrical items for the vessel.' },
      { title: 'Cabin Supplies', description: 'Supplies for crew and officer cabins.' },
      { title: 'General Marine Supplies', description: 'Other marine supplies to your requirement.' },
    ],
    needsConfirmation: false,
    related: ['ship-spares', 'general-repair', 'shipping-agents'],
    conditional: 'supply',
  },
  {
    slug: 'general-repair',
    title: 'General Repair',
    shortDescription:
      'Mobile repair crews of mechanical fitters, steelworkers, pipefitters and electricians.',
    intro:
      'Mobile repair crews of highly qualified, experienced mechanical fitters, steelworkers, pipefitters and electricians.',
    heading: 'Mobile repair crews for your vessel',
    body: 'SeaServe’s repair support is delivered by mobile crews that attend the vessel.',
    heroVariant: 'repair',
    tags: ['Mechanical Fitters', 'Steelworkers', 'Pipefitters', 'Electricians'],
    subItemsTitle: 'Repair trades',
    subItems: [
      { title: 'Mechanical Fitters', description: 'Part of SeaServe’s mobile repair crews.' },
      { title: 'Steelworkers', description: 'Part of SeaServe’s mobile repair crews.' },
      { title: 'Pipefitters', description: 'Part of SeaServe’s mobile repair crews.' },
      { title: 'Electricians', description: 'Part of SeaServe’s mobile repair crews.' },
    ],
    needsConfirmation: false,
    related: ['ship-spares', 'cleaning-solutions', 'marine-survey'],
  },
  {
    slug: 'cleaning-solutions',
    title: 'Cleaning Solutions',
    shortDescription:
      'Sourcing, delivery and management of cleaning work to support your port calls.',
    intro:
      'A complete range of services to support your port calls, including the sourcing, delivery and management of cleaning work.',
    heading: 'Cleaning support for port calls',
    body: 'SeaServe supports your port calls with cleaning solutions from sourcing through to management of the work.',
    heroVariant: 'clean',
    tags: ['Sourcing', 'Delivery', 'Management'],
    subItemsTitle: 'What is covered',
    subItems: [
      { title: 'Sourcing', description: 'Sourcing of the cleaning services you need.' },
      { title: 'Delivery', description: 'Delivery of the services to your vessel.' },
      { title: 'Management', description: 'Management of cleaning operations.' },
    ],
    needsConfirmation: false,
    related: ['general-repair', 'general-ship-supply', 'ship-husbandry'],
  },
  {
    slug: 'ship-spares',
    title: 'Ship Spares',
    shortDescription: 'Ship spares available through SeaServe’s vessel supply support.',
    intro: 'Ship spares available through SeaServe alongside its vessel supply and repair support.',
    heading: 'Spares for your vessel',
    body: 'Ship spares are listed among SeaServe’s services. Send us the part details and we will review your requirement.',
    heroVariant: 'spares',
    tags: [],
    subItemsTitle: '',
    subItems: [],
    needsConfirmation: true,
    related: ['general-ship-supply', 'general-repair', 'export-import'],
    conditional: 'spares',
  },
  {
    slug: 'ship-husbandry',
    title: 'Ship Husbandry Services',
    shortDescription:
      'Husbandry support for vessels during port calls, offered with SeaServe’s agency services.',
    intro: 'Husbandry services offered as part of SeaServe’s shipping agency support.',
    heading: 'Husbandry support during the port call',
    body: 'SeaServe provides OPA / husbandry services within its agency work for owners, charterers, managers and operators.',
    heroVariant: 'anchor',
    tags: [],
    subItemsTitle: '',
    subItems: [],
    needsConfirmation: true,
    related: ['shipping-agents', 'crew-sign-on-off', 'marine-survey'],
  },
  {
    slug: 'export-import',
    title: 'Export & Import',
    shortDescription: 'Export and import support for shipping and marine businesses.',
    intro: 'Export and import services offered by SeaServe.',
    heading: 'Export and import support',
    body: 'Export and import are listed among SeaServe’s services for shipping and marine businesses.',
    heroVariant: 'docs',
    tags: [],
    subItemsTitle: '',
    subItems: [],
    needsConfirmation: true,
    related: ['general-ship-supply', 'ship-spares', 'shipping-agents'],
  },
  {
    slug: 'marine-survey',
    title: 'Marine Survey Services',
    shortDescription:
      'Marine survey services offered alongside SeaServe’s shipping agency work.',
    intro: 'Marine survey services offered through SeaServe’s shipping agency work.',
    heading: 'Marine survey support',
    body: 'SeaServe lists marine survey services alongside port agency, husbandry and crew change.',
    heroVariant: 'survey',
    tags: [],
    subItemsTitle: '',
    subItems: [],
    needsConfirmation: true,
    related: ['shipping-agents', 'general-repair', 'ship-husbandry'],
  },
];

export const SERVICE_BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]));

/** 11 options, matching the prototype: blank + 9 services + "other". */
export const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  ...SERVICES.map((s) => ({ value: s.slug, label: s.title })),
  { value: 'other', label: 'Other / not sure yet' },
];

/**
 * Build-time integrity check: a typo in `related` becomes a build failure
 * rather than a dead card on a live page.
 */
for (const s of SERVICES) {
  if (s.related.length !== 3) {
    throw new Error(`[services] "${s.slug}" must have exactly 3 related slugs, has ${s.related.length}`);
  }
  if (s.related.includes(s.slug)) {
    throw new Error(`[services] "${s.slug}" lists itself as related`);
  }
  for (const r of s.related) {
    if (!SERVICES.some((x) => x.slug === r)) {
      throw new Error(`[services] "${s.slug}" relates to unknown slug "${r}"`);
    }
  }
}
