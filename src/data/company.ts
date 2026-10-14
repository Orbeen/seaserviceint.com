/**
 * Company facts, contact details and marketing claims.
 *
 * Contact details below are VERIFIED — taken from the live seaservint.com.
 * The `trust` and `drafted` blocks are NOT. See the warnings on each.
 */

export const COMPANY = {
  name: 'SeaServe Int.',
  legalName: 'SeaServe International',
  tagline: 'Your Trusted Partner for Maritime Services.',
  description:
    'Maritime services for shipowners, charterers, managers and vessel operators, from Chittagong, Bangladesh.',

  // --- Verified from the live site -------------------------------------
  email: 'office@seaservint.com',
  emailAlt: 'seaservint@gmail.com',
  tel: '+880 1617 771507',
  telHref: '+8801617771507',
  fax: '+880 2333 324728',

  address: {
    line1: 'Mabud Chowdhury Center, 5th Floor',
    line2: 'Nur Mia Lane, Fakirhat',
    locality: 'Bandar',
    postalCode: '4100',
    region: 'Chittagong',
    country: 'Bangladesh',
    countryCode: 'BD',
    full: 'Mabud Chowdhury Center, 5th Floor, Nur Mia Lane, Fakirhat, Bandar-4100, Chittagong, Bangladesh',
  },

  ports: ['Chattogram', 'Mongla', 'Payra', 'Matarbari'] as const,
} as const;

/**
 * ⚠️  CLIENT VERIFICATION REQUIRED — DO NOT PUBLISH UNSIGNED-OFF
 *
 * These three claims come from the competitor reference (seaservint.com) and
 * were included at the client's direction. Two are operational commitments
 * SeaServe must actually honour in practice:
 *
 *   availability     "24/7/365"  — is the office genuinely always reachable?
 *   responseMinutes  30          — can a 30-minute reply be met every time?
 *   foundedYear      2012        — stated on the live site; needs confirming
 *
 * To correct one: edit the value here.
 * To remove the whole strip: delete the <TrustStrip /> from src/pages/index.astro.
 */
export const TRUST = {
  foundedYear: 2012,
  availability: '24/7/365',
  responseMinutes: 30,
  verified: false,
} as const;

/**
 * Years in operation, computed at BUILD TIME rather than hardcoded.
 *
 * The live site still says "eight years of experience" — true around 2020,
 * wrong ever since. A computed value cannot go stale that way. (A site left
 * undeployed across a New Year will lag until the next build; add a scheduled
 * Netlify build hook if that matters.)
 */
export const YEARS_OPERATING = new Date().getFullYear() - TRUST.foundedYear;

/**
 * ⚠️  DRAFT-COPY — written for this build, NOT supplied by the client.
 *
 * The prototype left these as bracketed gaps; they were drafted at the
 * client's direction. Each passage stays within what the live site supports
 * and deliberately invents no certifications, client names, vessel counts,
 * team biographies or awards.
 *
 * Every drafted passage is listed here so the client can review them in one
 * place. Search the codebase for DRAFT-COPY to find all usages.
 */
export const DRAFTED = {
  mission:
    'To keep vessels moving. We handle the practical requirements of a port call — agency, supplies, crew, repairs — so masters and operators can keep their attention on the voyage.',

  values: [
    {
      title: 'Answer first',
      body: 'A vessel waiting on an answer is a vessel losing time. We reply, confirm what we can do, and say plainly when we cannot.',
    },
    {
      title: 'Scope honestly',
      body: 'We quote what a job actually requires. Where a requirement falls outside what we handle, we say so rather than stretch to cover it.',
    },
    {
      title: 'One point of contact',
      body: 'Agency, supply, crew and repair coordinated by one team, so nobody has to chase four separate suppliers through a single port call.',
    },
  ],

  history:
    `Operating out of Chittagong since ${TRUST.foundedYear}, SeaServe Int. supports vessel operations at Bangladesh's major seaports. The company began in ship supply and port agency work and has since extended into crew change, repair, cleaning and survey coordination across Chattogram, Mongla, Payra and Matarbari.`,
} as const;
