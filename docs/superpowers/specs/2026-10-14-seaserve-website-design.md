# SeaServe Int. Website — Design Spec

**Date:** 2026-10-14
**Status:** Approved for planning
**Repo:** `C:\dev\seaserviceint.com` (greenfield — repo was empty)

---

## 1. Context

SeaServe Int. is a maritime services company in Chittagong, Bangladesh, serving
shipowners, charterers, ship managers and vessel operators. Its current live
site, `seaservint.com`, displays "Site Under construction, Coming Soon…",
carries placeholder images, has empty Skype and YouTube links, and states "eight
years of experience" — copy written around 2020 and never updated.

A 15-page design prototype was produced as a Claude Design canvas
(`claude.ai/artifact/BDuEnzkmT13cWosH4wcwVQ`, "SeaServe Int. Website
Prototype"). It is complete and internally consistent: 15 page artboards plus
five shared components, full copy, a defined palette, and working form logic.

**This project builds that prototype as a real, deployable website.**

**Intended outcome:** a production static site that replaces the
under-construction page, presents all nine services with their own indexable
pages, and converts visitor inquiries into email that reaches SeaServe's inbox.

### Why rebuild rather than restyle the existing site

The live site is not a functioning site to improve — it is a placeholder. There
is nothing to preserve. The prototype also goes materially further than the
competitor reference in three ways worth keeping:

- **Nine dedicated service pages** instead of one combined services list, each
  separately indexable and linkable.
- **A structured request form** that captures vessel name, vessel type, port and
  service type, so an inquiry arrives actionable rather than as free text.
- **Honest content boundaries** — the prototype marks unverified claims and
  missing copy instead of inventing them.

---

## 2. Success criteria

1. All 15 pages render as static HTML, responsive from 320px to 1920px.
2. The nine service pages generate from one template and one data file — adding
   a tenth service means editing data only, not markup.
3. Contact and request forms deliver to SeaServe's inbox, with spam filtering.
4. Lighthouse ≥ 95 on Performance, Accessibility, Best Practices and SEO for the
   home and a service page.
5. Keyboard-only navigation reaches every interactive element, with a visible
   focus indicator throughout.
6. Every unverified claim and every drafted passage of copy is traceable to one
   file, so the client can check it before launch.
7. The site deploys from a git push with no manual build step.

---

## 3. Architecture

### Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Astro 7, static output | Ships zero JS by default; the nine service pages come from one dynamic route |
| Styling | Tailwind 4 | CSS-first `@theme` config; brand tokens defined once |
| Forms | Netlify Forms | No backend code; built-in spam filtering; submissions emailed |
| Hosting | Netlify | Static CDN, free tier, forms included, deploy on push |
| JS | Vanilla, in `<script>` tags | Three small interactions do not justify a framework runtime |

Astro was chosen over plain HTML because the prototype's structure is already
component-shaped — a header, footer, form and service template reused across 15
pages. Hand-written HTML would duplicate the header and footer fifteen times,
making every nav change a fifteen-file edit. It was chosen over Next.js because
there is no application behavior here: no auth, no dashboard, no server state.

### Rendering model

All pages are prerendered at build time. There is no server runtime. The three
client-side interactions are progressive enhancements over working HTML:

| Interaction | Implementation | Without JS |
|---|---|---|
| Mobile nav | `<script>` toggling `aria-expanded` and a class | Nav links remain in the DOM, reachable |
| Services dropdown | CSS `:hover` / `:focus-within`, as the prototype had it | Works — it is CSS, not JS |
| Gallery filter | `<script>` toggling `hidden` and `aria-pressed` | All 10 items shown unfiltered |
| Form conditional fields | `<script>` revealing fields on service change | All fields visible, form still submits |

Form validation is HTML-native (`required`, `type="email"`) with JS layering on
the prototype's per-field messages and error summary. A form with JS disabled
still validates and still submits.

---

## 4. Design system

Taken from the prototype verbatim. These are the source of truth.

### Color

| Token | Hex | Use |
|---|---|---|
| `navy` | `#082B45` | Dark sections, headings, footer |
| `teal` | `#087E8B` | Primary buttons, links, eyebrow rules |
| `teal-dark` | `#066772` | Primary button hover |
| `aqua` | `#36C6BB` | Accents, focus ring, dark-section eyebrows |
| `pale` | `#EAF5F7` | Alternating section background |
| `border` | `#D3E6EA` | Card and divider borders |
| `ink` | `#273844` | Body text |
| `muted` | `#4A5F6C` | Secondary text, field hints |
| `on-navy` | `#C9E0E6` | Body text on navy |
| `on-navy-bright` | `#DCEEF1` | Lede text on navy |
| `error` / `error-bg` | `#B3261E` / `#FDECEA` | Field errors |

### Contrast — measured, not estimated

| Pair | Ratio | AA normal | Note |
|---|---|---|---|
| `ink` on white | 12.10 | pass | Body text |
| `on-navy` on `navy` | 10.60 | pass | Body on dark |
| `aqua` on `navy` | 6.90 | pass | Dark-section eyebrows |
| `muted` on white | 6.68 | pass | Secondary text |
| `teal-dark` on white | 6.58 | pass | |
| `muted` on `pale` | 6.01 | pass | |
| `teal` on white | 4.81 | pass | Links, primary buttons |
| white on `teal` | 4.81 | pass | Button labels |
| **`teal` on `pale`** | **4.33** | **FAIL** | **Use `teal-dark` instead** |
| **`aqua` on white** | **2.11** | **FAIL** | **Never text — rules/accents/focus only** |

Two constraints follow and are binding:

1. **On `pale` backgrounds, teal text must be `teal-dark` (`#066772`).** The
   prototype's "Explore Service →" labels sit on pale cards at 4.33:1. Swapping
   to `teal-dark` clears AA with margin. This is the one palette correction to
   the prototype.
2. **`aqua` is never text.** At 2.11:1 on white it is only valid as the 32×2px
   eyebrow rule, card top-borders, the focus ring, and as text *on navy* (6.90:1).

Ratios computed with the WCAG 2.1 relative-luminance formula; rerun the check if
any palette value changes.

### Type

Inter 400/600/700, **self-hosted** as `.woff2` in `public/fonts/` with
`font-display: swap`, preloading 400 and 700. Fallback `Arial, sans-serif`.

Self-hosting rather than the prototype's Google CDN link removes a third-party
connection, avoids layout shift from a render-blocking external stylesheet, and
avoids sending visitor IPs to Google.

Headings use `clamp()` so they scale without breakpoints:

- h1 `clamp(34px, 4.8vw, 58px)`, line-height 1.06, tracking -0.02em
- Home h1 `clamp(38px, 5.4vw, 70px)`, line-height 1.04
- h2 `clamp(30px, 3.6vw, 44px)`, line-height 1.12, tracking -0.015em
- h3 20-22px; lede 18-19px; body 16px at line-height 1.6

### Layout and motion

Container 1280px, 24px side padding. Section padding 96px vertical (80px on
service pages, 72px on CTA bands). Radii: buttons 8px, cards 14px, panels 16-18px,
pills 999px. Grids use `repeat(auto-fit, minmax(min(Npx, 100%), 1fr))` so they
collapse without media queries.

Cards lift 4px with a `0 18px 40px rgba(8,43,69,.16)` shadow over 0.2s. Buttons
are min-height 52px (46px in the header), all targets ≥44px. Focus is
`outline: 3px solid #36C6BB; outline-offset: 2px` everywhere.

The eyebrow label — a 32×2px bar plus 13px uppercase text at 0.16em tracking —
opens most sections and is a component, not a repeated pattern.

### Breakpoint

One breakpoint at 900px: the desktop nav hides, the burger appears. Everything
else is fluid.

---

## 5. Pages

### Top-level

| Route | Title | Content |
|---|---|---|
| `/` | Home | Hero; trust strip; 9 service cards; about split; 4-step process; gallery preview; 4 why-us cards; CTA band |
| `/about` | About Us | Hero; overview split with image mosaic; 4 approach cards; mission & history; CTA band |
| `/services` | Services | Hero; 9 horizontal rows with pill tags |
| `/gallery` | Gallery | Hero; placeholder notice; 6 filter buttons; 10-item grid; CTA band |
| `/contact` | Contact | Hero; office sidebar (address, 2 emails, phone, fax); contact form |
| `/request` | Request a Service | Hero; request form; "what happens next" sidebar |
| `/thank-you` | Thank you | Form success confirmation; links back into the site |

`/thank-you` is new — the prototype showed success inline, but Netlify Forms
redirects on submit, so a real page is needed.

### Service pages

Nine pages at `/services/{slug}`, all from one template:

| Slug | Title | Sub-items |
|---|---|---|
| `shipping-agents` | Shipping Agents | 5 agency services |
| `crew-sign-on-off` | Crew Sign On / Off | 4 ports |
| `general-ship-supply` | General Ship Supply | 7 supply categories |
| `general-repair` | General Repair | 4 trades |
| `cleaning-solutions` | Cleaning Solutions | 3 stages |
| `ship-spares` | Ship Spares | — needs confirmation |
| `ship-husbandry` | Ship Husbandry Services | — needs confirmation |
| `export-import` | Export & Import | — needs confirmation |
| `marine-survey` | Marine Survey Services | — needs confirmation |

Template structure: breadcrumb + hero → overview heading and body → sub-item
grid (when present) or confirmation notice → sticky inquiry sidebar with the
service pre-selected → 3 related-service cards → CTA band.

The four "needs confirmation" services are those the live site lists by name
without describing. The prototype showed a dashed notice rather than inventing
scope; that is preserved, driven by a flag in the data file.

---

## 6. Components

| Component | Responsibility |
|---|---|
| `BaseLayout` | `<head>`, fonts, JSON-LD, skip link, header, footer |
| `Header` | Sticky navy bar; logo; nav with active state; 9-item Services dropdown; CTA; mobile burger |
| `Footer` | 4 columns — brand, quick links, 9 services, contact |
| `Plate` | Placeholder illustration, 10 variants (see §7) |
| `Form` | 3 modes — `quick`, `contact`, `request` |
| `ServiceCard` | Vertical (home) and horizontal (services index) variants |
| `SectionHeading` | Eyebrow + h2 + optional lede, light and dark |
| `CtaBand` | Navy band, heading, lede, 1-2 buttons |
| `Button` | Primary and outline, `<a>` or `<button>` |
| `TrustStrip` | Trust-signal band (see §8) |
| `Breadcrumb` | Trail with `aria-current="page"` |

Each is self-contained with a typed props interface, understandable without
reading its internals.

---

## 7. Imagery

The prototype contains no photographs. Instead a `Plate` component renders
inline SVG scenes in brand colors, selected by a `variant` prop:

`ship, port, crew, supply, repair, clean, spares, survey, docs, anchor`

Each is a layered sky and sea gradient plus variant-specific geometry —
container stacks, quay cranes, a gangway with figures, a wrench, a survey
magnifier. Each carries a distinct descriptive `aria-label`. A `dim` prop (0-1)
lays a navy scrim over the scene for hero legibility, and a corner chip reads
"Illustrative placeholder".

**Replacement path.** `Plate` resolves its variant through a map in
`src/data/plates.ts`. When real photographs arrive, each entry gains an `image`
path and `Plate` renders an `<img>` with `loading="lazy"` and the existing alt
text — no page markup changes. Variants can convert individually, so partial
photography is fine. The placeholder chip disappears automatically once a
variant has an image.

This is the single largest content gap: **the site cannot launch on illustrations
alone and needs real photography.**

---

## 8. Content and claims

### Verified — from the live site, used exactly

Emails `office@seaservint.com`, `seaservint@gmail.com`; phone `+880 1617 771507`;
fax `+880 2333 324728`; address "Mabud Chowdhury Center, 5th Floor, Nur Mia
Lane, Fakirhat, Bandar-4100, Chittagong, Bangladesh". Ports: Chattogram, Mongla,
Payra, Matarbari. Nine service names and their described scope.

### Trust strip — included at the client's direction, pending verification

The home page carries a trust-signal band with three claims taken from the
competitor reference: 24/7/365 availability, 30-minute response, and years of
operation since 2012.

All three live in `src/data/company.ts`, flagged in a source comment as
requiring client verification. Two are operational commitments SeaServe would
have to honor in practice, so they are data, not markup — correcting or removing
any of them is a one-line edit, and removing the strip is one import.

The years figure is **computed from the founding year at build time**, not
hardcoded. The live site's "eight years" has been stale since about 2020; a
computed value cannot go stale.

### Drafted — written for this build, marked for review

The prototype left mission, values, history and leadership as bracketed gaps.
These are drafted here at the client's direction, in `src/data/company.ts`
under a `DRAFTED` comment block listing each passage. The drafts stay close to
what the live site supports and avoid inventing certifications, client names,
vessel counts or team biographies.

### Excluded

"100% satisfaction guaranteed", "lowest possible prices", "secure supply" and
"carefully selected manufacturers" are not carried over. They are unfalsifiable
and read as weaker than the specific, checkable facts around them.

---

## 9. Forms

Three modes from one component.

| Mode | Where | Fields |
|---|---|---|
| `quick` | Service page sidebars | name\*, email\*, message\* |
| `contact` | `/contact` | name\*, company, email\*, phone, service, vessel, port, message\* |
| `request` | `/request` | company\*, name\*, email\*, phone, service\*, vessel\*, vesselType, port\*, date, message\* |

`request` adds conditional fields on the selected service, keyed by the §5
slugs: `crew-sign-on-off` adds crew change type and crew count;
`general-ship-supply` adds supply category; `ship-spares` adds part description. The service select offers the nine services
plus "Other / not sure yet"; on a service page it is pre-selected to that page's
service.

Submit labels per mode: "Send Inquiry", "Send Message", "Submit Request".

### Delivery

Three named Netlify forms — `quick-inquiry`, `contact`, `service-request` — each
with `data-netlify="true"`, a honeypot field, and redirect to `/thank-you`.
Submissions appear in the Netlify dashboard and are emailed to
`office@seaservint.com`; reply-to is set to the submitter.

### Validation and accessibility

Native `required` and `type="email"` first. JS adds the prototype's per-field
messages, `aria-invalid`, and a `role="alert"` summary above the form. Every
field has a real `<label>` bound by `for`/`id`; required fields are marked in the
label, not by color alone; optional fields say "(optional)". Inputs are
min-height 48px.

---

## 10. SEO

**Canonical host: `https://seaserviceint.com`.** This is set once as `site` in
`astro.config.mjs`, and every canonical URL, sitemap entry and Open Graph URL
derives from it.

Note this differs from the company's email domain, `seaservint.com` (the email
domain omits "ice"). Both appear in this project, which is a standing confusion
risk: **the domain must be confirmed as owned and pointed at Netlify before
launch**, or canonicals and the sitemap will reference a host that does not serve
the site. Contact addresses remain `@seaservint.com` regardless, since those are
the verified, working addresses.

