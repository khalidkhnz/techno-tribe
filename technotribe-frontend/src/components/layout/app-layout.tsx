"use client";

import { useState, useEffect } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { useUser } from "@/hooks/use-api";

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: userResponse, isLoading } = useUser();
  const user = userResponse?.data;

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />

      <div className="flex">
        {showSidebar && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            user={user?.data}
          />
        )}

        <main
          className={`flex-1 transition-all duration-300 ${
            showSidebar ? "md:ml-64" : ""
          }`}
        >
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
