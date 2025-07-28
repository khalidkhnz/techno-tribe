"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
  Search,
  Bell,
  HelpCircle,
  Info,
  ExternalLink,
} from "lucide-react";
import { config } from "@/lib/config";

interface GlobalSidebarProps {
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
  external?: boolean;
}

const generalNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Browse Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Saved Jobs",
    href: "/saved-jobs",
    icon: Bookmark,
  },
  {
    title: "My Applications",
    href: "/applications",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    badge: "3",
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

const recruiterNavItems: NavItem[] = [
  {
    title: "My Jobs",
    href: "/recruiter/jobs",
    icon: FileText,
    role: ["recruiter", "admin"],
  },
  {
    title: "Post New Job",
    href: "/recruiter/jobs/new",
    icon: Plus,
    role: ["recruiter", "admin"],
  },
  {
    title: "Candidates",
    href: "/recruiter/candidates",
    icon: Users,
    role: ["recruiter", "admin"],
  },
  {
    title: "Analytics",
    href: "/recruiter/analytics",
    icon: BarChart3,
    role: ["recruiter", "admin"],
  },
];

const adminNavItems: NavItem[] = [
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
    role: ["admin"],
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: Settings,
    role: ["admin"],
  },
];

const helpNavItems: NavItem[] = [
  {
    title: "Help Center",
    href: "/help",
    icon: HelpCircle,
  },
  {
    title: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: MessageSquare,
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: ExternalLink,
    external: true,
  },
];

export function GlobalSidebar({ isOpen, onClose, user }: GlobalSidebarProps) {
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

    const NavLink = item.external ? "a" : Link;
    const navProps = item.external
      ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
      : { href: item.href };

    return (
      <motion.div
        key={item.href}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <NavLink {...navProps}>
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 group",
              isActive && "bg-secondary text-secondary-foreground"
            )}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Icon className="h-4 w-4" />
            </motion.div>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
                {item.external && (
                  <ExternalLink className="h-3 w-3 opacity-50" />
                )}
              </>
            )}
          </Button>
        </NavLink>
      </motion.div>
    );
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        exit="closed"
        variants={sidebarVariants as any}
        className={cn(
          "fixed left-0 top-0 z-50 h-full border-r bg-background transition-all duration-300 ease-in-out md:relative md:translate-x-0",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <motion.div
            className="flex h-16 items-center justify-between border-b px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {!isCollapsed && (
              <Link href="/" className="flex items-center gap-2">
                <motion.div
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Briefcase className="h-4 w-4" />
                </motion.div>
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
                <motion.div
                  animate={{ rotate: isCollapsed ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </motion.div>
              </Button>
            </div>
          </motion.div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {/* General Navigation */}
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {filterNavItems(generalNavItems).map(renderNavItem)}
              </motion.div>

              {/* Recruiter Navigation */}
              {user && (user.role === "recruiter" || user.role === "admin") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
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
                </motion.div>
              )}

              {/* Admin Navigation */}
              {user && user.role === "admin" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
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
                </motion.div>
              )}

              {/* Help Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Separator className="my-4" />
                <div className="px-2 py-1">
                  {!isCollapsed && (
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Help & Support
                    </h3>
                  )}
                </div>
                <div className="space-y-1">
                  {helpNavItems.map(renderNavItem)}
                </div>
              </motion.div>
            </nav>
          </ScrollArea>

          {/* User Profile & Theme Toggle */}
          <motion.div
            className="border-t p-4 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {user && (
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
            )}

            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <span className="text-xs text-muted-foreground">Theme</span>
              )}
              <ThemeToggle />
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
