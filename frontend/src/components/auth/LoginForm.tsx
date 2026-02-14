'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Set cookie for middleware
        Cookies.set('token', data.token, { expires: 7 });
        // Keep user info in localStorage for display
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <div className="text-center">
        <h2 className="text-3xl font-heading font-bold text-white tracking-wide">Welcome Back</h2>
        <p className="mt-2 text-sm text-blue-200/70">
          Or{' '}
          <Link href="/register" className="font-medium text-accent hover:text-white transition-colors">
            create a new account
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && <div className="rounded bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">{error}</div>}
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <input
              type="email"
              required
              className="relative block w-full rounded-lg border border-white/10 bg-black/20 p-4 text-white placeholder-blue-200/30 focus:z-10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              required
              className="relative block w-full rounded-lg border border-white/10 bg-black/20 p-4 text-white placeholder-blue-200/30 focus:z-10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full py-6 text-lg font-bold tracking-wider" variant="metallic">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
