"use client";

import { Header } from "@/components/layout/header";
import { PlatformIntro } from "@/components/ui/platform-intro";

interface WithLayoutProps {
  children: React.ReactNode;
}

export default function WithLayout({ children }: WithLayoutProps) {
  return (
    <PlatformIntro>
      <div className="min-h-screen bg-background">
        <Header user={null} />
        <div className="flex">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </PlatformIntro>
  );
} 