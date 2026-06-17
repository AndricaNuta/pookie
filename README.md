# The Big Reveal ✦

A sleek, scrolling surprise for Alex — a slow-build "treasure hunt" that keeps the
destination a secret until it blooms into the real invitation: **Dubrovnik, 8–13 July.**

Built with **React + Vite + Framer Motion + Tailwind**. No backend, no tracking — just a
static site you can host anywhere.

---

## 1. Personalise it (start here)

Open **`src/config.js`** and edit the values at the top. That's the only file you need:

| Field | What it does |
|---|---|
| `name` | His name, shown big on the opening (currently `Alex`). |
| `yourName` | Your sign-off on the final scene (currently `Anuta`). |
| `lockCode` | **The 4-digit puzzle answer — change `0000`.** A date that matters, format **DDMM** (e.g. 14 Feb → `1402`). |
| `lockHint` | The gentle hint shown if he taps “I’ve forgotten”. |
| `destination` / `datesLabel` | `Dubrovnik` and `8 – 13 July`. |
| `tripStartISO` | Used for the live “N days away” countdown (`YYYY-MM-DD`). |

The three destination cards (and their funny “try again” lines) live just below, in
`DESTINATIONS`. Only **Dubrovnik** lets him through — the other two gently bounce back.

> Tip: while editing, add `?s=4` to the URL to jump straight to a scene
> (0 = open, 1 = riddle, 2 = lock, 3 = callback, 4 = choice, 5 = reveal, 6 = close).
> This shortcut is automatically removed from the production build.

---

## 2. Run it locally

```bash
npm install
npm run dev      # opens http://localhost:5173
```

Open it on your phone too (same Wi-Fi): `npm run dev -- --host` then visit the Network URL.

---

## 3. Put it online (so you can send him a link)

It's a plain static site — any of these work:

**Vercel (recommended)**
```bash
npm i -g vercel
vercel            # follow the prompts; it auto-detects Vite
```
Or push this folder to a GitHub repo and “Import Project” at vercel.com — zero config.

**Netlify** — drag the `dist/` folder (after `npm run build`) onto app.netlify.com/drop.

**Build output:**
```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

---

## The story (scene by scene)

0. **Open** — “A delivery for Alex.” Pure mystery, no hints.
1. **Riddle** — deliberately vague. Could be leading anywhere.
2. **Lock** — the one puzzle: a date that matters to you both.
3. **Callback** — the warm turn. The running “you in the sun while I work” joke finally lands.
4. **Choice** — pick the destination. It’s rigged; only Dubrovnik gets through.
5. **Reveal** — *Dubrovnik.* Adriatic blue, confetti, the dates, a live countdown.
6. **Close** — come find me, let’s plan it. Signed, you.

The palette intentionally stays cool and dark until the callback, then blooms warm,
then opens into Adriatic blue — the colour shift is part of the reveal. No travel/sun
words or imagery appear before the callback.

Made with love. 💛
