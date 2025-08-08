"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PlatformIntroProps {
  children: React.ReactNode;
}

export function PlatformIntro({ children }: PlatformIntroProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("TechnoTribes_visited");
    
    if (!visited) {
      setShowIntro(true);
      sessionStorage.setItem("TechnoTribes_visited", "true");
      
      const timer = setTimeout(() => {
        setShowIntro(false);
        setHasVisited(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setHasVisited(true);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
                                <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ y: "-100vh", opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[999999] bg-background flex items-center justify-center"
                      >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-4"
              >
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  TechnoTribes
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground font-medium"
              >
                Where Developers Meet Opportunities
              </motion.p>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-8"
              >
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.3 }}
                      className="w-3 h-3 bg-primary rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
                        {hasVisited && children}
    </>
  );
} 