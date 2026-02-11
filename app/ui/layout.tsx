// app/ui/layout.tsx
import SideNav from "@/components/Sidenav";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-atlas-navy">
      <SideNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
