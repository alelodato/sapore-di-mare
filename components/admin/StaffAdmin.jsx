'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, X, ChefHat, Shield, User, ToggleLeft, ToggleRight } from 'lucide-react';
import clsx from 'clsx';

const roleConfig = {
  owner: { label: 'Owner', icon: Shield, color: 'text-gold border-gold/30' },
  manager: { label: 'Manager', icon: ChefHat, color: 'text-blue-400 border-blue-400/30' },
  staff: { label: 'Staff', icon: User, color: 'text-cream/50 border-white/20' },
};

export default function StaffAdmin({ profiles, currentRole }) {
  const [staff, setStaff] = useState(profiles);
  const [showInvite, setShowInvite] = useState(false);
  const [form, setForm] = useState({ email: '', full_name: '', password: '', role: 'staff' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const toggleActive = async (id, active) => {
    await supabase.from('profiles').update({ active: !active }).eq('id', id);
    setStaff(prev => prev.map(p => p.id === id ? { ...p, active: !active } : p));
  };

  const changeRole = async (id, role) => {
    await supabase.from('profiles').update({ role }).eq('id', id);
    setStaff(prev => prev.map(p => p.id === id ? { ...p, role } : p));
  };

  const inviteStaff = async () => {
    setLoading(true);
    setError('');
    // Crea utente via Supabase Admin API (serve service_role key lato server)
    // Per ora usiamo signUp standard
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    if (authError) { setError(authError.message); setLoading(false); return; }

    if (data.user) {
      await supabase.from('profiles').insert([{
        id: data.user.id,
        email: form.email,
        full_name: form.full_name,
        role: form.role,
      }]);
      const { data: newProfile } = await supabase
        .from('profiles').select('*').eq('id', data.user.id).single();
      if (newProfile) setStaff(prev => [...prev, newProfile]);
    }

    setShowInvite(false);
    setForm({ email: '', full_name: '', password: '', role: 'staff' });
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label mb-2">Manage</p>
          <h1 className="font-display text-4xl font-light text-cream">Staff</h1>
        </div>
        <button onClick={() => setShowInvite(true)} className="btn-gold text-xs py-2.5 flex items-center gap-2">
          <Plus size={14} /> Add Staff
        </button>
      </div>

      <div className="space-y-3">
        {staff.map(p => {
          const RoleIcon = roleConfig[p.role]?.icon ?? User;
          return (
            <div key={p.id} className={clsx('flex items-center justify-between p-5 border transition-colors',
              p.active ? 'border-white/5 hover:border-gold/10' : 'border-white/3 opacity-50'
            )}>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <RoleIcon size={16} className="text-cream/50" />
                </div>
                <div>
                  <p className="font-display text-lg font-light text-cream">{p.full_name || p.email}</p>
                  <p className="text-cream/30 text-xs">{p.email}</p>
                </div>
                <span className={clsx('font-mono-label text-[9px] tracking-widest uppercase border px-2 py-1', roleConfig[p.role]?.color)}>
                  {roleConfig[p.role]?.label}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Change role — owner can change anyone, manager can only change staff */}
                {currentRole === 'owner' && (
                  <select value={p.role} onChange={e => changeRole(p.id, e.target.value)}
                    className="bg-noir border border-white/10 text-cream/60 text-xs px-3 py-1.5 focus:outline-none focus:border-gold/30"
                  >
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="owner">Owner</option>
                  </select>
                )}
                <button onClick={() => toggleActive(p.id, p.active)}
                  className={clsx('transition-colors', p.active ? 'text-green-500 hover:text-red-400' : 'text-red-400/50 hover:text-green-500')}
                >
                  {p.active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/90 backdrop-blur-sm">
          <div className="bg-noir-mid border border-white/10 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-display text-2xl font-light text-cream">Add Staff Member</h2>
              <button onClick={() => setShowInvite(false)} className="text-cream/40 hover:text-gold transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {error && <p className="text-red-400 text-sm border border-red-800/40 bg-red-900/20 px-4 py-3">{error}</p>}
              <div>
                <label className="block section-label text-[10px] mb-2">Full Name</label>
                <input value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))}
                  className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50" />
              </div>
              <div>
                <label className="block section-label text-[10px] mb-2">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50" />
              </div>
              <div>
                <label className="block section-label text-[10px] mb-2">Temporary Password *</label>
                <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50" />
              </div>
              <div>
                <label className="block section-label text-[10px] mb-2">Role</label>
                <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                  className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  {currentRole === 'owner' && <option value="owner">Owner</option>}
                </select>
              </div>
              <button onClick={inviteStaff} disabled={loading}
                className="w-full btn-gold-filled py-3 font-mono-label text-xs tracking-widest uppercase disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}