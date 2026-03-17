# Next.js Memory Leak Repro

Reproduces a memory leak where `getStaticProps` data accumulates across client-side navigations and is never released.

Each page returns ~10MB of unique data. Navigate through pages and watch memory grow.

## Usage

```bash
npm install
npx next build
npx next start
```

Open http://localhost:3000 and click through the pages.
