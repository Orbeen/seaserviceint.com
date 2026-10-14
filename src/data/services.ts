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

/**
 * A question a vessel operator actually asks before engaging a service.
 *
 * Answers draw on standard maritime practice (IMPA/ISSA store categories,
 * port-call document flow, crew-change sequencing) rather than claims about
 * SeaServe specifically. Anything SeaServe-specific that could not be
 * verified was left out rather than invented — see DRAFTED in company.ts.
 */
export interface ServiceFaq {
  question: string;
  answer: string;
}

/** A stage in how the service typically runs. */
export interface ProcessStep {
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
  /** Extra prose shown under the overview. Industry practice, not claims. */
  detail?: string[];
  process?: ProcessStep[];
  faqs?: ServiceFaq[];
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
    detail: [
      'A port call runs on paperwork and timing. Before a vessel arrives, the agent files the pre-arrival notice with port control, lodges crew and cargo documentation with customs and immigration, and books the berth, pilot and tugs against the vessel’s ETA. Get the sequence wrong and the vessel waits at anchorage while costs accrue.',
      'During the call, the agent is the master’s point of contact ashore: arranging launch boats, clearing stores and spares through customs, handling cash to master, coordinating surveyors and class attendance, and keeping owners and charterers updated as operations progress.',
      'On departure, outward clearance, port disbursements and the final statement of facts close the call. A disbursement account sets out what was spent and why, which is what owners audit afterwards.',
    ],
    process: [
      {
        title: 'Pre-arrival',
        description:
          'ETA received, berth and pilot booked, pre-arrival documents lodged with port, customs and immigration.',
      },
      {
        title: 'Arrival and berthing',
        description:
          'Boarding on arrival, free pratique and inward clearance, cargo operations begin.',
      },
      {
        title: 'During the call',
        description:
          'Stores and spares cleared, crew changes handled, surveys attended, owners updated.',
      },
      {
        title: 'Departure',
        description:
          'Outward clearance, statement of facts, and the disbursement account to owners.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between a port agent and an owner’s protective agent?',
        answer:
          'Under many charter parties the charterer nominates the port agent, who then acts for the charterer’s interests. An owner’s protective agent (OPA) is appointed separately by the shipowner to watch the call on the owner’s behalf — verifying laytime and statements of facts, checking disbursements, and reporting independently. Owners commonly appoint an OPA where the nominated agent is charterer-controlled.',
      },
      {
        question: 'What information does an agent need before arrival?',
        answer:
          'Typically the vessel’s particulars and certificates, ETA, crew list with passport details, cargo manifest or stowage plan, last port of call, and any stores, spares, crew change or survey requirements for the call. The earlier these arrive, the more can be arranged before the vessel does.',
      },
      {
        question: 'Which ports in Bangladesh do you cover?',
        answer:
          'Chattogram, Mongla, Payra and Matarbari. Chattogram handles the majority of the country’s container traffic; Mongla serves the southwest; Payra and Matarbari are newer deep-sea developments.',
      },
      {
        question: 'How are port disbursements handled?',
        answer:
          'A proforma disbursement account is normally issued before arrival so owners can fund the call, with a final account afterwards setting out actual costs against receipts. Ask for the proforma early if the call involves unusual cargo or an extended stay.',
      },
    ],
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
    detail: [
      'A crew change has to line up three things that rarely move together: the vessel’s berthing window, immigration clearance for joiners and leavers, and flights. Miss one and the others unravel — a delayed berth can strand a signed-off crew member in a hotel for days, or leave a joiner’s visa expiring before boarding.',
      'The documentation runs ahead of the people. Joiners normally need a valid passport, seafarer’s identity document, a letter of guarantee or employment from the owner or manager, and a visa where their nationality requires one. Leavers need their discharge book endorsed and onward travel confirmed before immigration will clear them off.',
      'Where a sign-off is medical or a joiner misses a connection, the plan has to change within hours. That is normally handled by holding the paperwork ready for both outcomes rather than committing to one.',
    ],
    process: [
      {
        title: 'Requirement received',
        description:
          'Crew list, ranks, nationalities, joining or leaving port, and the vessel’s ETA window.',
      },
      {
        title: 'Documents and visas',
        description:
          'Immigration submissions prepared, visa requirements checked by nationality, letters of guarantee issued.',
      },
      {
        title: 'Travel and transfer',
        description:
          'Flights matched to the berthing window, hotel where required, transfer between airport and vessel.',
      },
      {
        title: 'Boarding and clearance',
        description:
          'Joiners cleared aboard, leavers signed off and cleared through immigration for onward travel.',
      },
    ],
    faqs: [
      {
        question: 'How much notice do you need for a crew change?',
        answer:
          'More notice means more options on flights and visas, and less exposure if the berthing window moves. Nationalities that require a visa are the usual constraint, since processing time is outside anyone’s control — send the crew list as soon as the change is planned rather than when the ETA firms up.',
      },
      {
        question: 'What documents do joining crew need?',
        answer:
          'Generally a valid passport, a seafarer’s identity document or seaman’s book, a letter of guarantee or employment from the owner or manager, and a visa if required for their nationality. Requirements vary by nationality and by port, so confirm the specific crew list rather than assuming.',
      },
      {
        question: 'Can crew changes happen at anchorage?',
        answer:
          'In many cases yes, by launch boat, though it depends on the port, the anchorage conditions and immigration’s agreement. It is normally arranged where a vessel is not berthing or the berthing window is too short for a shore transfer.',
      },
      {
        question: 'What happens if a flight is missed or the vessel is delayed?',
        answer:
          'Both are routine. The usual answer is to hold accommodation and rebook travel against the revised window, and to keep immigration informed so clearances do not lapse. This is why crew changes are quoted against a window rather than a fixed date.',
      },
    ],
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
    detail: [
      'Ship supply runs on standard catalogues. Most provision and store requisitions are built against the IMPA or ISSA coding systems, which give every item a number so a chief steward in one country and a supplier in another are certain they mean the same thing. Sending a requisition with IMPA codes removes most of the guesswork from a quotation.',
      'Provisions are the time-critical part. Fresh items have to reach the vessel in condition and within the berthing window, which means cold-chain handling and delivery timed to the call rather than to the order date. Dry and bonded stores are less sensitive but bonded items move under customs seal and need the paperwork to match the manifest exactly.',
      'Technical stores — deck, engine, electrical and cabin — are usually ordered against the vessel’s own inventory system. Where an item is unavailable locally, the practical options are a substitute of equivalent specification, or sourcing it in for a later call.',
    ],
    process: [
      {
        title: 'Requisition received',
        description:
          'Order against IMPA or ISSA codes where available, with the vessel’s ETA and berth.',
      },
      {
        title: 'Quotation',
        description:
          'Priced against the requisition, with substitutes proposed where an item is not available locally.',
      },
      {
        title: 'Sourcing and customs',
        description:
          'Items gathered, bonded stores documented, delivery timed to the berthing window.',
      },
      {
        title: 'Delivery aboard',
        description:
          'Stores delivered and checked against the requisition, with receipted documentation to the master.',
      },
    ],
    faqs: [
      {
        question: 'Do you supply against IMPA and ISSA codes?',
        answer:
          'Requisitions built on IMPA or ISSA codes are the clearest way to order, because the code fixes the specification. Where a requisition has no codes, it can still be quoted from descriptions, but expect more back-and-forth to confirm exactly what is meant.',
      },
      {
        question: 'How far in advance should provisions be ordered?',
        answer:
          'Fresh provisions are best ordered once the berthing window is reasonably firm, since they are delivered against the call rather than held. Dry, bonded and technical stores can be prepared earlier. Sending the requisition early costs nothing and gives time to propose substitutes for anything unavailable.',
      },
      {
        question: 'What are bonded stores and how are they handled?',
        answer:
          'Bonded stores are duty-free items for consumption aboard — typically tobacco, alcohol and some provisions. They move under customs control, so quantities must match the declared manifest and are sealed until the vessel sails. Discrepancies between the delivery and the declaration are the usual cause of delay.',
      },
      {
        question: 'Can you deliver to a vessel at anchorage?',
        answer:
          'Generally yes, by launch, subject to port permission and conditions at the anchorage. It is common where a vessel is not berthing or where the berth time is too short to complete a delivery alongside.',
      },
    ],
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
