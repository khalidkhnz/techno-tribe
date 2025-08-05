"use client";

interface WithoutLayoutProps {
  children: React.ReactNode;
}

export default function WithoutLayout({ children }: WithoutLayoutProps) {
  return children;
} 