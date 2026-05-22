# DGG Frontpage Styling Guide

## Brand Colors

Use the CSS variables in `src/app/globals.css` for all routine color choices.

- `--color-brand-blue`: `#1144FF`
- `--color-dark-blue`: `#123EDE`
- `--color-near-white-blue`
- `--color-accent-red`: `#FF0F43`
- `--color-charcoal`: `#242424`
- `--color-light-charcoal`: `#333333`
- `--color-black`: `#000000`

Avoid introducing new colors unless there is a specific content or accessibility need.

## Typography

- Use Roboto Condensed for headings and decorative text.
- Use Roboto Medium as the default for all normal paragraph body copy (including `.type-body` and `.type-small-body` text) to ensure high readability.
- Headings should be heavy and direct, usually `font-black`.
- Body copy should stay readable with generous line height.

## Layout

- Prefer simple two-column sections on tablet and desktop when the content benefits from comparison or balance.

## Section Treatment

- Do not use borders to distinguish sections or cards.
- Distinguish sections with background color changes, solid color bands, and block shapes.
- Use simple color stripes or offset color blocks when a section needs emphasis.
- Use darker blue with brand blue when layering blue surfaces.

## Buttons And Links

- Primary CTAs use brand blue backgrounds with near-white text.
- Donation or urgent CTAs use accent red.
- Secondary CTAs may use charcoal or near-white fills instead of borders.

## Cards And Callouts

- Avoid border-only cards.
- Use filled blocks for cards, callouts, and metrics.
- Use offset background panels for emphasis.
- Metric cards should be simple filled panels with a large value, label, and short description.

## Content Tone

- Keep page copy action-oriented and direct.
- Prefer short headings and practical CTAs.
- Avoid decorative explanatory text about how the site works.