Per-page `<title>` and `<meta description>`; canonical URLs; Open Graph and
Twitter card tags; `sitemap.xml` via `@astrojs/sitemap`; `robots.txt`.

The sitemap integration emits `sitemap-index.xml` *and* `sitemap-0.xml` — the
`robots.txt` reference must point at the index, a common off-by-one mistake.
`/thank-you` and `/404` are excluded and carry `noindex`.

JSON-LD: `Organization` + `LocalBusiness` on the home page with name, address,
phone, email and founding date; `Service` on each service page linked to the
organization; `BreadcrumbList` on inner pages.

Each service page targets its own term — "ship chandler Chittagong", "crew
change Mongla", "port agency Bangladesh" — which is the structural advantage
over the competitor's single combined services page.

Semantic HTML throughout: one `<h1>` per page, ordered headings, `<nav>` with
`aria-label`, `<main>`, `<address>` for the office.

---

## 11. Accessibility

Built in from the start, following the prototype's own care:

- Real `<button>`, `<a href>`, `<input>` + `<label>` — never a click handler on a div
- `aria-pressed` on gallery filters, `aria-current="page"` on breadcrumbs and nav
- `aria-expanded` on the mobile burger; dropdown reachable by keyboard via `:focus-within`
- `aria-label` on icon-only controls; decorative SVG `aria-hidden="true"`; illustrative SVG `role="img"` with a label
- Visible focus on every interactive element; targets ≥44px
- Body text meets 4.5:1, large text 3:1
- A skip link to `<main>`
- Filter state conveyed by background and text weight, not hue alone

