import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'À La Carte Menu',
  description:
    'Explore the full à la carte menu at Sapore Di Mare — Raw Fish, Vegetarian Starters, Hot Starters, Pasta & Risotto, Main Courses, and Side Dishes.',
};

const menuSections = [
  {
    id: 'raw-fish',
    title: 'Raw Fish',
    subtitle: 'Crudo',
    items: [
      { name: 'Oysters (3)', description: 'Rock oysters, Cornish, shallot mignonette, lemon', price: '£18' },
      { name: 'Tuna Tartare', description: 'Yellowfin tuna, avocado cream, toasted sesame, yuzu dressing', price: '£22' },
      { name: 'Sea Bass Crudo', description: 'Wild sea bass, Sicilian blood orange, fennel, Taggiasca olive oil', price: '£19' },
      { name: 'Scallop Carpaccio', description: 'Hand-dived Orkney scallop, green apple, caviar, champagne beurre blanc', price: '£24' },
      { name: 'Salmon Tartare', description: 'Norwegian salmon, crème fraîche, capers, dill, brown bread', price: '£18' },
    ],
  },
  {
    id: 'vegetarian-starters',
    title: 'Vegetarian Starters',
    subtitle: 'Antipasti Vegetariani',
    items: [
      { name: 'Burrata Pugliese', description: 'Hand-stretched burrata, San Marzano tomatoes, Genovese basil, EVO', price: '£16' },
      { name: 'Caponata Siciliana', description: 'Sweet and sour aubergine, celery, capers, pine nuts, golden raisins', price: '£14' },
      { name: 'Porcini Crostini', description: 'Wild porcini, ricotta, truffle oil, black pepper, sourdough bruschetta', price: '£15' },
      { name: 'Burrata e Fichi', description: 'Burrata, grilled figs, honey, toasted walnuts, aged balsamic', price: '£17' },
      { name: 'Zucchini Fritti', description: 'Crispy courgette flowers, anchovy aioli, lemon zest', price: '£13' },
    ],
  },
  {
    id: 'hot-starters',
    title: 'Hot Starters',
    subtitle: 'Antipasti Caldi',
    items: [
      { name: 'Fritto Misto', description: 'Crispy squid, prawns, whitebait, saffron aioli, lemon', price: '£21' },
      { name: 'Scallops al Burro', description: 'Pan-seared king scallops, pea purée, crispy pancetta, brown butter, lemon', price: '£26' },
      { name: 'Gamberi alla Busara', description: 'Tiger prawns, San Marzano tomato, garlic, fresh chilli, grilled sourdough', price: '£22' },
      { name: 'Seppie e Piselli', description: 'Braised cuttlefish, sweet peas, white wine, parsley, polenta crostone', price: '£19' },
      { name: 'Vongole in Bianco', description: 'Fresh clams, dry white wine, garlic, chilli, parsley, crostini', price: '£18' },
      { name: 'Capesante Gratinate', description: 'Gratin king scallops, breadcrumbs, parmesan, lemon gremolata', price: '£25' },
    ],
  },
  {
    id: 'pasta-risotto',
    title: 'Pasta & Risotto',
    subtitle: 'Primi',
    items: [
      { name: 'Linguine alle Vongole', description: 'Handmade linguine, Palourde clams, dry Vermentino, garlic, chilli, parsley', price: '£28' },
      { name: 'Spaghetti al Nero', description: 'Squid ink spaghetti, cuttlefish ragù, bottarga, toasted breadcrumbs', price: '£26' },
      { name: 'Tagliolini all\'Astice', description: 'Egg tagliolini, half native lobster, cherry tomato, bisque sauce, basil', price: '£42' },
      { name: 'Risotto al Granchio', description: 'Carnaroli risotto, brown crab, mascarpone, lemon, chives', price: '£30' },
      { name: 'Pappardelle ai Funghi', description: 'Wide egg pasta, mixed wild mushrooms, truffle cream, aged pecorino (v)', price: '£24' },
      { name: 'Gnocchi di Patate', description: 'Hand-rolled potato gnocchi, langoustine bisque, basil, parmesan', price: '£29' },
    ],
  },
  {
    id: 'main-courses',
    title: 'Main Courses',
    subtitle: 'Secondi',
    items: [
      { name: 'Branzino al Sale', description: 'Whole sea bass baked in sea salt crust, fennel, capers, salsa verde', price: '£38' },
      { name: 'Aragosta alla Griglia', description: 'Grilled half native lobster, lemon butter, chervil, triple-cooked chips', price: '£68' },
      { name: 'Rombo al Forno', description: 'Whole roasted turbot for two, rosemary, garlic, lemon, herb oil', price: '£95' },
      { name: 'Branzino in Cartoccio', description: 'Sea bass baked in paper, cherry tomatoes, olives, capers, potatoes', price: '£36' },
      { name: 'Dentice al Forno', description: 'Roasted red snapper, salmoriglio sauce, roasted baby potatoes, broccolini', price: '£40' },
      { name: 'Tonno alla Brace', description: 'Grilled bluefin tuna steak, rare, white bean purée, salsa rossa, agretti', price: '£42' },
      { name: 'Risotto Nero al Nero', description: 'Whole black risotto, mixed seafood, bisque, saffron aioli (v option available)', price: '£32' },
    ],
  },
  {
    id: 'sides',
    title: 'Side Dishes',
    subtitle: 'Contorni',
    items: [
      { name: 'Spinaci all\'Aglio', description: 'Wilted spinach, garlic, good olive oil', price: '£7' },
      { name: 'Patate al Rosmarino', description: 'Crispy roast potatoes, rosemary, flaky sea salt', price: '£7' },
      { name: 'Insalata Mista', description: 'Mixed leaves, shaved fennel, radish, lemon vinaigrette', price: '£8' },
      { name: 'Asparagi alla Griglia', description: 'Grilled asparagus, lemon oil, shaved parmesan', price: '£9' },
      { name: 'Pane Fatto in Casa', description: 'House bread, cultured butter, good olive oil', price: '£6' },
    ],
  },
];

