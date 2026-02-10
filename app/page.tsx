import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a", // dark slate
        color: "white",
        padding: 32,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <h1 style={{ fontSize: 42, fontWeight: 800 }}>Atlas Q&A</h1>

        <p style={{ fontSize: 18, color: "#cbd5f5" }}>
          Ask questions. Vote on answers. Learn together.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Link
            href="/login"
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              background: "#6366f1",
              color: "white",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Log In
          </Link>

          <Link
            href="/about"
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              border: "1px solid #475569",
              color: "white",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            About
          </Link>
        </div>
      </div>
    </main>
  );
}
