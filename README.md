# Francis — Pricing Model Comparison

An interactive, self-contained tool that demonstrates how the Odlings automated-pricing
"engine" was chosen: ~15 candidate models trained on identical data, scored head-to-head,
with a live leaderboard and per-order prediction breakdown.

The entire app is a single static file (`index.html`) — it runs fully in the browser
with no server, no database, and no build step.

## Deploying

This repo is deployed as a static site on Vercel. No configuration is required:
Vercel serves `index.html` at the root.

To run locally, just open `index.html` in any browser, or:

```bash
npx serve .
```
