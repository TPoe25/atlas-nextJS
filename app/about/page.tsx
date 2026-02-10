import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link href="/about">About</Link>
        <Link href="/ui">Go to UI</Link>
        <Link href="/login">Log in</Link>
      </nav>
    </main>
  );
}
