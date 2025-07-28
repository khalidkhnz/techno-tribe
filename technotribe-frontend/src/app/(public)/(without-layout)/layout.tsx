"use client";

import { PlatformIntro } from "@/components/ui/platform-intro";

interface WithoutLayoutProps {
  children: React.ReactNode;
}

export default function WithoutLayout({ children }: WithoutLayoutProps) {
  return (
    <PlatformIntro>
      {children}
    </PlatformIntro>
  );
} 