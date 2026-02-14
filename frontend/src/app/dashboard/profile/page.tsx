'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import Cookies from 'js-cookie';
import { API_URL } from '@/lib/config';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = Cookies.get('token');
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const token = Cookies.get('token');

    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          email,
          ...(password && { password }),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully!');
        setUser(data);
        // Update local storage and cookie with fresh token
        localStorage.setItem('user', JSON.stringify(data));
        if (data.token) {
          Cookies.set('token', data.token);
        }
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-white">Profile Settings</h1>
        <p className="mt-1 text-blue-200/60">Manage your account information and security.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Account Overview Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/5 border-white/10 overflow-hidden">
            {/* Gradient banner */}
            <div className="h-24 bg-gradient-to-br from-accent/40 via-blue-600/30 to-purple-600/20" />
            <CardContent className="pt-0 -mt-10 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-3xl font-bold text-[#0F1C2E] ring-4 ring-[#0F1C2E] shadow-xl">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">{user?.username || 'Loading...'}</h2>
              <p className="text-sm text-blue-200/50">{user?.email}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Active Account
              </span>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-200/70 uppercase tracking-wider">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-sm text-blue-200/50">Role</span>
                <span className="text-sm font-medium text-white capitalize">{user?.role || '—'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-sm text-blue-200/50">Member Since</span>
                <span className="text-sm font-medium text-white">2026</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-blue-200/50">Status</span>
                <span className="text-sm font-medium text-green-400">Verified</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Edit Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-white">Edit Profile</CardTitle>
              <CardDescription className="text-blue-200/50">Update your personal information and password.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Success / Error Messages */}
                {message && (
                  <div className="flex items-center gap-3 rounded-lg bg-green-500/10 p-4 text-sm text-green-400 border border-green-500/20">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    {message}
                  </div>
                )}
                {error && (
                  <div className="flex items-center gap-3 rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-200">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-200/40" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-lg bg-black/20 border border-white/10 pl-10 py-3 pr-4 text-white placeholder-blue-200/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-200">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-200/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg bg-black/20 border border-white/10 pl-10 py-3 pr-4 text-white placeholder-blue-200/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password Section */}
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-lg font-medium text-white mb-1">Change Password</h3>
                  <p className="text-sm text-blue-200/40 mb-4">Leave blank to keep your current password.</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-200">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-200/40" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-lg bg-black/20 border border-white/10 pl-10 py-3 pr-4 text-white placeholder-blue-200/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-200">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-200/40" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-lg bg-black/20 border border-white/10 pl-10 py-3 pr-4 text-white placeholder-blue-200/30 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                  <Button type="submit" variant="metallic" disabled={loading} className="min-w-[160px]">
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
