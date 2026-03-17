import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h1>Next.js Memory Leak Repro</h1>
      <p>
        Each page returns ~10MB of unique data from getStaticProps.
        <br />
        Navigate through pages and watch memory grow.
      </p>
      <p>
        <Link href="/0">Start at page 0 →</Link>
      </p>
    </div>
  );
}
