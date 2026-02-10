import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Home</h1>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link href="/about">About</Link>
        <Link href="/ui">Go to UI</Link>
        <Link href="/login">Log in</Link>
      </nav>
    </main>
  );
}
