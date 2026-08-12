# Sparo Interactive

I have an existing static HTML/CSS/JS landing page for a startup called Sparo (AI cash-flow risk platform for Indian MSMEs). I'm pasting the full HTML below. I want you to rebuild it as a working, interactive site — NOT redesign it. Keep the exact visual identity: the dark ink (#16233A) background, cream paper (#F2EEE3) accents, marigold (#E3A73B) and thread-red (#A8442C) highlights, Fraunces serif for display type, IBM Plex Sans/Mono for body/data, the stitched-thread vertical line motif, and the circular "stamp" badges. Do not swap the fonts, palette, or overall section rhythm for a generic template look.

Make these things actually functional:

1. WAITLIST FORM — The "Get early access" email capture at the bottom currently isn't wired to anything. Connect it to Supabase: create a `waitlist_signups` table (email, created_at, source_page) and save submissions there. Show a proper loading state on submit, a success state that replaces the form with a confirmation message, and a friendly inline error state if submission fails (e.g. duplicate email, network error) — don't just alert().

2. "TRY IT" CALCULATOR — There's already a client-side slider calculator (overdue invoices + slow-moving inventory sliders, two toggleable actions, live-updating "cash trapped" vs "cash protected" numbers). Keep the math but make the interaction feel more alive: animate the numbers counting up/down when sliders move instead of snapping instantly, and add a subtle highlight/pulse on the result numbers when they change.

3. DEMO TABS — The "Before/After" toggle (spreadsheet view vs Sparo insight view) works but is an abrupt show/hide. Add a smooth crossfade/slide transition between the two states.

4. NAVIGATION — There's currently no way to jump between sections. Add a slim sticky header (matching the dark palette, mono font for labels) that appears after scrolling past the hero, with anchor links to Problem, How it works, Try it, Demo, Pricing, and a scroll progress indicator styled as a thin marigold line (echoing the existing thread motif) rather than a generic progress bar.

5. MOBILE — Test and fix all interactive elements (sliders, form, tabs, nav) specifically at 375px and 414px widths. The sliders in particular need larger touch targets on mobile.

6. MICRO-INTERACTIONS — Add tasteful hover/focus states to the pricing cards (subtle lift or border-glow in marigold, not a generic shadow), and make the ticker in the hero pause on hover/touch so it's actually readable.

7. ACCESSIBILITY — Preserve the reduced-motion handling already in the CSS. Make sure the new nav, form, and calculator are fully keyboard-navigable with visible focus states in marigold (already defined as a CSS pattern in the file — extend it, don't replace it).

Do NOT add a hero image, gradient backgrounds, rounded card shadows, or any AI-template signature styling (no #D97757 terracotta-on-cream defaults, no generic SaaS layouts). This should still feel like a stitched ledger/textile-trade motif, not a generic startup landing page.

Here is the full HTML:

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sparos-stitch-studio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b6db4dab-9c8a-45f9-ad90-5a56e3032a13).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
