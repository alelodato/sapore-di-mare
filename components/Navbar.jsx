'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import clsx from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'Menus',
    children: [
      { href: '/menu', label: 'All Menus' },
      { href: '/menu/a-la-carte', label: 'À La Carte' },
      { href: '/menu/dessert', label: 'Dessert' },
      { href: '/menu/wine-list', label: 'Wine List' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/booking', label: 'Reservations' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuDropdown(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-noir/95 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl font-light tracking-widest text-cream hover:text-gold transition-colors duration-300"
        >
          Sapore Di Mare
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button
                  className="flex items-center gap-1 font-mono-label text-xs tracking-widest uppercase text-cream/70 hover:text-sea transition-colors duration-300"
                  onMouseEnter={() => setMenuDropdown(true)}
                  onMouseLeave={() => setMenuDropdown(false)}
                >
                  {link.label}
                  <ChevronDown size={12} />
                </button>
                <div
                  onMouseEnter={() => setMenuDropdown(true)}
                  onMouseLeave={() => setMenuDropdown(false)}
                  className={clsx(
                    'absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200',
                    menuDropdown ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
                  )}
                >
                  <div className="bg-noir-mid border border-white/10 min-w-[180px] py-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={clsx(
                          'block px-5 py-2.5 font-mono-label text-xs tracking-widest uppercase transition-colors duration-200',
                          pathname === child.href ? 'text-gold' : 'text-cream/60 hover:text-sea hover:bg-white/5'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-mono-label text-xs tracking-widest uppercase transition-colors duration-300',
                  pathname === link.href ? 'text-gold' : 'text-cream/70 hover:text-sea'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Auth + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <button
              onClick={handleSignOut}
              className="font-mono-label text-xs tracking-widest uppercase text-cream/50 hover:text-sea transition-colors duration-300"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="font-mono-label text-xs tracking-widest uppercase text-cream/50 hover:text-sea transition-colors duration-300"
            >
              Sign In
            </Link>
          )}
          <Link href="/booking" className="btn-gold text-xs py-2.5 px-6">
            Book a Table
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-cream/70 hover:text-sea transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'lg:hidden overflow-hidden transition-all duration-500 bg-noir/98 backdrop-blur-md',
          mobileOpen ? 'max-h-screen py-6' : 'max-h-0'
        )}
      >
        <div className="px-6 flex flex-col gap-1">
          <Link href="/" className="mobile-nav-link">Home</Link>
          <div className="pt-2 pb-1">
            <span className="section-label text-[10px]">Menus</span>
          </div>
          {navLinks[1].children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={clsx(
                'mobile-nav-link pl-4',
                pathname === child.href ? 'text-gold' : ''
              )}
            >
              {child.label}
            </Link>
          ))}
          <Link href="/about" className="mobile-nav-link">About</Link>
          <Link href="/booking" className="mobile-nav-link">Reservations</Link>
          <div className="pt-4 border-t border-white/10 mt-2 flex flex-col gap-3">
            {user ? (
              <button onClick={handleSignOut} className="mobile-nav-link text-left">Sign Out</button>
            ) : (
              <Link href="/auth/login" className="mobile-nav-link">Sign In</Link>
            )}
            <Link href="/booking" className="btn-gold text-center text-xs py-3">
              Book a Table
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-nav-link {
          display: block;
          padding: 10px 0;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(244, 241, 236, 0.7);
          transition: color 0.2s;
        }
        .mobile-nav-link:hover {
          color: #5F8FA6;
        }
      `}</style>
    </header>
  );
}
