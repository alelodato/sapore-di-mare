import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menus' },
  { href: '/menu/a-la-carte', label: 'À La Carte' },
  { href: '/menu/dessert', label: 'Dessert' },
  { href: '/menu/wine-list', label: 'Wine List' },
  { href: '/booking', label: 'Reservations' },
];

const hours = [
  { day: 'Mon – Fri', lunch: '12:00 – 15:00', dinner: '18:00 – 23:00' },
  { day: 'Saturday', lunch: '12:00 – 15:00', dinner: '17:00 – 00:00' },
  { day: 'Sunday', lunch: '12:00 – 17:00', dinner: 'Closed' },
];

export default function Footer() {
  return (
    <footer className="bg-noir-soft border-t border-white/5">
      {/* Top border gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-3xl font-light tracking-widest text-cream hover:text-gold transition-colors duration-300">
              Sapore<br />Di Mare
            </Link>
            <p className="mt-4 text-cream/40 text-sm font-light leading-relaxed">
              Michelin-starred Italian seafood in the heart of Mayfair. Crafting unforgettable culinary experiences since 1999.
            </p>
            <div className="mt-6 w-10 h-px bg-gold" />
          </div>

          {/* Navigation */}
          <div>
            <h4 className="section-label mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/50 hover:text-gold text-sm font-light transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="section-label mb-6">Opening Hours</h4>
            <div className="space-y-4">
              {hours.map((h) => (
                <div key={h.day}>
                  <p className="text-cream/80 text-sm font-medium">{h.day}</p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-cream/40 text-xs">Lunch: {h.lunch}</p>
                    <p className="text-cream/40 text-xs">Dinner: {h.dinner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-label mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="text-cream/50 text-sm font-light leading-relaxed">
                  22 Queen Street<br />
                  Mayfair, W1J 5HN<br />
                  London
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a
                  href="tel:+447435205407"
                  className="text-cream/50 hover:text-gold text-sm font-light transition-colors duration-200"
                >
                  +44 7435 205407
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <a
                  href="mailto:saporedm.restaurant@gmail.com"
                  className="text-cream/50 hover:text-gold text-sm font-light transition-colors duration-200 break-all"
                >
                  saporedm.restaurant@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono-label text-[10px] text-cream/25 tracking-widest uppercase">
            © {new Date().getFullYear()} Sapore Di Mare. All rights reserved.
          </p>
          <p className="font-mono-label text-[10px] text-cream/25 tracking-widest uppercase">
            22 Queen Street, Mayfair · London W1J 5HN
          </p>
        </div>
      </div>
    </footer>
  );
}
