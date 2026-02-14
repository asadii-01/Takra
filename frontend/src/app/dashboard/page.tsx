'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trophy, Users, TrendingUp, Star, Settings, Plus, BarChart3, Activity } from 'lucide-react';
import Cookies from 'js-cookie';
import { API_URL } from '@/lib/config';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        setUser(parsed);
        if (parsed.role === 'admin') {
          fetchAdminStats();
        } else {
          fetchUserStats(parsed._id);
        }
      } catch (e) {
        console.error('Failed to parse user data');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAdminStats = async () => {
    const token = Cookies.get('token');
    try {
      const res = await fetch(`${API_URL}/competitions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const competitions = await res.json();
      const totalParticipants = competitions.reduce(
        (sum: number, c: any) => sum + (c.participants?.length || 0), 0
      );
      setStats({
        totalCompetitions: competitions.length,
        totalRegistrations: totalParticipants,
        activeCompetitions: competitions.filter((c: any) => new Date(c.endDate) > new Date()).length,
        recentCompetitions: competitions.slice(0, 3),
      });
    } catch (err) {
      console.error('Failed to fetch admin stats', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async (userId: string) => {
    const token = Cookies.get('token');
    try {
      const res = await fetch(`${API_URL}/competitions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const competitions = await res.json();
      const myCompetitions = competitions.filter((c: any) =>
        c.participants?.some((p: any) => p === userId || p.toString?.() === userId)
      );
      setStats({
        myCompetitions: myCompetitions.length,
        totalAvailable: competitions.length,
        upcomingCompetitions: myCompetitions.filter((c: any) => new Date(c.startDate) > new Date()),
        recentCompetitions: myCompetitions.slice(0, 3),
      });
    } catch (err) {
      console.error('Failed to fetch user stats', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-white">
          {isAdmin ? 'Admin Dashboard' : 'Welcome back'}, {user?.username || 'User'}!
        </h1>
        <p className="mt-1 text-blue-200/60">
          {isAdmin
            ? 'Manage platform content and monitor activity.'
            : "Here's an overview of your competition activity."}
        </p>
      </div>

      {/* =================== ADMIN VIEW =================== */}
      {isAdmin ? (
        <>
          {/* Admin Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Competitions', value: stats?.totalCompetitions ?? '—', icon: Trophy, color: 'text-yellow-400 bg-yellow-400/10' },
              { label: 'Active Competitions', value: stats?.activeCompetitions ?? '—', icon: Activity, color: 'text-green-400 bg-green-400/10' },
              { label: 'Total Registrations', value: stats?.totalRegistrations ?? '—', icon: Users, color: 'text-blue-400 bg-blue-400/10' },
              { label: 'Platform Status', value: 'Online', icon: BarChart3, color: 'text-emerald-400 bg-emerald-400/10' },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-[#162032] p-6 transition-all hover:border-white/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-blue-200/60">{stat.label}</p>
                  <div className={`rounded-lg p-2 ${stat.color}`}>
                    <stat.icon size={18} />
                  </div>
                </div>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Admin Quick Actions */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/admin/competitions" className="group">
              <div className="rounded-xl border border-white/10 bg-[#162032] p-6 transition-all hover:border-accent/30 hover:shadow-[0_0_20px_rgba(143,211,255,0.05)]">
                <div className="flex items-center justify-between mb-4">
                  <Trophy size={28} className="text-yellow-400" />
                  <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                    Manage →
                  </Button>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Manage Competitions</h3>
                <p className="text-sm text-blue-200/50">Create, edit, or delete competitions.</p>
              </div>
            </Link>

            <div className="rounded-xl border border-white/10 bg-[#162032] p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <Users size={28} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">User Management</h3>
              <p className="text-sm text-blue-200/50">Coming soon.</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#162032] p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <Settings size={28} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Platform Settings</h3>
              <p className="text-sm text-blue-200/50">Coming soon.</p>
            </div>
          </div>

          {/* Recent Competitions */}
          {stats?.recentCompetitions?.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-[#162032] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Recent Competitions</h3>
                <Link href="/dashboard/admin/competitions">
                  <Button variant="ghost" size="sm" className="text-accent">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {stats.recentCompetitions.map((comp: any) => (
                  <div key={comp._id} className="flex items-center justify-between rounded-lg bg-black/20 p-4 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                        <Trophy size={18} className="text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{comp.title}</p>
                        <p className="text-xs text-blue-200/50">{comp.type} · {comp.participants?.length || 0} participants</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${new Date(comp.endDate) > new Date() ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {new Date(comp.endDate) > new Date() ? 'Active' : 'Ended'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* =================== USER VIEW =================== */
        <>
          {/* User Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'My Competitions', value: stats?.myCompetitions ?? '0', icon: Trophy, color: 'text-yellow-400 bg-yellow-400/10' },
              { label: 'Available', value: stats?.totalAvailable ?? '0', icon: Star, color: 'text-accent bg-accent/10' },
              { label: 'Upcoming', value: stats?.upcomingCompetitions?.length ?? '0', icon: TrendingUp, color: 'text-green-400 bg-green-400/10' },
              { label: 'Profile', value: 'Active', icon: Users, color: 'text-blue-400 bg-blue-400/10' },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-[#162032] p-6 transition-all hover:border-white/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-blue-200/60">{stat.label}</p>
                  <div className={`rounded-lg p-2 ${stat.color}`}>
                    <stat.icon size={18} />
                  </div>
                </div>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Link href="/dashboard/competitions" className="group">
              <div className="rounded-xl border border-white/10 bg-[#162032] p-6 transition-all hover:border-accent/30 hover:shadow-[0_0_20px_rgba(143,211,255,0.05)]">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy size={24} className="text-yellow-400" />
                  <h3 className="text-lg font-bold text-white">Browse Competitions</h3>
                </div>
                <p className="text-sm text-blue-200/50">Discover and join new challenges.</p>
              </div>
            </Link>
            <Link href="/dashboard/profile" className="group">
              <div className="rounded-xl border border-white/10 bg-[#162032] p-6 transition-all hover:border-accent/30 hover:shadow-[0_0_20px_rgba(143,211,255,0.05)]">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={24} className="text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Edit Profile</h3>
                </div>
                <p className="text-sm text-blue-200/50">Update your account information.</p>
              </div>
            </Link>
          </div>

          {/* My Recent Competitions */}
          <div className="rounded-xl border border-white/10 bg-[#162032] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">My Competitions</h3>
              <Link href="/dashboard/competitions">
                <Button variant="ghost" size="sm" className="text-accent">View All</Button>
              </Link>
            </div>
            {stats?.recentCompetitions?.length > 0 ? (
              <div className="space-y-3">
                {stats.recentCompetitions.map((comp: any) => (
                  <div key={comp._id} className="flex items-center justify-between rounded-lg bg-black/20 p-4 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Trophy size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{comp.title}</p>
                        <p className="text-xs text-blue-200/50">{comp.type} · Starts {new Date(comp.startDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${new Date(comp.endDate) > new Date() ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {new Date(comp.endDate) > new Date() ? 'Active' : 'Ended'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Trophy size={40} className="text-blue-200/20 mb-3" />
                <p className="text-blue-200/50 mb-4">You haven't joined any competitions yet.</p>
                <Link href="/dashboard/competitions">
                  <Button variant="frost" size="sm">Browse Competitions</Button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
