'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { LayoutDashboard, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie.includes('token=');
    setIsLoggedIn(token);
  }, []);

  return (
    <nav className="w-full z-50 bg-[#0F1C2E] border-b border-white/10 py-4 relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#C9D6DF] to-[#EAF4FB] shadow-lg shadow-blue-500/20">
             <Shield className="h-4 w-4 text-[#1E3A5F]" />
          </div>
          <span className="text-2xl font-heading font-bold tracking-tighter text-white">
            TAKRA<span className="text-accent">.</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button variant="metallic" size="sm" className="gap-2 shadow-blue-500/20 hover:shadow-blue-500/40">
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10">Log In</Button>
              </Link>
              <Link href="/register">
                <Button variant="frost" size="sm" className="shadow-none border-white/20 hover:border-white/40">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
