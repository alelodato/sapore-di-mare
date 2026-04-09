import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ReservationDashboard from '@/components/ReservationDashboard';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'My Reservations',
  description: 'Manage your reservations at Sapore Di Mare, Mayfair.',
};

export default async function BookingPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?next=/booking');
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end overflow-hidden">
        <Image
          src="/esterno.png"
          alt="Sapore Di Mare dining room"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <p className="section-label mb-3">Your Account</p>
          <h1 className="font-display text-5xl lg:text-6xl font-light text-cream leading-none">
            Reservations
          </h1>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ReservationDashboard user={user} />
        </div>
      </section>

      {/* Contact info */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-label mb-2">Need Help?</p>
            <p className="text-cream/40 text-sm font-light">
              For same-day bookings or large parties (9+), please call us directly.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="tel:+447435205407"
              className="btn-gold text-xs py-3 px-6"
            >
              Call Us
            </a>
            <a
              href="mailto:saporedm.restaurant@gmail.com"
              className="btn-gold text-xs py-3 px-6"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
