'use client';

import Link from 'next/link';
import { Trophy, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#1E3A5F] mb-2">Admin Dashboard</h1>
        <p className="text-slate-500">Manage platform content and users.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Competitions Management Card */}
        <Link href="/dashboard/admin/competitions" className="group">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <Trophy size={32} className="text-yellow-500" />
              <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Manage
              </Button>
            </div>
            <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">Competitions</h3>
            <p className="text-sm text-slate-500">Create, edit, or delete competitions.</p>
          </div>
        </Link>
        
        {/* Users Management Card (Placeholder) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm opacity-60 cursor-not-allowed">
            <div className="flex items-center justify-between mb-4">
              <Users size={32} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">Users</h3>
            <p className="text-sm text-slate-500">User management coming soon.</p>
        </div>
      </div>
    </div>
  );
}
