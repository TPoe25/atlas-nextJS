import Link from "next/link";

export default function UIHomePage() {
  return (
    <section>
      <h1>UI Home</h1>
      <p>This is the homepage once a user logs in.</p>

      <nav style={{ display: "grid", gap: 8, marginTop: 16 }}>
        <Link href="/ui/topics/new">Create a new topic</Link>
        {/* Task 3: topics list will be rendered here */}
      </nav>
    </section>
  );
}
