'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    const pending = sessionStorage.getItem('pendingBooking');
    if (pending) {
      sessionStorage.removeItem('pendingBooking');
      router.push(`/booking/${pending}`);
    } else {
      router.push('/');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      toast.success('Welcome back! 👋');
      handleRedirect();
    } else {
      setError(res.error || 'Login failed');
    }
  };

  const handleGoogle = async () => {
    await googleLogin();
    toast.success('Signed in with Google ✅');
    handleRedirect();
  };

  return (
    <div className="min-h-screen pt-[72px] flex items-center justify-center px-4 bg-gradient-to-br from-cream to-warm-white">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full border border-border shadow-card-lg">
        <div className="text-center mb-8">
          <Link href="/" className="font-playfair text-2xl font-bold text-charcoal">
            Care<span className="text-sage">.xyz</span><span className="w-2 h-2 bg-terracotta rounded-full inline-block ml-0.5 mb-1" />
          </Link>
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mt-4 mb-1">Welcome Back</h2>
          <p className="text-mid-gray text-sm">Sign in to access your bookings and services</p>
        </div>

        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-3 mb-2 font-medium text-sm hover:border-sage hover:shadow-card transition-all">
          🌐 Continue with Google
        </button>

        <div className="flex items-center gap-3 my-5 text-xs text-mid-gray">
          <div className="flex-1 h-px bg-border" />
          or sign in with email
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-charcoal mb-2">Email Address</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm focus:border-sage focus:outline-none focus:bg-white"
          />
        </div>
        <div className="mb-2">
          <label className="block text-xs font-semibold text-charcoal mb-2">Password</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm focus:border-sage focus:outline-none focus:bg-white"
          />
        </div>
        {error && <p className="text-terracotta text-xs mt-1 mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-sage text-white py-3.5 rounded-2xl font-bold mt-4 hover:bg-sage-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-center mt-5 text-sm text-mid-gray">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-sage font-semibold hover:underline">Create one →</Link>
        </p>
      </div>
    </div>
  );
}
