# seaserviceint.com

Website for SeaServe Int., a maritime services company in Chittagong,
Bangladesh — shipping agency, ship supply, crew change, repair and survey
support at Bangladeshi ports.

Built with [Astro](https://astro.build) 7 and Tailwind 4. Static output, no
server runtime, deployed on Netlify.

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + build to dist/
npm run preview  # serve the built output
```

Requires Node 22.12 or newer.

## How it's organised

```
src/
  data/           content lives here, not in markup
    company.ts    contact details, trust claims, drafted copy
    services.ts   all 9 services — drives the 9 service pages
    gallery.ts    gallery items and filter categories
    plates.ts     placeholder-image config and the photo swap point
  components/     Header, Footer, Plate, Form, cards, primitives
  layouts/        BaseLayout — head, SEO, JSON-LD, header/footer
  pages/          one file per route; services/[slug].astro makes 9
  styles/         global.css — design tokens in Tailwind's @theme block
```

17 pages build from this: 15 public routes, plus `/thank-you` and `/404`.

**Adding a service** means adding an entry to `src/data/services.ts`. No
markup needed — the page, nav dropdown, footer list, sitemap entry and
related-service cards all follow from the data. A typo in a `related` slug
fails the build rather than producing a dead link.

## Design tokens

Brand colors, fonts and radii are declared once in the `@theme` block of
`src/styles/global.css`. There is no `tailwind.config.js` — Tailwind 4 is
CSS-first. If one appears, Tailwind 3 was installed by mistake.

Two contrast constraints are binding, both measured:

- **Teal on a pale background is 4.33:1 and fails WCAG AA.** Use
  `text-teal-dark` for teal text on `bg-pale`.
- **Aqua on white is 2.11:1.** Aqua is for rules, accents, card borders and
  focus rings, and for text on navy (6.90:1) — never text on light.

## Forms

Three Netlify forms: `quick-inquiry` (service page sidebars), `contact`, and
`service-request`. Each posts to `/thank-you`, carries a hidden honeypot, and
is named in the markup so Netlify picks it up at deploy.

**Forms do not work locally** — Netlify only processes them on a deployed
site, and form detection must be enabled in the Netlify dashboard *before*
the deploy that should be scanned.

Validation is progressive: `required` and `type="email"` give native
validation with JavaScript off, and JS layers on per-field messages, an error
summary and `aria-invalid`. Conditional fields (crew, supply, spares) are
present in the HTML for every service and merely revealed by JS — injecting
them would hide them from Netlify's parser and break the form without JS.

## Before this site is finished

These are tracked in the spec at
`docs/superpowers/specs/2026-10-14-seaserve-website-design.md` §15.

1. **Photography.** Every image is a generated SVG illustration. Real photos
   drop in by uncommenting entries in `src/data/plates.ts` — one line per
   image, no markup changes, and they can be swapped one at a time.
2. **Trust strip claims.** 24/7/365 availability and a 30-minute response
   time are in `src/data/company.ts` under `TRUST`, flagged unverified. They
   are operational promises; confirm SeaServe can meet them, correct the
   values, or remove `<TrustStrip />` from `src/pages/index.astro`.
3. **Drafted copy.** Mission, values and company history in the `DRAFTED`
   block of `src/data/company.ts` were written for this build, not supplied by
   the client. No certifications, client names, vessel counts or team
   biographies were invented.
4. **Four undescribed services.** Spares, husbandry, export/import and marine
   survey carry `needsConfirmation: true` and show a general enquiry prompt.
   Add real scope and clear the flag.
5. **Contact details.** Taken from the live seaservint.com; worth confirming
   the address, phone and fax are current.
6. **Map coordinates.** `LocalBusiness` structured data omits `geo` rather
   than guessing. Add lat/lng in `BaseLayout.astro` when known.

## Deploying

Netlify builds from `netlify.toml` — no dashboard configuration needed.
Pushing to `main` redeploys.

After the first deploy:

1. Enable **Forms → form detection** in Netlify, then trigger a fresh deploy
   so the three forms register.
2. Set up form notification emails to `office@seaservint.com`.
3. Check for trailing-slash redirect loops between Astro's
   `trailingSlash: 'never'` and Netlify's `pretty_urls`:
   ```bash
   curl -sIL https://seaserviceint.com/about | grep -E 'HTTP/|location'
   ```
   One `200` and no redirect chain is correct.

Note the site domain (`seaserviceint.com`) differs from the company's email
domain (`seaservint.com`). Both are intentional; `site` in
`astro.config.mjs` must match whatever host actually serves the site, or
canonical URLs and the sitemap will point at the wrong place.

## Contributing

Clone over SSH:

```bash
git clone git@github.com:Orbeen/seaserviceint.com.git
```

Pushes to `main` trigger a Netlify deploy. Run `npm run build` before
pushing — it type-checks, and the build fails on a bad `related` slug in
`src/data/services.ts` rather than shipping a dead link.
