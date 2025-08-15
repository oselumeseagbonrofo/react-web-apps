import Link from "next/link";
import Header from "./components/header";

export default function Home() {
  console.log("great");
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        <Link href="/about">Go to About Page</Link>
      </p>
      <p>
        <Link href="/blog">Go to Blog Page</Link>
      </p>
    </main>
  );
}
