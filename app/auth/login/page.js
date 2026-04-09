'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/booking';

  const supabase = createClient();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      router.push(next);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-800/50 text-red-400 text-sm font-light">
          {error}
        </div>
      )}

      <div>
        <label className="block section-label text-[10px] mb-2">Email Address</label>
        <input
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={set('email')}
          placeholder="your@email.com"
          className="w-full bg-noir-soft border border-white/10 text-black text-sm px-4 py-3 placeholder:text-black/20 focus:outline-none focus:border-gold/50 transition-colors"
        />
      </div>

      <div>
        <label className="block section-label text-[10px] mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            value={form.password}
            onChange={set('password')}
            placeholder="••••••••"
            className="w-full bg-noir-soft border border-white/10 text-black text-sm px-4 py-3 pr-12 placeholder:text-black/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-gold transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gold-filled py-4 font-mono-label text-xs tracking-widest uppercase disabled:opacity-50 mt-2"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      <p className="text-center text-cream/30 text-sm font-light pt-2">
        Don't have an account?{' '}
        <Link href="/auth/register" className="text-gold hover:text-gold-light transition-colors">
          Create one
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Image */}
      <div className="hidden lg:block relative">
        <Image
          src="/guests.png"
          alt="Sapore Di Mare dining experience"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/50 to-noir/80" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="section-label mb-4 text-gold/70">Members Area</p>
          <h2 className="font-display text-5xl font-light text-cream leading-tight mb-4">
            Reserve your<br />
            <span className="italic text-gold">favourite table</span>
          </h2>
          <p className="text-cream/40 font-light max-w-sm">
            Sign in to manage your reservations, view your dining history and enjoy a seamless booking experience.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="font-display text-4xl font-light text-cream mt-8 mb-2">Welcome Back</h1>
            <p className="text-cream/40 font-light text-sm">Sign in to your account</p>
          </div>

          <Suspense fallback={<div className="animate-pulse h-64 bg-white/5" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