---

## 12. Verified build constraints

Checked against the live registry and this machine on 2026-10-14. These are facts
to design around, not preferences.

### Framework version

`astro@7.3.8` is current; Astro 5 is two majors behind (5.18.2, May 2026).
Node 24.19.0 is installed and satisfies either. Because this is greenfield with a
plain HTML/CSS/SVG prototype, migration cost today is effectively zero, so the
site targets **Astro 7**.

One concrete trap if Astro 5 were used: `@astrojs/sitemap` forked at 3.7.1 to
`zod@^4` / `sitemap@^9`, while Astro 5 depends on `zod@^3`. Astro 5 would pin
sitemap at 3.7.0 and forgo later fixes.

Astro 6/7 deltas that touch this site: Vite 7 (Tailwind's plugin supports it),
`<script>`/`<style>` render in source order (our three scripts are independent),
`Astro.glob()` removed (unused). Zod 4 affects content-collection schemas only —
§6 uses typed TS data files, so it does not apply.

### Tailwind 4 setup differs from v3

There is **no `tailwind.config.js`** and **no `@astrojs/tailwind` integration** —
that integration is Tailwind-3 only. Tailwind 4 is a Vite plugin
(`@tailwindcss/vite`) with tokens declared in a CSS `@theme` block. Both
`tailwindcss` and `@tailwindcss/vite` are required and must stay version-locked.
**If a `tailwind.config.js` ever appears, Tailwind 3 was installed by mistake.**

The 900px breakpoint becomes a real `--breakpoint-nav` token so the header can use
`nav:` variants, rather than scattering `max-[900px]:` arbitrary values across two
components that must agree.

### Repository structure must be fixed first

`git rev-parse --show-toplevel` returns `C:/dev`, whose `origin` is
`https://github.com/Orbeen/Programming-Hero.git` — an unrelated project. Every
sibling directory (`orbeecash`, `expense-tracker`, and others) is untracked
inside that one repo.

Netlify git deploys require a repository whose root is the site. **Step one is
`git init` inside `C:\dev\seaserviceint.com`.** Untangling the parent repo is
pre-existing and out of scope, but `git add` must never be run from `C:\dev`
meanwhile or four unrelated projects get committed.

The stray 2-byte file `seaserviceint.com` in the project root is deleted.

### Netlify Forms

Netlify's pricing page no longer lists Forms under the Free plan's features, and
the legacy free tier capped 100 submissions per site per month. **Confirm Forms
availability on the target account before launch.**

Two consequences for the markup:

1. **Three named forms, not eleven.** The service travels as an ordinary field, so
   per-service forms would add nine inboxes to configure and monitor for no gain,
   and a provider change would mean editing eleven form tags instead of three.
2. **Do not hand-write `<input type="hidden" name="form-name">`.** Netlify's build
   injects it when it processes `data-netlify="true"` on static HTML; adding it
   manually risks a duplicate field. The manual form is only for JS-rendered forms.
3. The honeypot needs **our own CSS** to hide it — Netlify documents the attribute
   but ships no styles — and must stay out of the tab order.

Forms do not work on localhost, and form detection only scans deploys made *after*
it is enabled in the Netlify UI. Both facts shape the verification order in §14.

### Trailing slashes

Astro's `trailingSlash` plus Netlify's `pretty_urls` normalization can produce
redirect loops. After the first deploy, assert a single 200 with no chain:

```
curl -sIL https://<host>/about | grep -E 'HTTP/|location'
```

If loops appear, set Astro to `trailingSlash: 'ignore'` rather than fighting
Netlify's normalization.

---

## 13. Out of scope

Blog or news; multilingual content; a CMS (content is in typed data files); client
login or quote tracking; live vessel tracking or port schedules; e-commerce;
analytics beyond a Netlify-level pageview count; the real photography itself.

---

## 14. Verification

Forms carry the most deployment risk, so they are tested in a fixed order.

**Build.** `astro check` clean; build emits 17 HTML files with 9 under
`dist/services/`. Grep `dist/` for leaked `DRAFT-COPY` markers, `TODO`, or
`localhost`. Confirm no `tailwind.config.js` exists and that the compiled CSS
contains the brand hex values, proving `@theme` compiled.

**Forms.**

1. *Local, JS disabled* — every form submits via native validation; conditional
   fields all visible; required fields block submit.
2. *Local, JS on* — per-field messages, `aria-invalid`, focused `role="alert"`
   summary; conditional fields toggle per selected service.
3. *Deploy preview* — Forms do not work locally, so this step is mandatory.
   Enable form detection in the Netlify UI first, redeploy, confirm all three
   forms register, submit each one, confirm every field arrives and the redirect
   lands on `/thank-you`. Check the deployed source contains exactly one injected
   `form-name`. Fill the honeypot via devtools and confirm silent rejection.
   Tab through to confirm the honeypot is unreachable by keyboard.
4. Configure email notifications and send a real test to `office@seaservint.com`.

**Accessibility.** axe on all 15 pages, zero violations. Keyboard-only traversal
with visible focus at every stop. Screen-reader spot check on the dropdown,
gallery filters, and form errors. Verify the aqua focus ring is visible against
pale *and* navy.

**Performance.** Lighthouse ≥95 on home and a service page; total JS should be a
few KB, and a framework runtime appearing means something was added by mistake.
Check 375px for horizontal overflow — the wide SVGs and the nine-card grid are
the likely culprits.

---

## 15. Open items for the client

1. **Photography** — the largest gap; illustrations are placeholders
2. **Trust strip claims** — confirm or correct 24/7/365, 30-minute response, founded 2012
3. **Mission, values, history, leadership** — review the drafted copy
4. **Four undescribed services** — scope for spares, husbandry, export/import, marine survey
5. **Contact details** — confirm the live site's address, phone and fax are current
6. **Certifications** — any IMPA/ISSA membership or ISO certification worth showing
7. **Domain ownership** — confirm `seaserviceint.com` is owned and can point at
   Netlify. It differs from the email domain `seaservint.com` by three letters,
   so confirm this is deliberate and not a repo-naming artifact.
8. **Netlify Forms availability** — confirm the target account includes Forms
   (§12), since the free tier's inclusion is unclear
9. **Map coordinates** — lat/lng for the office, for `LocalBusiness` structured
   data. Omitted rather than guessed until supplied.
10. **Logo** — the prototype uses a generated SVG mark; supply the real logo for
    the header, footer and structured data
