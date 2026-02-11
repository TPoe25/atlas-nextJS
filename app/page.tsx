// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-extrabold">Home</h1>
      <div className="mt-6 flex gap-4">
        <Link className="underline" href="/about">About</Link>
        <Link className="underline" href="/login">Log in</Link>
        <Link className="underline" href="/ui">Go to UI</Link>
      </div>
    </main>
  );
}
