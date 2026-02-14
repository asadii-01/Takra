'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Client-side protection
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1B263B]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#A2C2E1] border-t-transparent"></div>
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
