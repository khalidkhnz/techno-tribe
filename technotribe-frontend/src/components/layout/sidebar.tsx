"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Briefcase,
  Users,
  FileText,
  Settings,
  BarChart3,
  Plus,
  Bookmark,
  MessageSquare,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { config } from "@/lib/config";
import FRONTEND_ROUTES from "@/lib/fe-routes";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  role?: string[];
}

const generalNavItems: NavItem[] = [
  {
    title: "Browse Jobs",
    href: FRONTEND_ROUTES.JOBS,
    icon: Briefcase,
  },
];

const recruiterNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: FRONTEND_ROUTES.RECRUITER.DASHBOARD,
    icon: Home,
    role: ["recruiter", "admin"],
  },
  {
    title: "My Jobs",
    href: FRONTEND_ROUTES.RECRUITER.JOBS,
    icon: FileText,
    role: ["recruiter", "admin"],
  },
  {
    title: "Profile",
    href: FRONTEND_ROUTES.RECRUITER.PROFILE,
    icon: User,
    role: ["recruiter", "admin"],
  },
];

const developerNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: FRONTEND_ROUTES.DEVELOPER.DASHBOARD,
    icon: Home,
    role: ["developer"],
  },
  {
    title: "Applications",
    href: FRONTEND_ROUTES.DEVELOPER.APPLICATIONS,
    icon: FileText,
    role: ["developer"],
  },
  {
    title: "Profile",
    href: FRONTEND_ROUTES.DEVELOPER.PROFILE,
    icon: User,
    role: ["developer"],
  },
];

const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: FRONTEND_ROUTES.ADMIN.DASHBOARD,
    icon: Home,
    role: ["admin"],
  },
  {
    title: "User Management",
    href: FRONTEND_ROUTES.ADMIN.USERS,
    icon: Users,
    role: ["admin"],
  },
  {
    title: "Jobs",
    href: FRONTEND_ROUTES.ADMIN.JOBS,
    icon: FileText,
    role: ["admin"],
  },
  {
    title: "Analytics",
    href: FRONTEND_ROUTES.ADMIN.ANALYTICS,
    icon: BarChart3,
    role: ["admin"],
  },
];

export function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.firstName.charAt(0)}${user.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  const getRoleBadge = () => {
    if (!user) return null;

    const roleConfig = {
      developer: { variant: "default" as const, label: "Developer" },
      recruiter: { variant: "secondary" as const, label: "Recruiter" },
      admin: { variant: "destructive" as const, label: "Admin" },
    };

    const config = roleConfig[user.role as keyof typeof roleConfig];
    if (!config) return null;

    return (
      <Badge variant={config.variant} className="text-xs">
        {config.label}
      </Badge>
    );
  };

  const filterNavItems = (items: NavItem[]) => {
    if (!user) return items.filter((item) => !item.role);
    return items.filter((item) => !item.role || item.role.includes(user.role));
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link key={item.href} href={item.href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-3",
            isActive && "bg-secondary text-secondary-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Button>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full border-r bg-background transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b px-4">
            {!isCollapsed && (
              <Link href={FRONTEND_ROUTES.HOME} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span className="font-bold">{config.app.name}</span>
              </Link>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {/* General Navigation */}
              <div className="space-y-1">
                {filterNavItems(generalNavItems).map(renderNavItem)}
              </div>

              {/* Recruiter Navigation */}
              {user && (user.role === "recruiter" || user.role === "admin") && (
                <>
                  <Separator className="my-4" />
                  <div className="px-2 py-1">
                    {!isCollapsed && (
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Recruiter
                      </h3>
                    )}
                  </div>
                  <div className="space-y-1">
                    {filterNavItems(recruiterNavItems).map(renderNavItem)}
                  </div>
                </>
              )}

              {/* Developer Navigation */}
              {user && user.role === "developer" && (
                <>
                  <Separator className="my-4" />
                  <div className="px-2 py-1">
                    {!isCollapsed && (
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Developer
                      </h3>
                    )}
                  </div>
                  <div className="space-y-1">
                    {filterNavItems(developerNavItems).map(renderNavItem)}
                  </div>
                </>
              )}

              {/* Admin Navigation */}
              {user && user.role === "admin" && (
                <>
                  <Separator className="my-4" />
                  <div className="px-2 py-1">
                    {!isCollapsed && (
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Admin
                      </h3>
                    )}
                  </div>
                  <div className="space-y-1">
                    {filterNavItems(adminNavItems).map(renderNavItem)}
                  </div>
                </>
              )}
            </nav>
          </ScrollArea>

          {/* User Profile */}
          {user && (
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.firstName} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                    <div className="mt-1">{getRoleBadge()}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
