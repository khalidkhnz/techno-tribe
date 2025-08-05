"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Plus,
  Menu,
  Briefcase,
  Loader2,
} from "lucide-react";
import { config } from "@/lib/config";
import FRONTEND_ROUTES from "@/lib/fe-routes";
import useDebounce from "@/hooks/use-debounce";
import { useSearchUsers } from "@/hooks/use-api";
import { useDetectOutsideClick } from "@/hooks/use-detect-outside-click";

interface SearchUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  profileImage?: string;
  currentPosition?: string;
  currentCompany?: string;
  location?: string;
  customUrl?: string;
  skills?: string[];
}

interface HeaderProps {
  onMenuToggle?: () => void;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
}

export function Header({ onMenuToggle, user: userData }: HeaderProps) {
  const [user, setUser] = useState(userData || JSON.parse(localStorage.getItem("user") || "null"));

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: searchResults, isLoading } = useSearchUsers(debouncedSearch, 1, 20);

  const searchRef = useDetectOutsideClick<HTMLDivElement>({
    callback: () => setShowSearchResults(false),
    enabled: showSearchResults,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSearchFocus = () => {
    if (searchQuery && searchResults?.data && searchResults.data.length > 0) {
      setShowSearchResults(true);
    }
  };

  useEffect(() => {
    if (searchQuery && searchResults?.data && searchResults.data.length > 0) {
      setShowSearchResults(true);
    } else if (!searchQuery || !searchResults?.data || searchResults.data.length === 0) {
      setShowSearchResults(false);
    }
  }, [searchResults, searchQuery]);

  const handleUserClick = (user: SearchUser) => {
    setShowSearchResults(false);
    setSearchQuery("");
    router.push(`/profile/${user.customUrl || user._id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    router.push(FRONTEND_ROUTES.HOME);
  };

  const getUserInitials = () => {
    if (!user) return "U";
    return `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`.toUpperCase();
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center gap-2">
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

        {/* Center Section - Search */}
        <div ref={searchRef} className="hidden flex-1 max-w-md mx-8 lg:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              className="pl-9 bg-background/80 backdrop-blur-sm border-0 shadow-sm"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults?.data && searchResults.data.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    Found {searchResults.data.length} user{searchResults.data.length !== 1 ? 's' : ''}
                  </div>
                                     {searchResults.data.map((user: SearchUser) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => handleUserClick(user)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback className="text-sm">
                          {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          {user.role && (
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                          )}
                        </div>
                        {user.currentPosition && (
                          <p className="text-xs text-muted-foreground truncate">
                            {user.currentPosition}
                          </p>
                        )}
                        {user.location && (
                          <p className="text-xs text-muted-foreground truncate">
                            📍 {user.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* No Results */}
            {showSearchResults && searchQuery && !isLoading && searchResults && searchResults.data && searchResults.data.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm">No users found for "{searchQuery}"</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href={FRONTEND_ROUTES.JOBS}>
              <Button variant="ghost" size="sm" className="hover:bg-white/10">
                Browse Jobs
              </Button>
            </Link>
            <Link href={FRONTEND_ROUTES.ABOUT}>
              <Button variant="ghost" size="sm" className="hover:bg-white/10">
                About
              </Button>
            </Link>
            <Link href={FRONTEND_ROUTES.CONTACT}>
              <Button variant="ghost" size="sm" className="hover:bg-white/10">
                Contact
              </Button>
            </Link>
            {user?.role === "recruiter" && (
              <Link href={FRONTEND_ROUTES.RECRUITER.JOBS.BASE}>
                <Button variant="ghost" size="sm" className="hover:bg-white/10">
                  My Jobs
                </Button>
              </Link>
            )}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </Button>
          </motion.div>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.firstName} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <div className="mt-1">{getRoleBadge()}</div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={FRONTEND_ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href={FRONTEND_ROUTES.SIGNUP}>
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
