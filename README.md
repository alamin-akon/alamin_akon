# Alamin Akon Portfolio

A modern, responsive professional portfolio for Alamin Akon — Web Designer, Developer, Shopify Specialist, UI/UX Designer and Front-End Developer.

## Technology

- Next.js App Router and TypeScript
- Tailwind CSS v4
- GSAP for the hero animation and Framer Motion for UI interactions
- Lucide React icons
- React Hook Form and Zod contact form validation
- Next.js Metadata API, sitemap, robots and JSON-LD structured data

## Features

- Responsive dark-theme portfolio with accessible mobile navigation
- About, Services, Projects, dynamic project details and Contact pages
- Filterable project gallery and reusable project/service content files
- Server-validated contact API with optional Resend email delivery
- SEO metadata, Open Graph data, sitemap, robots and web manifest
- Reduced-motion support, skip link, semantic markup and visible focus states

## Installation

```bash
npm install
```

Create a `.env.local` file from the example:

```bash
cp .env.example .env.local
```

Run locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```env
RESEND_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`RESEND_API_KEY` and `CONTACT_EMAIL` are optional in development. Without them the contact route returns a safe development confirmation and does not send email. For production contact delivery, add both values in your hosting provider’s environment settings.

## Production

Create and test the production bundle:

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub, GitLab or Bitbucket.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add `NEXT_PUBLIC_SITE_URL` with the final production URL.
4. Optionally add `RESEND_API_KEY` and `CONTACT_EMAIL` to enable live contact emails.
5. Deploy. Vercel detects Next.js automatically.

## Content editing

The website content is intentionally separated from components:

- `data/profile.ts` — owner profile, biography and brand statement
- `data/services.ts` — service cards and feature lists
- `data/projects.ts` — projects and individual project page content
- `data/skills.ts` — skills, values and workflow steps
- `data/socials.ts` — social account links
- `data/navigation.ts` — primary navigation

Update these files to change copy without editing the page layout.

## Project images

Project cards use an elegant browser-frame placeholder so no broken images appear before final screenshots are available. When screenshots are ready, add optimized `.webp` images to `public/projects/` using the project slug (for example `health-nook.webp`) and update `components/cards/ProjectPreview.tsx` to use Next.js `Image` for those assets.

## Contact form setup

The API route is at `app/api/contact/route.ts`. It validates every request with Zod. To enable Resend delivery, provide `RESEND_API_KEY` and a verified `CONTACT_EMAIL`. The current sender uses Resend’s onboarding address; update it to your verified domain sender before production use.

## Structure

```text
app/            Routes, metadata and API routes
components/     Reusable layout, UI, form, card and section components
data/           Typed portfolio content
lib/            Validation and utility functions
types/          Shared TypeScript interfaces
```
# alamin_akon
