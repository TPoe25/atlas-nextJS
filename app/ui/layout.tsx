import { ReactNode } from "react";
import Sidenav from "@/components/Sidenav";

export default function UILayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidenav />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
