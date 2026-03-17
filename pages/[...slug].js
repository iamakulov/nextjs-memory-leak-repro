import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getStaticPaths() {
  // Pre-generate a few paths, let the rest be generated on demand
  const paths = Array.from({ length: 200 }, (_, i) => ({
    params: { slug: [String(i)] },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join("/");
  const pageNumber = parseInt(params.slug[0], 10) || 0;

  // Generate ~10MB of unique data per page.
  // Each string entry is ~1000 chars. We need ~10000 entries for ~10MB.
  const items = [];
  for (let i = 0; i < 10000; i++) {
    // Use page number + index to ensure uniqueness across pages
    // so the data can't be deduplicated
    items.push(
      `page${pageNumber}_item${i}_` + String(pageNumber * 10000 + i).repeat(97)
    );
  }

  return {
    props: {
      slug,
      pageNumber,
      dataSize: JSON.stringify(items).length,
      items,
    },
  };
}

export default function SlugPage({ slug, pageNumber, dataSize }) {
  const nextPage = pageNumber + 1;
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    if (performance.memory) {
      setMemoryInfo({
        usedJSHeapSize: (
          performance.memory.usedJSHeapSize /
          1024 /
          1024
        ).toFixed(1),
        totalJSHeapSize: (
          performance.memory.totalJSHeapSize /
          1024 /
          1024
        ).toFixed(1),
      });
    }
  }, [slug]);

  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h1>Page: /{slug}</h1>
      <p>Data size from getStaticProps: ~{(dataSize / 1024 / 1024).toFixed(1)} MB</p>
      {memoryInfo && (
        <p>
          JS Heap: {memoryInfo.usedJSHeapSize} MB (performance.memory.usedJSHeapSize) / {memoryInfo.totalJSHeapSize} MB (performance.memory.totalJSHeapSize)
        </p>
      )}
      <p>
        <Link href={`/${nextPage}`}>
          Go to page {nextPage} →
        </Link>
      </p>
      <p style={{ color: "#888", fontSize: 12 }}>
        Click rapidly or hold Enter on the link to accumulate pages quickly.
      </p>
    </div>
  );
}
