"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  User,
  LogOut,
  Search,
  Sun,
  Moon,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import { motion } from "framer-motion";
import { UserRole } from "@/types/enums";
import { config } from "@/lib/config";

interface DashboardHeaderProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
  type?: UserRole
}

export function DashboardHeader({ user, type }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [notifications] = useState([
    {
      id: 1,
      title: "New job application",
      message: "You have a new application for Senior React Developer",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Profile view",
      message: "Someone viewed your profile",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    toast.success("Logged out successfully");
    router.push(FRONTEND_ROUTES.LOGIN);
  };

  const getRoleBadgeColor = () => {
    switch (type) {
      case "admin":
        return "bg-red-500";
      case "recruiter":
        return "bg-blue-500";
      case "developer":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleLabel = () => {
    switch (type) {
      case "admin":
        return "Admin";
      case "recruiter":
        return "Recruiter";
      case "developer":
        return "Developer";
      default:
        return type;
    }
  };

  return (
    <header className="sticky h-[60px] top-0 z-[9999] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 w-full">
        {/* Left side - Logo and Search */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
          <Link href={FRONTEND_ROUTES.HOME} className="flex items-center gap-2">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Briefcase className="h-4 w-4" />
              </motion.div>
              <motion.span
                className="hidden font-bold sm:inline-block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {config.app.name}
              </motion.span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>

        {/* Right side - Notifications, Theme, and User Menu */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.firstName} />
                  <AvatarFallback>
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={`w-fit text-xs ${getRoleBadgeColor()}`}
                  >
                    {getRoleLabel()}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push((FRONTEND_ROUTES[user?.role?.toUpperCase() as keyof typeof FRONTEND_ROUTES] as any)?.PROFILE)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 