function MenuSection({ section }) {
  return (
    <div id={section.id} className="py-14 border-b border-white/5 last:border-b-0">
      <div className="flex items-baseline gap-6 mb-10">
        <div>
          <p className="section-label mb-1 text-gold/60">{section.subtitle}</p>
          <h2 className="font-display text-3xl lg:text-4xl font-light text-cream">
            {section.title}
          </h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
      </div>
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
            <p className="mt-1.5 text-cream/40 text-sm font-light leading-relaxed pl-0">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AlaCartePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1600&q=85"
          alt="À la carte seafood dish"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="section-label mb-4">Cuisine</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light text-cream leading-none">
            À La <span className="italic text-gold">Carte</span>
          </h1>
        </div>
      </section>

      {/* Menu intro + navigation */}
      <section className="py-12 px-6 bg-noir-mid border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-cream/40 text-sm font-light text-center max-w-2xl mx-auto mb-8 leading-relaxed">
            All our dishes are prepared fresh daily using the finest sustainable seafood and seasonal produce. Our pasta is made by hand each morning. Please inform your server of any dietary requirements.
          </p>
          {/* Section jump links */}
          <div className="flex flex-wrap justify-center gap-3">
            {menuSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-mono-label text-[10px] tracking-widest uppercase text-cream/40 hover:text-gold border border-white/10 hover:border-gold/30 px-4 py-2 transition-all duration-200"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {menuSections.map((section) => (
            <MenuSection key={section.id} section={section} />
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
            (v) Vegetarian · Please speak to your server regarding allergies
          </p>
        </div>
      </section>

      {/* Nav to other menus */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
          <Link
            href="/menu/dessert"
            className="group p-8 border border-white/5 hover:border-gold/20 transition-colors duration-300 flex justify-between items-center"
          >
            <div>
              <p className="section-label mb-2">Next</p>
              <h3 className="font-display text-2xl font-light text-cream group-hover:text-gold transition-colors">
                Dessert Menu →
              </h3>
            </div>
          </Link>
          <Link
            href="/menu/wine-list"
            className="group p-8 border border-white/5 hover:border-gold/20 transition-colors duration-300 flex justify-between items-center"
          >
            <div>
              <p className="section-label mb-2">Explore</p>
              <h3 className="font-display text-2xl font-light text-cream group-hover:text-gold transition-colors">
                Wine List →
              </h3>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
