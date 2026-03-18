'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Calendar, UtensilsCrossed,
  Users, LogOut, ChefHat, LayoutGrid
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import clsx from 'clsx';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['owner','manager','staff'] },
  { href: '/admin/reservations', label: 'Reservations', icon: Calendar, roles: ['owner','manager','staff'] },
  { href: '/admin/menu', label: 'Menu', icon: UtensilsCrossed, roles: ['owner','manager'] },
  { href: '/admin/staff', label: 'Staff', icon: Users, roles: ['owner','manager'] },
  { href: '/admin/tables', label: 'Floor Plan', icon: LayoutGrid, roles: ['owner','manager'] },
];

export default function AdminSidebar({ profile }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const visibleItems = navItems.filter(item => item.roles.includes(profile.role));

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-noir-mid border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="font-display text-xl font-light text-cream hover:text-gold transition-colors">
          Sapore Di Mare
        </Link>
        <p className="font-mono-label text-[9px] text-gold/50 tracking-widest uppercase mt-1">
          Admin Panel
        </p>
      </div>

      {/* Profile */}
      <div className="px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
            <ChefHat size={14} className="text-gold" />
          </div>
          <div>
            <p className="text-cream text-xs font-medium">{profile.full_name || profile.email}</p>
            <p className="font-mono-label text-[9px] text-gold/60 tracking-widest uppercase">{profile.role}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 transition-all duration-200 group',
              pathname === item.href
                ? 'bg-gold/10 border border-gold/20 text-gold'
                : 'text-cream/50 hover:text-cream hover:bg-white/5 border border-transparent'
            )}
          >
            <item.icon size={15} />
            <span className="font-mono-label text-[10px] tracking-widest uppercase">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-cream/30 hover:text-red-400 transition-colors"
        >
          <LogOut size={15} />
          <span className="font-mono-label text-[10px] tracking-widest uppercase">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}