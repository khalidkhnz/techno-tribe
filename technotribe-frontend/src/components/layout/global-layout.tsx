"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./header";
import { GlobalSidebar } from "./global-sidebar";
import { useUser } from "@/hooks/use-api";

interface GlobalLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function GlobalLayout({
  children,
  showSidebar = true,
}: GlobalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: userResponse } = useUser();
  const user = userResponse?.data;

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />

      <div className="flex">
        {showSidebar && (
          <GlobalSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            user={user}
          />
        )}

        <motion.main
          className={`flex-1 transition-all duration-300 ${
            showSidebar ? "md:ml-64" : ""
          }`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  typeof window !== "undefined"
                    ? window.location.pathname
                    : "default"
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
