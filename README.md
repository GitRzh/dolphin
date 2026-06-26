# Dolphin

AI-powered data pipeline automation platform. Built with React and Vite.

---

## Tech Stack

- React 18
- Vite
- Custom CSS (no utility framework)
- Web Animations API (WAAPI) for motion
- IntersectionObserver for scroll reveal
- Zero runtime animation or UI component libraries

## Project Structure

```
src/
  components/
    CTAPanel.jsx       - dual-panel call-to-action section
    Features.jsx       - bento grid (desktop) / accordion (mobile) feature showcase
    Footer.jsx         - site footer with link columns
    Hero.jsx           - above-the-fold hero section
    Loader.jsx         - entry loading screen
    Marquee.jsx        - scrolling logo marquee
    Nav.jsx            - top navigation bar
    Pricing.jsx        - multi-currency, multi-cycle pricing tier matrix
    StatsBar.jsx       - key platform statistics bar
    Testimonials.jsx   - customer testimonial grid
  App.jsx
  main.jsx
  index.css
  scrollReveal.js      - scroll-triggered entrance animations
```

## Local Development

Requirements: Node.js 18 or higher.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Production Build

```bash
npm run build
```

Output goes to the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## Deploying to Netlify via GitHub

### First-time setup

1. Push your project to a GitHub repository.

2. Go to https://app.netlify.com and sign in.

3. Click "Add new site" then "Import an existing project".

4. Select GitHub and authorize Netlify if prompted.

5. Choose your repository from the list.

6. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

7. Click "Deploy site".

Netlify will build and deploy automatically. You will receive a live URL once the build completes.

### Automatic deploys

Every push to your main branch triggers a new deploy automatically. No additional configuration needed.

### Custom domain (optional)

In your Netlify site dashboard, go to "Domain settings" and add your custom domain. Netlify provisions a free TLS certificate via Let's Encrypt automatically.

---

## Key Implementation Notes

**Pricing isolation**: Currency and billing cycle changes mutate DOM text nodes directly via refs. No React state is updated, so no parent component re-renders on toggle.

**Bento-to-Accordion**: A single `activeIndex` state is shared across both layouts. On viewport resize past the 768px breakpoint, the active hover index transfers to the accordion so the correct panel opens.

**Scroll reveal**: `scrollReveal.js` uses a native IntersectionObserver and WAAPI. Elements with `data-sr` animate in when they enter the viewport. `data-sr-delay` staggers grouped elements. `data-sr-dir` controls slide direction.

**Reduced motion**: The scroll reveal system checks `prefers-reduced-motion` on init and skips all animations if set.