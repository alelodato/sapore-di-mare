import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Calendar, Users, UtensilsCrossed, TrendingUp } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  const { data: profile, error: profileError } = user
    ? await supabase.from('profiles').select('*').eq('id', user.id).single()
    : { data: null, error: null };

  // Debug temporaneo
  if (!user || !profile?.active) {
    return (
      <div className="min-h-screen bg-noir p-8 text-cream font-mono text-sm space-y-4">
        <h1 className="text-gold text-xl mb-6">Debug Info</h1>
        <p><span className="text-gold/60">User:</span> {JSON.stringify(user)}</p>
        <p><span className="text-gold/60">User Error:</span> {JSON.stringify(userError)}</p>
        <p><span className="text-gold/60">Profile:</span> {JSON.stringify(profile)}</p>
        <p><span className="text-gold/60">Profile Error:</span> {JSON.stringify(profileError)}</p>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  const [
    { count: todayCount },
    { count: upcomingCount },
    { count: itemsCount },
    { count: staffCount },
  ] = await Promise.all([
    supabase.from('reservations').select('*', { count: 'exact', head: true }).eq('date', today),
    supabase.from('reservations').select('*', { count: 'exact', head: true }).gte('date', today),
    supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('active', true),
  ]);

  const { data: todayReservations } = await supabase
    .from('reservations')
    .select('*')
    .eq('date', today)
    .order('time');

  const stats = [
    { label: "Today's Covers", value: todayCount ?? 0, icon: Calendar, href: '/admin/reservations' },
    { label: 'Upcoming', value: upcomingCount ?? 0, icon: TrendingUp, href: '/admin/reservations' },
    { label: 'Menu Items', value: itemsCount ?? 0, icon: UtensilsCrossed, href: '/admin/menu' },
    { label: 'Staff', value: staffCount ?? 0, icon: Users, href: '/admin/staff' },
  ];

  return (
    <div className="min-h-screen bg-noir flex">
      <AdminSidebar profile={profile} />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-10">
          <p className="section-label mb-2">Overview</p>
          <h1 className="font-display text-4xl font-light text-cream">Dashboard</h1>
          <p className="text-cream/40 text-sm mt-2">
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <Link key={s.label} href={s.href}
              className="p-6 border border-white/5 hover:border-gold/20 transition-colors group"
            >
              <s.icon size={18} className="text-gold/50 mb-4 group-hover:text-gold transition-colors" />
              <p className="font-display text-4xl font-light text-cream mb-1">{s.value}</p>
              <p className="font-mono-label text-[9px] text-cream/30 tracking-widest uppercase">{s.label}</p>
            </Link>
          ))}
        </div>

        <h2 className="font-display text-2xl font-light text-cream mb-6">
          Today's <span className="italic text-gold">Reservations</span>
        </h2>
        {!todayReservations?.length ? (
          <div className="py-12 text-center border border-white/5">
            <p className="text-cream/30 font-light">No reservations today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayReservations.map((r) => (
              <div key={r.id}
                className="flex items-center justify-between p-5 border border-white/5 hover:border-gold/10 transition-colors"
              >
                <div className="flex items-center gap-8">
                  <span className="font-mono-label text-sm text-gold w-14">{r.time}</span>
                  <span className="font-display text-lg font-light text-cream">{r.name}</span>
                  {r.notes && (
                    <span className="text-cream/30 text-xs italic hidden md:block">{r.notes}</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono-label text-xs text-cream/40">{r.guests} guests</span>
                  <span className="font-mono-label text-[9px] tracking-widest uppercase text-gold/50 border border-gold/20 px-2 py-1">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}