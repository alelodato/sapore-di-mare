import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Dessert Menu',
  description:
    'Indulge in our handcrafted Italian desserts at Sapore Di Mare — tiramisù, cannoli, sorbetti and more.',
};

const dessertSections = [
  {
    id: 'dolci',
    title: 'Desserts',
    subtitle: 'Dolci',
    items: [
      {
        name: 'Tiramisù della Casa',
        description: 'Our signature tiramisù — Savoiardi biscuits, Pellini espresso, Marsala-spiked mascarpone cream, dark cacao',
        price: '£12',
      },
      {
        name: 'Panna Cotta al Limoncello',
        description: 'Amalfi lemon panna cotta, limoncello syrup, candied lemon zest, fresh raspberries',
        price: '£11',
      },
      {
        name: 'Cannoli Siciliani',
        description: 'Three crisp shells, ricotta, candied citrus peel, pistachio, bitter chocolate — made to order',
        price: '£13',
      },
      {
        name: 'Torta al Cioccolato',
        description: 'Warm dark chocolate fondant, Valrhona 70%, salted caramel gelato, praline crumble',
        price: '£13',
      },
      {
        name: 'Cassata Siciliana',
        description: 'Traditional Sicilian cassata, ricotta, candied fruits, marzipan, jasmine-scented sponge',
        price: '£12',
      },
      {
        name: 'Zabaione al Moscato',
        description: 'Warm Moscato d\'Asti zabaione, seasonal berries, almond cantuccini',
        price: '£14',
      },
      {
        name: 'Sfogliatella Napoletana',
        description: 'Flaky Neapolitan pastry, ricotta and semolina filling, orange blossom, icing sugar',
        price: '£10',
      },
    ],
  },
  {
    id: 'gelati',
    title: 'Gelati & Sorbetti',
    subtitle: 'Ice Cream & Sorbet',
    note: 'Three scoops per serving — please ask your server for today\'s selection',
    items: [
      {
        name: 'Gelato del Giorno',
        description: 'Three scoops of house gelato — ask your server for today\'s flavours',
        price: '£9',
      },
      {
        name: 'Sorbetto di Stagione',
        description: 'Three scoops of seasonal sorbet — lemon, blood orange, or raspberry',
        price: '£9',
      },
      {
        name: 'Affogato al Caffè',
        description: 'Madagascan vanilla gelato, double espresso, optional Amaretto',
        price: '£9',
      },
    ],
  },
  {
    id: 'formaggi',
    title: 'Cheese',
    subtitle: 'Formaggi Italiani',
    items: [
      {
        name: 'Selezione di Formaggi',
        description: 'A selection of three Italian cheeses, quince paste, honeycomb, walnut bread, grapes — ask for today\'s selection',
        price: '£18',
      },
      {
        name: 'Grana Padano DOP',
        description: 'Aged Grana Padano, acacia honey, fresh pear, walnut bread',
        price: '£12',
      },
    ],
  },
  {
    id: 'digestivi',
    title: 'Digestivi & Dolce Drinks',
    subtitle: 'After Dinner',
    items: [
      {
        name: 'Limoncello della Casa',
        description: 'House limoncello, chilled, served in a frosted glass',
        price: '£9',
      },
      {
        name: 'Grappa Selezione',
        description: 'A glass of aged grappa — Nonino Monovitigno or Bertolo Barricata',
        price: '£14',
      },
      {
        name: 'Vin Santo con Cantuccini',
        description: 'A small glass of Tuscan Vin Santo, almond cantuccini for dipping',
        price: '£12',
      },
      {
        name: 'Espresso o Caffè',
        description: 'Pellini espresso blend, served with petit fours',
        price: '£4',
      },
    ],
  },
];

function DessertSection({ section }) {
  return (
    <div id={section.id} className="py-14 border-b border-white/5 last:border-b-0">
      <div className="flex items-baseline gap-6 mb-10">
        <div>
          <p className="section-label mb-1 text-gold/60">{section.subtitle}</p>
          <h2 className="font-display text-3xl lg:text-4xl font-light text-cream">{section.title}</h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
      </div>
      {section.note && (
        <p className="text-cream/30 text-xs font-mono-label tracking-widest uppercase mb-6">
          {section.note}
        </p>
      )}
      <div className="space-y-6">
        {section.items.map((item) => (
          <div key={item.name} className="group">
            <div className="flex items-baseline gap-3">
              <h3 className="font-display text-xl font-light text-cream group-hover:text-gold transition-colors duration-200">
                {item.name}
              </h3>
              <div className="flex-1 border-b border-dashed border-white/10" />
              <span className="font-mono-label text-sm text-gold shrink-0">{item.price}</span>
            </div>
            <p className="mt-1.5 text-cream/40 text-sm font-light leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DessertPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1600&q=85"
          alt="Italian desserts"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="section-label mb-4">Dolci</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light text-cream leading-none">
            Dessert <span className="italic text-gold">Menu</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-6 bg-noir-mid border-b border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-cream/40 text-sm font-light leading-relaxed">
            Our pastry kitchen draws on the deep traditions of Italian confectionery — from the vibrant markets of Palermo to the espresso bars of Naples. Everything is made in-house, daily, with passion.
          </p>
        </div>
      </section>

      {/* Dessert Sections */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {dessertSections.map((section) => (
            <DessertSection key={section.id} section={section} />
          ))}
        </div>
      </section>

      {/* Footnote */}
      <section className="py-12 px-6 bg-noir-soft border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <p className="text-cream/25 text-xs font-mono-label tracking-widest uppercase">
            All prices include VAT · Optional 12.5% service charge
          </p>
          <p className="text-cream/25 text-xs font-mono-label tracking-widest uppercase">
            Please inform your server of any allergies or intolerances
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
          <Link
            href="/menu/a-la-carte"
            className="group p-8 border border-white/5 hover:border-gold/20 transition-colors duration-300"
          >
            <p className="section-label mb-2">← Back</p>
            <h3 className="font-display text-2xl font-light text-cream group-hover:text-gold transition-colors">
              À La Carte
            </h3>
          </Link>
          <Link
            href="/menu/wine-list"
            className="group p-8 border border-white/5 hover:border-gold/20 transition-colors duration-300"
          >
            <p className="section-label mb-2">Next →</p>
            <h3 className="font-display text-2xl font-light text-cream group-hover:text-gold transition-colors">
              Wine List
            </h3>
          </Link>
        </div>
      </section>
    </>
  );
}
