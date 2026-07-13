import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-paper">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar title={title} description={description} />
          <main className="flex-1 px-6 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
