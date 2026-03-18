'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    setError('Invalid credentials.');
    setLoading(false);
    return;
  }

  router.push('/admin/dashboard');
};

  return (
    <div className="min-h-screen bg-noir flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-display text-3xl font-light text-cream mb-1">Sapore Di Mare</p>
          <p className="font-mono-label text-[10px] tracking-widest uppercase text-gold/50">Staff Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <p className="text-red-400 text-sm border border-red-800/40 bg-red-900/20 px-4 py-3">
              {error}
            </p>
          )}
          <div>
            <label className="block section-label text-[10px] mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-noir-mid border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block section-label text-[10px] mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-noir-mid border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold-filled py-3 font-mono-label text-xs tracking-widest uppercase disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}