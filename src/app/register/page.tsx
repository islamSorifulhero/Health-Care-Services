'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const COLORS = ['#E74C3C', '#E67E22', '#F1C40F', '#2ECC71', '#27AE60', '#1A8A4A'];

export default function RegisterPage() {
  const { register, googleLogin } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', nid: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const handleRedirect = () => {
    const pending = sessionStorage.getItem('pendingBooking');
    if (pending) { sessionStorage.removeItem('pendingBooking'); router.push(`/booking/${pending}`); }
    else router.push('/');
  };

  const handleRegister = async () => {
    setError('');
    if (!form.name || !form.nid || !form.email || !form.phone || !form.password || !form.confirm) {
      setError('Please fill in all fields'); return;
    }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    const res = await register({ name: form.name, email: form.email, password: form.password, phone: form.phone, nid: form.nid });
    setLoading(false);
    if (res.success) {
      toast.success('Account created! 🎉');
      handleRedirect();
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  const handleGoogle = async () => {
    await googleLogin();
    toast.success('Signed in with Google ✅');
    handleRedirect();
  };

  const strength = getStrength(form.password);

  return (
    <div className="min-h-screen pt-[72px] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-cream to-warm-white">
      <div className="bg-white rounded-3xl p-10 max-w-lg w-full border border-border shadow-card-lg">
        <div className="text-center mb-8">
          <Link href="/" className="font-playfair text-2xl font-bold text-charcoal">
            Care<span className="text-sage">.xyz</span><span className="w-2 h-2 bg-terracotta rounded-full inline-block ml-0.5 mb-1" />
          </Link>
          <h2 className="font-playfair text-3xl font-bold text-[#1A1A1A] mt-4 mb-1">Create Account</h2>
          <p className="text-mid-gray text-sm">Join Care.xyz and find trusted caretakers for your family</p>
        </div>

        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-3 mb-2 font-medium text-sm hover:border-sage hover:shadow-card transition-all">
          🌐 Continue with Google
        </button>

        <div className="flex items-center gap-3 my-5 text-xs text-mid-gray">
          <div className="flex-1 h-px bg-border" /> or register with email <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: 'Full Name', key: 'name', type: 'text', ph: 'Your full name' },
            { label: 'NID Number', key: 'nid', type: 'text', ph: 'NID No.' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-charcoal mb-2">{f.label}</label>
              <input type={f.type} value={(form as any)[f.key]} onChange={set(f.key)} placeholder={f.ph} className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm focus:border-sage focus:outline-none focus:bg-white" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: 'Email Address', key: 'email', type: 'email', ph: 'you@example.com' },
            { label: 'Contact Number', key: 'phone', type: 'tel', ph: '01XXXXXXXXX' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-charcoal mb-2">{f.label}</label>
              <input type={f.type} value={(form as any)[f.key]} onChange={set(f.key)} placeholder={f.ph} className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm focus:border-sage focus:outline-none focus:bg-white" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-2">Password</label>
            <input type="password" value={form.password} onChange={set('password')} placeholder="Min 6 chars" className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm focus:border-sage focus:outline-none focus:bg-white" />
            <div className="h-1 bg-light-gray rounded mt-2 overflow-hidden">
              <div className="h-full rounded transition-all duration-300" style={{ width: `${(strength / 6) * 100}%`, background: COLORS[strength - 1] || 'transparent' }} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-2">Confirm Password</label>
            <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" className="w-full bg-cream border border-border rounded-xl px-4 py-3 text-sm focus:border-sage focus:outline-none focus:bg-white" />
          </div>
        </div>

        <p className="text-xs text-mid-gray mb-3">Password must be 6+ characters with at least 1 uppercase and 1 lowercase letter.</p>

        {error && <p className="text-terracotta text-xs mb-3">{error}</p>}

        <button onClick={handleRegister} disabled={loading} className="w-full bg-sage text-white py-3.5 rounded-2xl font-bold mt-2 hover:bg-sage-dark transition-colors disabled:opacity-60">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="text-center mt-5 text-sm text-mid-gray">
          Already have an account?{' '}
          <Link href="/login" className="text-sage font-semibold hover:underline">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
