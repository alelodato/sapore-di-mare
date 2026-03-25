import Image from 'next/image';
import Link from 'next/link';
import { Quote } from 'lucide-react';

const dishImages = [
  {
    src: '/ostriche.png',
    alt: 'Fresh oysters on ice',
  },
  {
    src: '/pesce.png',
    alt: 'Grilled branzino',
  },
  {
    src: '/risotto.png',
    alt: 'Lobster tagliatelle',
  },
  {
    src: '/tartare.png',
    alt: 'Tuna tartare',
  },
  {
    src: '/vongole.png',
    alt: 'Risotto al nero di seppia',
  },
  {
    src: '/gourmet.png',
    alt: 'Burrata with anchovies',
  },
];

const hours = [
  { day: 'Monday – Friday', lunch: '12:00 – 15:00', dinner: '18:00 – 23:00' },
  { day: 'Saturday', lunch: '12:00 – 15:00', dinner: '17:00 – 00:00' },
  { day: 'Sunday', lunch: '12:00 – 17:00', dinner: 'Closed' },
];

export const metadata = {
  title: 'Sapore Di Mare — Michelin-starred Italian Seafood, Mayfair',
};

// Divisore dorato riutilizzabile
function GoldDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <Image
          src="/sala4.png"
          alt="Sapore Di Mare restaurant interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/60 via-noir/40 to-noir/80" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="section-label mb-6 text-gold/80">Mayfair, London · Est. 1999</p>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-light text-cream leading-none tracking-tight mb-8">
            Sapore<br />
            <span className="italic text-gold">Di Mare</span>
          </h1>
          <p className="text-cream/60 font-light text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Michelin-starred Italian seafood. The finest ingredients, crafted with passion and served with soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-gold-filled">
              Reserve a Table
            </Link>
            <Link href="/menu" className="btn-gold">
              Explore Menus
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="section-label text-[9px] text-cream/30">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
        </div>
      </section>

      <GoldDivider />

      {/* Intro Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-6">Our Philosophy</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-cream leading-tight mb-8">
                Where the sea meets<br />
                <span className="italic text-gold">Italian artistry</span>
              </h2>
              <p className="text-cream/50 font-light leading-relaxed mb-6">
                At Sapore Di Mare, we believe that great food begins with great ingredients. Every morning, our team selects the finest catch from trusted suppliers, combining the freshness of the Mediterranean with the boldness of Italian culinary tradition.
              </p>
              <p className="text-cream/50 font-light leading-relaxed mb-10">
                Under the direction of Michelin-starred Chef Mario Rossi, our kitchen transforms each ingredient into an expression of place, memory and craft — creating dishes that tell the story of Italy's coastline from your table in Mayfair.
              </p>
              <Link href="/about" className="btn-gold">
                Discover Our Story
              </Link>
            </div>
            <div className="relative h-[500px] lg:h-[600px]">
              <Image
                src="/chef.png"
                alt="Chef Mario Rossi at work"
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-gold/30" />
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Dish Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-4">From Our Kitchen</p>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-cream">
              A Taste of the <span className="italic text-gold">Season</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {dishImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden group"
                style={{ aspectRatio: i === 0 || i === 3 ? '4/5' : '1/1' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/menu/a-la-carte" className="btn-gold">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Michelin Press Quote — sfumato nel background */}
      <section className="py-24 lg:py-32 px-6 relative overflow-hidden">
        {/* Sfumatura che si fonde col background sopra e sotto */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir via-black/40 to-noir" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Quote size={36} className="text-gold/30 mx-auto mb-8" />
          <blockquote className="font-display text-3xl lg:text-4xl font-light italic text-cream leading-relaxed mb-8">
            "A mix of tradition and innovation, all crafted using some of the finest quality ingredients I've ever seen."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-px bg-gold/40" />
            <p className="section-label text-cream/40">Jon Doe — Michelin Guide</p>
            <div className="w-10 h-px bg-gold/40" />
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Opening Hours & Map */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Hours */}
            <div>
              <p className="section-label mb-6">Visit Us</p>
              <h2 className="font-display text-4xl font-light text-cream mb-10">
                Opening <span className="italic text-gold">Hours</span>
              </h2>
              <div className="space-y-6">
                {hours.map((h) => (
                  <div key={h.day} className="border-b border-white/5 pb-6">
                    <div className="flex justify-between items-start">
                      <span className="text-cream/80 font-medium text-sm">{h.day}</span>
                      <div className="text-right">
                        <p className="text-cream/50 text-xs font-mono-label">Lunch {h.lunch}</p>
                        <p className="text-cream/50 text-xs font-mono-label mt-1">
                          Dinner {h.dinner}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 space-y-2">
                <p className="text-cream/40 text-sm">
                  22 Queen Street, Mayfair, W1J 5HN, London
                </p>
                <p className="text-cream/40 text-sm">
                  <a href="tel:+447435205407" className="hover:text-gold transition-colors">
                    +44 7435 205407
                  </a>
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="relative h-[400px] lg:h-auto border border-white/10">
              <iframe
                title="Sapore Di Mare location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.298617437766!2d-0.14479!3d51.50561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876052b10a4d0df%3A0x66efbf31b6e77b21!2sQueen%20St%2C%20London%20W1J%205HN!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* CTA Banner */}
      <section className="relative py-28 px-6 overflow-hidden">
        <Image
          src="/sala.webp"
          alt="Restaurant ambience"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-noir/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="section-label mb-6 text-gold/80">Reserve Your Evening</p>
          <h2 className="font-display text-5xl lg:text-6xl font-light text-cream mb-6 leading-tight">
            An Evening You<br />
            <span className="italic text-gold">Won't Forget</span>
          </h2>
          <p className="text-cream/50 font-light max-w-lg mx-auto mb-10 leading-relaxed">
            Join us for an extraordinary culinary journey through Italy's finest coastal flavours. Tables are limited — book yours today.
          </p>
          <Link href="/booking" className="btn-gold-filled">
            Make a Reservation
          </Link>
        </div>
      </section>
    </>
  );
}