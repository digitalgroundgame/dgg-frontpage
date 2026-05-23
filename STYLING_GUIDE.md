# DGG Frontpage Styling Guide

## Brand Colors

Use the CSS variables in `src/app/globals.css` for all routine color choices.

- `--color-brand-blue`: `#1144FF`
- `--color-dark-blue`: `#123EDE`
- `--color-near-white-blue`: `#EEF2FF`
- `--color-accent-red`: `#FF0F43`
- `--color-charcoal`: `#242424`
- `--color-light-charcoal`: `#333333`
- `--color-black`: `#000000`

Avoid introducing new colors unless there is a specific content or accessibility need.

## Typography

- Use Roboto Condensed for all text.
- Headings should be heavy and direct, usually `font-black`.
- Body copy should stay readable with generous line height.

## Layout

- Use constrained page content with `max-w-6xl`, `mx-auto`, and responsive horizontal padding.
- Prefer simple two-column sections on tablet and desktop when the content benefits from comparison or balance.

## Section Treatment

- Do not use borders to distinguish sections or cards.
- Distinguish sections with background color changes, solid color bands, and block shapes.
- Prefer strong section contrast:
  - `bg-near-white-blue text-charcoal`
  - `bg-charcoal text-near-white-blue`
  - `bg-light-charcoal text-near-white-blue`
  - `bg-brand-blue text-near-white-blue`
  - `bg-dark-blue text-near-white-blue`
- Use simple color stripes or offset color blocks when a section needs emphasis.
- Use darker blue with brand blue when layering blue surfaces.

## Buttons And Links

- Primary CTAs use brand blue backgrounds with near-white text.
- Donation or urgent CTAs use accent red.
- Secondary CTAs may use charcoal or near-white fills instead of borders.

## Cards And Callouts

- Avoid border-only cards.
- Use filled blocks for cards, callouts, and metrics.
- Use offset background panels for emphasis, such as an accent red block behind a dark blue callout.
- Metric cards should be simple filled panels with a large value, label, and short description.

## Content Tone

- Keep page copy action-oriented and direct.
- Prefer short headings and practical CTAs.
- Avoid decorative explanatory text about how the site works.
