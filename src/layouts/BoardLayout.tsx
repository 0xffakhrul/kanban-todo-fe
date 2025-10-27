import { AppSidebar } from "@/components/Navbar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";

export default function BoardLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
