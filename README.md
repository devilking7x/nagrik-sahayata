# नागरिक सहायता — Nagrik Sahayata

A Hindi-first civic-rights helper for India, built for **Code for Change 2026**
(Devpost, global online student hackathon — Social Good).

**Live demo:** https://devilking7x.github.io/nagrik-sahayata/
**Hackathon:** https://code-for-change-global.devpost.com/

## What it does

- **6 step-by-step rights guides (Hindi + English):** RTI, consumer complaint,
  police complaint / FIR, cybercrime report, CPGRAMS government grievance,
  ration card / public services. Each guide lists the fee, timeline, helpline,
  documents needed, and links to the official government portal.
- **Checklist tracker:** tick off steps as you complete them; progress is saved
  in your browser (localStorage) and shown as a percentage per guide.
- **Letter writer:** pick a template (RTI / consumer / police / grievance),
  fill a short form, and generate a formal Hindi or English letter — copy it
  or download it as a `.txt` file. Generated entirely on your device.
- **Community help board:** post a request for help or offer help (e.g. help
  filing an RTI, accompanying someone to a police station). Posts are stored
  only in the visitor's browser; they can be searched, filtered, and marked
  resolved.
- **Hindi/English toggle** for the whole interface, and a search box that
  searches guides in both languages.
- **Emergency numbers up front:** 112 (emergency), 1930 (online fraud),
  1915 (consumer helpline).

## How it works

Plain static site — no build step, no framework, no server, no tracking.
Open `index.html` in any browser, or visit the GitHub Pages link above.

- `index.html` — page structure
- `styles.css` — styling
- `app.js` — all data + logic. The core (guides, search, letter builder,
  checklist state, help-board logic) is pure JavaScript with no DOM
  dependency, so it is unit-tested in Node; the browser UI code is guarded
  behind a `typeof document !== 'undefined'` check.
- `tests/test.js` — Node tests

## Tests

```bash
node --test tests/test.js   # 10 tests, all passing
```

A Playwright smoke test (not shipped in the repo) loads the page from disk,
checks for console errors and failed requests, exercises search, checklist,
letter generation, the help board and the language toggle, and saves a
screenshot. Result: **12/12 checks passed, 0 console errors, 0 failed
requests** (Chromium, 24 Nov 2026).

## Honest limits

- This app **explains procedures and drafts letters — it is not legal advice**
  and it does not file anything for you. Always verify on the official portal
  linked in each guide before acting.
- Fees and timelines (e.g. RTI ₹10, 30-day reply) follow the RTI Act, 2005
  and the Consumer Protection Act, 2019 as published on the official portals;
  rules can change — the linked portal is the authority.
- Checklists and board posts live only in the visitor's browser localStorage.
  Clearing browser data erases them, and posts are **not shared between
  devices or people** — this is a single-device prototype, not a hosted
  community platform.
- Never share OTPs, passwords, bank details or full ID numbers on the board
  (or anywhere else).

## Built by

Mohd Raja ([devilking7x](https://github.com/devilking7x)) — solo, for Code for
Change 2026. Free and open source.
