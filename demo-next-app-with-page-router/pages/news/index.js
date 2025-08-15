import Link from "next/link";

export default function NewsPage() {
  return (
    <>
      <h1>The NewsPage</h1>
      <ul>
        <li>
          <Link href="/news/nextjs-is-a-great-framework">
            NextJS is a great framework
          </Link>
        </li>
        <li>Something else</li>
      </ul>
    </>
  );
}
