'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const supabase = createClient();

  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/confirm`,
      },
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setSuccess(true);
    }
  };

  const passwordStrength = (p) => {
    if (!p) return null;
    if (p.length < 6) return 'weak';
    if (p.length < 10 || !/[0-9]/.test(p)) return 'medium';
    return 'strong';
  };

  const strength = passwordStrength(form.password);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1550966871-3ed3cfd27aca?w=1200&q=85"
          alt="Sapore Di Mare table setting"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-noir/80" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="section-label mb-4 text-gold/70">Join Us</p>
          <h2 className="font-display text-5xl font-light text-cream leading-tight mb-4">
            Begin your<br />
            <span className="italic text-gold">Sapore experience</span>
          </h2>
          <p className="text-cream/40 font-light max-w-sm">
            Create an account to make and manage your reservations, and enjoy the full Sapore Di Mare experience.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <Link href="/" className="font-display text-2xl font-light tracking-widest text-cream hover:text-gold transition-colors">
              Sapore Di Mare
            </Link>
            <h1 className="font-display text-4xl font-light text-cream mt-8 mb-2">
              Create Account
            </h1>
            <p className="text-cream/40 font-light text-sm">Join and start booking</p>
          </div>

          {success ? (
            /* Success state */
            <div className="py-8 text-center">
              <CheckCircle size={48} className="text-gold mx-auto mb-6" />
              <h2 className="font-display text-3xl font-light text-cream mb-4">Check Your Email</h2>
              <p className="text-cream/50 font-light text-sm leading-relaxed mb-8">
                We've sent a confirmation link to{' '}
                <span className="text-gold">{form.email}</span>.<br />
                Please click the link to verify your account and complete registration.
              </p>
              <Link href="/auth/login" className="btn-gold text-xs py-3 px-8">
                Back to Sign In
              </Link>
            </div>
          ) : (
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
                  className="w-full bg-noir-soft border border-white/10 text-cream text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block section-label text-[10px] mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={form.password}
                    onChange={set('password')}
                    placeholder="Minimum 8 characters"
                    className="w-full bg-noir-soft border border-white/10 text-cream text-sm px-4 py-3 pr-12 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Strength indicator */}
                {strength && (
                  <div className="flex gap-1 mt-2">
                    {['weak', 'medium', 'strong'].map((level, i) => (
                      <div
                        key={level}
                        className={`h-0.5 flex-1 transition-colors duration-300 ${
                          ['weak', 'medium', 'strong'].indexOf(strength) >= i
                            ? strength === 'weak'
                              ? 'bg-red-500'
                              : strength === 'medium'
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block section-label text-[10px] mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={form.confirm}
                    onChange={set('confirm')}
                    placeholder="Repeat your password"
                    className={`w-full bg-noir-soft border text-cream text-sm px-4 py-3 pr-12 placeholder:text-cream/20 focus:outline-none transition-colors ${
                      form.confirm && form.confirm !== form.password
                        ? 'border-red-800/50 focus:border-red-700'
                        : 'border-white/10 focus:border-gold/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-gold transition-colors"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-red-400 text-xs mt-1.5 font-light">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold-filled py-4 font-mono-label text-xs tracking-widest uppercase disabled:opacity-50 mt-2"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-center text-cream/30 text-sm font-light pt-2">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-gold hover:text-gold-light transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
