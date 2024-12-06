'use client';

import { NextFont } from 'next/dist/compiled/@next/font';
import MobileMenu from './MobileMenu';
import SideMenu from './SideMenu';

interface ClientLayoutProps {
  children: React.ReactNode;
  inter: NextFont;
}

export default function ClientLayout({ children, inter }: ClientLayoutProps) {
  return (
    <div className={`${inter.className} bg-white dark:bg-zinc-900`}>
      <div className="md:hidden">
        <MobileMenu />
      </div>
      <div className="hidden md:block">
        <SideMenu />
      </div>
      <main className="min-h-screen md:ml-36 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}