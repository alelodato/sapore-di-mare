import Image from 'next/image';
import Link from 'next/link';
import { Quote, Leaf, Fish, Award, Heart } from 'lucide-react';

export const metadata = {
  title: 'About',
  description:
    'Discover the story of Sapore Di Mare — our philosophy, our Michelin-starred chef Mario Rossi, and our commitment to the finest Italian seafood in Mayfair.',
};

const values = [
  {
    icon: Fish,
    title: 'Provenance First',
    description:
      'Every fish and shellfish is sourced directly from trusted fishermen around the Italian and British coastlines. We know where our food comes from — and so will you.',
  },
  {
    icon: Leaf,
    title: 'Seasonal Integrity',
    description:
      'Our menu changes with the seasons and the catch. We never force ingredients out of their natural rhythm. What grows together, goes together.',
  },
  {
    icon: Award,
    title: 'Michelin Excellence',
    description:
      'Awarded a Michelin star in 2004 and held every year since. A recognition not just of skill, but of an unwavering dedication to the guest experience.',
  },
  {
    icon: Heart,
    title: 'Italian Soul',
    description:
      "Born from a love of Italy's coastal communities, every dish carries the warmth, generosity and passion that defines Italian hospitality at its finest.",
  },
  {
    icon: Quote,
    title: 'Craft Over Commerce',
    description:
      'We have always chosen quality over convenience. Small covers, attentive service, handmade pasta — because great food cannot be rushed.',
  },
  {
    icon: Award,
    title: 'A London Institution',
    description:
      'Open since 1999 on Queen Street, Mayfair, Sapore Di Mare has become a landmark for those who believe that Italian seafood can be both soulful and sublime.',
  },
];

function GoldDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1600&q=85"
          alt="Sapore Di Mare kitchen"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="section-label mb-4">Our Story</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light text-cream leading-none">
            Passion, Craft<br />
            <span className="italic text-gold">& the Sea</span>
          </h1>
        </div>
      </section>

      <GoldDivider />

      {/* Philosophy */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="section-label mb-6">Philosophy</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-cream leading-tight mb-8">
                Food that speaks<br />
                <span className="italic text-gold">of the sea</span>
              </h2>
              <div className="w-10 h-px bg-gold mb-8" />
              <p className="text-cream/50 font-light leading-relaxed mb-6">
                Sapore Di Mare — 'taste of the sea' — was born in 1999 from a simple but deeply held conviction: that Italy's relationship with its coastline is unlike anything else in the world, and that Londoners deserved to experience it at its most authentic.
              </p>
              <p className="text-cream/50 font-light leading-relaxed mb-6">
                Our founders, deeply rooted in the fishing communities of Puglia and Liguria, moved to Mayfair with a mission. They would source only the finest, freshest catch. They would make everything by hand. They would serve with warmth.
              </p>
              <p className="text-cream/50 font-light leading-relaxed">
                A quarter-century later, that mission remains unchanged. The restaurant has earned its Michelin star, its loyal following, and its reputation — but the soul that started it all still beats at the heart of every plate.
              </p>
            </div>
            <div className="space-y-6">
              <div className="relative h-[420px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80"
                  alt="Fresh seafood ingredients"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80"
                    alt="Tuna tartare"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559742811-822873691df8?w=600&q=80"
                    alt="Grilled fish"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Chef Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="section-label mb-6">Executive Chef</p>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-cream leading-tight mb-4">
                Mario Rossi
              </h2>
              <p className="font-mono-label text-xs text-gold/70 mb-8 tracking-widest">
                Michelin-starred · Est. 2004
              </p>
              <p className="text-cream/50 font-light leading-relaxed mb-6">
                Born in Naples, Chef Mario Rossi discovered his love for seafood on the docks of Pozzuoli, watching fishermen return with the dawn catch. After training under legendary masters in Rome and Paris, he arrived in London with a vision: to bring the honest, ingredient-driven cooking of Italy's south to one of the world's great dining cities.
              </p>
              <p className="text-cream/50 font-light leading-relaxed mb-6">
                His cooking is defined by restraint and respect. He believes that great fish needs very little — the right olive oil, the freshest herbs, the perfect heat. Yet within that simplicity lies extraordinary complexity of flavour.
              </p>
              <p className="text-cream/50 font-light leading-relaxed">
                Awarded a Michelin star in 2004, Chef Mario continues to push the boundaries of what Italian coastal cooking can be — always rooted in tradition, never afraid of the new.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative h-[500px] lg:h-[600px]">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80"
                alt="Chef Mario Rossi"
                fill
                className="object-cover object-top"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/30" />
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Press Quote */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
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

      {/* Values Grid */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-4">What We Stand For</p>
            <h2 className="font-display text-4xl lg:text-5xl font-light text-cream">
              Our <span className="italic text-gold">Values</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="p-8 border border-white/5 hover:border-gold/20 transition-colors duration-300 group"
              >
                <value.icon
                  size={22}
                  className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="font-display text-xl font-light text-cream mb-4">{value.title}</h3>
                <p className="text-cream/40 text-sm font-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <p className="section-label mb-4">Experience It Yourself</p>
        <h2 className="font-display text-4xl font-light text-cream mb-8">
          Reserve Your <span className="italic text-gold">Table</span>
        </h2>
        <Link href="/booking" className="btn-gold-filled">
          Make a Reservation
        </Link>
      </section>
    </>
  );
}