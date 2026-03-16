import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Menus',
  description:
    'Explore our à la carte menu, dessert menu, and award-winning wine list at Sapore Di Mare, Mayfair.',
};

const menus = [
  {
    title: 'À La Carte',
    subtitle: 'Our signature tasting journey',
    description:
      'A celebration of Italy's finest coastal ingredients, from delicate raw fish preparations to masterfully sauced pasta and whole-roasted fish. Changed seasonally to honour the best of each catch.',
    href: '/menu/a-la-carte',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=1200&q=85',
    imageAlt: 'Grilled branzino with herbs',
    cta: 'View À La Carte',
    label: '01 / Cuisine',
    align: 'left',
  },
  {
    title: 'Dessert Menu',
    subtitle: 'A sweet Italian conclusion',
    description:
      'Our pastry kitchen honours the great traditions of Italian confectionery — from the lightest tiramisù to hand-rolled cannoli and seasonal sorbetti that capture summer in a spoon.',
    href: '/menu/dessert',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=85',
    imageAlt: 'Italian tiramisu dessert',
    cta: 'View Dessert Menu',
    label: '02 / Dolci',
    align: 'right',
  },
  {
    title: 'Wine List',
    subtitle: 'Italy uncorked',
    description:
      'Curated by our sommelier, the wine list journeys from the Alpine foothills of Trentino to the volcanic soils of Etna — with a particular focus on coastal whites and medium-bodied reds that complement our seafood.',
    href: '/menu/wine-list',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85',
    imageAlt: 'Italian wine bottles',
    cta: 'View Wine List',
    label: '03 / Vini',
    align: 'left',
  },
];

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
          alt="Sapore Di Mare menu experience"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="section-label mb-4">Dining at Sapore Di Mare</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light text-cream leading-none">
            Our <span className="italic text-gold">Menus</span>
          </h1>
        </div>
      </section>

      {/* Menu Cards — alternating layout */}
      <section className="py-12">
        {menus.map((menu, i) => (
          <div
            key={menu.href}
            className={`relative grid lg:grid-cols-2 min-h-[500px] ${
              i > 0 ? 'border-t border-white/5' : ''
            }`}
          >
            {/* Image */}
            <div
              className={`relative h-[350px] lg:h-auto overflow-hidden ${
                menu.align === 'right' ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              <Image
                src={menu.image}
                alt={menu.imageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-noir/20" />
            </div>

            {/* Content */}
            <div
              className={`flex items-center px-10 lg:px-16 py-16 bg-noir-mid ${
                menu.align === 'right' ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div className="max-w-md">
                <p className="section-label mb-3 text-gold/60">{menu.label}</p>
                <h2 className="font-display text-4xl lg:text-5xl font-light text-cream mb-3 leading-tight">
                  {menu.title}
                </h2>
                <p className="font-display text-xl italic text-gold/80 mb-6">{menu.subtitle}</p>
                <div className="w-10 h-px bg-gold/40 mb-6" />
                <p className="text-cream/50 font-light text-sm leading-relaxed mb-8">
                  {menu.description}
                </p>
                <Link href={menu.href} className="btn-gold">
                  {menu.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Reservation CTA */}
      <section className="py-20 px-6 text-center bg-noir-soft border-t border-white/5">
        <p className="section-label mb-4">Ready to Dine?</p>
        <h2 className="font-display text-4xl font-light text-cream mb-8">
          Reserve Your <span className="italic text-gold">Table</span>
        </h2>
        <Link href="/booking" className="btn-gold-filled">
          Book a Table
        </Link>
      </section>
    </>
  );
}
