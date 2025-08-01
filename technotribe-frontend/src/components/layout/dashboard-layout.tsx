"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import { UserRole } from "@/types/enums";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: UserRole
}

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        router.push(FRONTEND_ROUTES.LOGIN);
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        router.push(FRONTEND_ROUTES.LOGIN);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-background h-[calc(100vh-60px)] max-h-[calc(100vh-60px)]">
      <DashboardHeader type={type} user={user} />
      <div className="flex h-full">
        <DashboardSidebar type={type} user={user} />
        <main className="flex-1 h-full p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 