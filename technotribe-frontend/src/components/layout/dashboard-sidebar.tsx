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
  Settings,
  BarChart3,
  Building2,
  Code,
  Shield,
  Menu,
  X,
  User,
} from "lucide-react";

interface DashboardSidebarProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getNavigationItems = (role: string) => {
    const baseItems = [
      {
        title: "Dashboard",
        href: `/${role}/dashboard`,
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        href: `/${role}/profile`,
        icon: Users,
      },
      {
        title: "Settings",
        href: `/${role}/settings`,
        icon: Settings,
      },
    ];

    switch (role) {
      case "developer":
        return [
          ...baseItems,
          {
            title: "Applications",
            href: "/developer/applications",
            icon: FileText,
          },
          {
            title: "Saved Jobs",
            href: "/developer/saved-jobs",
            icon: Briefcase,
          },
        ];
      case "recruiter":
        return [
          ...baseItems,
          {
            title: "Jobs",
            href: "/recruiter/jobs",
            icon: Briefcase,
          },
          {
            title: "Applications",
            href: "/recruiter/applications",
            icon: FileText,
          },
          {
            title: "Analytics",
            href: "/recruiter/analytics",
            icon: BarChart3,
          },
        ];
      case "admin":
        return [
          ...baseItems,
          {
            title: "Users",
            href: "/admin/users",
            icon: Users,
          },
          {
            title: "Jobs",
            href: "/admin/jobs",
            icon: Briefcase,
          },
          {
            title: "Analytics",
            href: "/admin/analytics",
            icon: BarChart3,
          },
          {
            title: "System",
            href: "/admin/system",
            icon: Shield,
          },
        ];
      default:
        return baseItems;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
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

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "developer":
        return "Developer";
      case "recruiter":
        return "Recruiter";
      case "admin":
        return "Admin";
      default:
        return role;
    }
  };

  const navigationItems = getNavigationItems(user?.role || "");

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
                    const RoleIcon = getRoleIcon(user?.role || "");
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
                  {getRoleLabel(user?.role || "")}
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