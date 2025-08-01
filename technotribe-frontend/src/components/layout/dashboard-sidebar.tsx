"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Building2,
  Code,
  Shield,
  Menu,
  X,
  User,
} from "lucide-react";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import { UserRole } from "@/types/enums";

interface DashboardSidebarProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
  type: UserRole
}

export function DashboardSidebar({ user, type }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getNavigationItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: (FRONTEND_ROUTES[type?.toUpperCase() as keyof typeof FRONTEND_ROUTES] as any)?.DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        href: (FRONTEND_ROUTES[type?.toUpperCase() as keyof typeof FRONTEND_ROUTES] as any)?.PROFILE,
        icon: Users,
      },
    ];

    switch (type) {
      case "developer":
        return [
          ...baseItems,
          {
            title: "Applications",
            href: FRONTEND_ROUTES.DEVELOPER.APPLICATIONS,
            icon: FileText,
          },
        ];
      case "recruiter":
        return [
          ...baseItems,
          {
            title: "Jobs",
            href: FRONTEND_ROUTES.RECRUITER.JOBS.BASE,
            icon: Briefcase,
          },
        ];
      case "admin":
        return [
          ...baseItems,
          {
            title: "Users",
            href: FRONTEND_ROUTES.ADMIN.USERS,
            icon: Users,
          },
          {
            title: "Jobs",
            href: FRONTEND_ROUTES.ADMIN.JOBS,
            icon: Briefcase,
          },
          {
            title: "Analytics",
            href: FRONTEND_ROUTES.ADMIN.ANALYTICS,
            icon: BarChart3,
          },
        ];
      default:
        return baseItems;
    }
  };

  const getRoleIcon = () => {
    switch (type) {
      case "developer":
        return Code;
      case "recruiter":
        return Building2;
      case "admin":
        return Shield;
      default:
        return Users;
    }
  };

  const getRoleLabel = () => {
    switch (type) {
      case "developer":
        return "Developer";
      case "recruiter":
        return "Recruiter";
      case "admin":
        return "Admin";
      default:
        return type;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">

          {/* User Info */}
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                {(()=>{
                    const RoleIcon = getRoleIcon();
                    if(RoleIcon){
                        return <RoleIcon className="h-5 w-5 text-primary" />
                    }
                    return <User className="h-5 w-5 text-primary" />;
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {getRoleLabel()}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground text-center">
              TechnoTribe v1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 