'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-[#A2C2E1]">
            Welcome back, {user?.username || 'User'}! Here's what's happening today.
          </p>
        </div>
        <Button>Create New Project</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Competitions', value: '3', change: '+1 this week' },
          { label: 'Total Submissions', value: '12', change: '+4 this month' },
          { label: 'Rank', value: '#42', change: 'Top 5%' },
          { label: 'Points', value: '1,250', change: '+150 today' },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="rounded-xl border border-[#A2C2E1]/10 bg-[#162032] p-6 shadow-sm transition-all hover:border-[#A2C2E1]/30"
          >
            <p className="text-sm font-medium text-[#A2C2E1]/70">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-xs font-medium text-[#F0F8FF]">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-[#A2C2E1]/10 bg-[#162032] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 rounded-lg bg-[#1B263B]/50 p-4 border border-[#A2C2E1]/5">
              <div className="h-10 w-10 rounded-full bg-[#A2C2E1]/10 flex items-center justify-center text-[#A2C2E1]">
                🎉
              </div>
              <div>
                <p className="font-medium text-white">Joined "Future of AI" Hackathon</p>
                <p className="text-sm text-[#A2C2E1]/60">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
