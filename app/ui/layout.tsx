import SideNav from "@/components/Sidenav";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] gap-8 p-6">
        {/* Sidebar */}
        <aside className="w-[360px] shrink-0">
          <SideNav />
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
