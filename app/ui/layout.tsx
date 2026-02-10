import Link from "next/link";
import type { ReactNode } from "react";

export default function UILayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 280, borderRight: "1px solid #ddd", padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Sidebar</h2>
        <nav style={{ display: "grid", gap: 8 }}>
          <Link href="/ui">UI Home</Link>
          <Link href="/ui/topics/new">New Topic</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 16 }}>{children}</main>
    </div>
  );
}
