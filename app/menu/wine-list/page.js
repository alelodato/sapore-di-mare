import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Wine List',
  description:
    'Explore our curated Italian wine list at Sapore Di Mare — from crisp northern whites to volcanic southern reds, sparkling Franciacorta and sublime dessert wines.',
};

const wineRegions = [
  {
    id: 'sparkling',
    category: 'Sparkling',
    subtitle: 'Spumante & Franciacorta',
    wines: [
      { name: 'Ca\' del Bosco Cuvée Prestige', region: 'Franciacorta DOCG, Lombardy', style: 'Brut NV', glass: '£18', bottle: '£85' },
      { name: 'Bellavista Alma Rosé', region: 'Franciacorta DOCG, Lombardy', style: 'Brut Rosé NV', glass: null, bottle: '£95' },
      { name: 'Ferrari Brut', region: 'Trento DOC, Trentino', style: 'Brut NV', glass: '£14', bottle: '£68' },
      { name: 'Prosecco Superiore Nino Franco', region: 'Valdobbiadene DOCG, Veneto', style: 'Extra Brut', glass: '£11', bottle: '£52' },
      { name: 'Lambrusco di Sorbara Cleto Chini', region: 'Emilia-Romagna', style: 'Amabile', glass: '£10', bottle: '£46' },
    ],
  },
  {
    id: 'white-north',
    category: 'White — Northern Italy',
    subtitle: 'Bianchi del Nord',
    wines: [
      { name: 'Jermann Vintage Tunina', region: 'Venezia Giulia IGT, Friuli', style: 'White blend', glass: null, bottle: '£95' },
      { name: 'Livio Felluga Pinot Grigio Collio', region: 'Friuli DOC', style: 'Pinot Grigio', glass: '£14', bottle: '£64' },
      { name: 'Tiefenbrunner Müller Thurgau', region: 'Alto Adige DOC', style: 'Aromatic', glass: '£12', bottle: '£55' },
      { name: 'Anselmi San Vincenzo', region: 'Veneto IGT', style: 'Garganega blend', glass: '£11', bottle: '£48' },
      { name: 'Soave Classico Pieropan', region: 'Soave Classico DOC, Veneto', style: 'Garganega', glass: '£13', bottle: '£58' },
      { name: 'Lugana Ca\' dei Frati', region: 'Lugana DOC, Lombardy', style: 'Turbiana', glass: '£12', bottle: '£54' },
    ],
  },
  {
    id: 'white-central',
    category: 'White — Central Italy',
    subtitle: 'Bianchi del Centro',
    wines: [
      { name: 'Gaia & Rey Gaja', region: 'Langhe DOC, Piedmont', style: 'Chardonnay', glass: null, bottle: '£145' },
      { name: 'Cervaro della Sala Antinori', region: 'Umbria IGT', style: 'Chardonnay / Grechetto', glass: '£18', bottle: '£86' },
      { name: 'Verdicchio dei Castelli di Jesi Umani Ronchi', region: 'Marche DOC', style: 'Verdicchio', glass: '£11', bottle: '£49' },
      { name: 'Pecorino Offida DOCG Velenosi', region: 'Marche', style: 'Pecorino', glass: '£12', bottle: '£52' },
      { name: 'Vernaccia di San Gimignano Teruzzi', region: 'Tuscany DOCG', style: 'Vernaccia', glass: '£11', bottle: '£48' },
    ],
  },
  {
    id: 'white-south',
    category: 'White — Southern Italy',
    subtitle: 'Bianchi del Sud',
    wines: [
      { name: 'Greco di Tufo Feudi di San Gregorio', region: 'Campania DOCG', style: 'Greco', glass: '£13', bottle: '£58' },
      { name: 'Fiano di Avellino Mastroberardino', region: 'Campania DOCG', style: 'Fiano', glass: '£14', bottle: '£62' },
      { name: 'Vermentino di Gallura Sella & Mosca', region: 'Sardinia DOCG', style: 'Vermentino', glass: '£12', bottle: '£54' },
      { name: 'Etna Bianco Benanti', region: 'Sicily DOC', style: 'Carricante', glass: '£14', bottle: '£65' },
      { name: 'Grillo Donnafugata', region: 'Sicily IGT', style: 'Grillo', glass: '£11', bottle: '£48' },
    ],
  },
  {
    id: 'rose',
    category: 'Rosé',
    subtitle: 'Rosati',
    wines: [
      { name: 'Cirò Rosato Librandi', region: 'Calabria DOC', style: 'Gaglioppo rosé', glass: '£11', bottle: '£48' },
      { name: 'Cerasuolo d\'Abruzzo Valentini', region: 'Abruzzo DOC', style: 'Montepulciano rosé', glass: '£13', bottle: '£58' },
      { name: 'Rosa dei Venti Donnafugata', region: 'Sicily IGT', style: 'Nerello blend rosé', glass: '£12', bottle: '£52' },
    ],
  },
  {
    id: 'red-north',
    category: 'Red — Northern Italy',
    subtitle: 'Rossi del Nord',
    wines: [
      { name: 'Barolo Giacomo Conterno', region: 'Piedmont DOCG', style: 'Nebbiolo', glass: null, bottle: '£185' },
      { name: 'Barbaresco Bruno Giacosa', region: 'Piedmont DOCG', style: 'Nebbiolo', glass: null, bottle: '£155' },
      { name: 'Barolo Ceretto Bricco Rocche', region: 'Piedmont DOCG', style: 'Nebbiolo', glass: '£32', bottle: '£145' },
      { name: 'Amarone della Valpolicella Allegrini', region: 'Veneto DOCG', style: 'Corvina blend', glass: '£28', bottle: '£125' },
      { name: 'Dolcetto d\'Alba Pecchenino', region: 'Piedmont DOC', style: 'Dolcetto', glass: '£14', bottle: '£62' },
      { name: 'Langhe Nebbiolo Vietti', region: 'Piedmont DOC', style: 'Nebbiolo', glass: '£16', bottle: '£72' },
    ],
  },
  {
    id: 'red-central',
    category: 'Red — Central Italy',
    subtitle: 'Rossi del Centro',
    wines: [
      { name: 'Sassicaia Tenuta San Guido', region: 'Bolgheri DOC, Tuscany', style: 'Cabernet Sauvignon blend', glass: null, bottle: '£285' },
      { name: 'Tignanello Antinori', region: 'Tuscany IGT', style: 'Sangiovese / Cabernet', glass: null, bottle: '£195' },
      { name: 'Brunello di Montalcino Biondi Santi', region: 'Tuscany DOCG', style: 'Sangiovese Grosso', glass: null, bottle: '£245' },
      { name: 'Chianti Classico Gran Selezione Barone Ricasoli', region: 'Tuscany DOCG', style: 'Sangiovese', glass: '£22', bottle: '£95' },
      { name: 'Morellino di Scansano Moris Farms', region: 'Tuscany DOCG', style: 'Sangiovese', glass: '£14', bottle: '£62' },
      { name: 'Montepulciano d\'Abruzzo Valentini', region: 'Abruzzo DOC', style: 'Montepulciano', glass: '£16', bottle: '£72' },
    ],
  },
  {
    id: 'red-south',
    category: 'Red — Southern Italy',
    subtitle: 'Rossi del Sud',
    wines: [
      { name: 'Aglianico del Vulture Paternoster', region: 'Basilicata DOC', style: 'Aglianico', glass: '£16', bottle: '£72' },
      { name: 'Taurasi Mastroberardino', region: 'Campania DOCG', style: 'Aglianico', glass: '£18', bottle: '£82' },
      { name: 'Nero d\'Avola Planeta', region: 'Sicily IGT', style: 'Nero d\'Avola', glass: '£13', bottle: '£58' },
      { name: 'Etna Rosso Benanti', region: 'Sicily DOC', style: 'Nerello Mascalese', glass: '£16', bottle: '£72' },
      { name: 'Primitivo di Manduria Gianfranco Fino Es', region: 'Puglia DOC', style: 'Primitivo', glass: '£17', bottle: '£78' },
      { name: 'Cannonau di Sardegna Argiolas', region: 'Sardinia DOC', style: 'Cannonau', glass: '£13', bottle: '£57' },
    ],
  },
  {
    id: 'dessert-wines',
    category: 'Dessert Wines',
    subtitle: 'Vini Dolci',
    wines: [
      { name: 'Vin Santo del Chianti Classico Isole e Olena', region: 'Tuscany DOC', style: 'Trebbiano / Malvasia, 375ml', glass: '£16', bottle: '£68' },
      { name: 'Passito di Pantelleria Donnafugata Ben Ryé', region: 'Sicily DOC, 375ml', style: 'Zibibbo', glass: '£18', bottle: '£75' },
      { name: 'Moscato d\'Asti Ceretto', region: 'Piedmont DOCG, 375ml', style: 'Moscato Bianco', glass: '£12', bottle: '£48' },
      { name: 'Recioto di Soave Anselmi', region: 'Veneto DOCG, 500ml', style: 'Garganega', glass: '£14', bottle: '£58' },
      { name: 'Malvasia delle Lipari Hauner', region: 'Sicily DOC, 375ml', style: 'Malvasia', glass: '£16', bottle: '£66' },
    ],
  },
];

function WineSection({ region }) {
  return (
    <div id={region.id} className="py-12 border-b border-white/5 last:border-b-0">
      <div className="flex items-baseline gap-6 mb-8">
        <div>
          <p className="section-label mb-1 text-gold/60">{region.subtitle}</p>
          <h2 className="font-display text-2xl lg:text-3xl font-light text-cream">{region.category}</h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
      </div>

      {/* Table header */}
      <div className="hidden md:grid grid-cols-[1fr,auto,auto,auto] gap-4 mb-4 pb-3 border-b border-white/5">
        <span className="font-mono-label text-[10px] tracking-widest uppercase text-cream/25">Wine</span>
        <span className="font-mono-label text-[10px] tracking-widest uppercase text-cream/25 w-20 text-center">Style</span>
        <span className="font-mono-label text-[10px] tracking-widest uppercase text-cream/25 w-16 text-right">Glass</span>
        <span className="font-mono-label text-[10px] tracking-widest uppercase text-cream/25 w-16 text-right">Bottle</span>
      </div>

      <div className="space-y-5">
        {region.wines.map((wine) => (
          <div key={wine.name} className="group">
            {/* Mobile layout */}
            <div className="md:hidden">
              <div className="flex justify-between items-start">
                <h3 className="font-display text-lg font-light text-cream group-hover:text-gold transition-colors flex-1 pr-4">
                  {wine.name}
                </h3>
                <span className="font-mono-label text-sm text-gold shrink-0">{wine.bottle}</span>
              </div>
              <p className="text-cream/35 text-xs mt-1">{wine.region}</p>
              <div className="flex gap-4 mt-1">
                <span className="text-cream/25 text-xs font-mono-label">{wine.style}</span>
                {wine.glass && (
                  <span className="text-cream/35 text-xs font-mono-label">Glass: {wine.glass}</span>
                )}
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:grid grid-cols-[1fr,auto,auto,auto] gap-4 items-baseline">
              <div>
                <h3 className="font-display text-lg font-light text-cream group-hover:text-gold transition-colors">
                  {wine.name}
                </h3>
                <p className="text-cream/35 text-xs mt-0.5">{wine.region}</p>
              </div>
              <span className="text-cream/35 text-xs font-light w-20 text-center">{wine.style}</span>
              <span className="font-mono-label text-sm text-cream/50 w-16 text-right">
                {wine.glass || '—'}
              </span>
              <span className="font-mono-label text-sm text-gold w-16 text-right">{wine.bottle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WineListPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1600&q=85"
          alt="Italian wine bottles"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="section-label mb-4">Vini Italiani</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light text-cream leading-none">
            Wine <span className="italic text-gold">List</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-6 bg-noir-mid border-b border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-cream/40 text-sm font-light leading-relaxed mb-6">
            Our wine list is a journey through Italy's most extraordinary wine regions, curated by our sommelier to complement the flavours of our kitchen. We specialise in coastal whites and medium-bodied reds that sing alongside seafood.
          </p>
          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-2">
            {wineRegions.map((r) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                className="font-mono-label text-[9px] tracking-widest uppercase text-cream/30 hover:text-gold border border-white/8 hover:border-gold/20 px-3 py-1.5 transition-all duration-200"
              >
                {r.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Wine Sections */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {wineRegions.map((region) => (
            <WineSection key={region.id} region={region} />
          ))}
        </div>
      </section>

      {/* Footnote */}
      <section className="py-12 px-6 bg-noir-soft border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <p className="text-cream/25 text-xs font-mono-label tracking-widest uppercase">
            All prices include VAT · Sommelier available on request
          </p>
          <p className="text-cream/25 text-xs font-mono-label tracking-widest uppercase">
            Corkage £35 per bottle · Half bottles available — please ask
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
            href="/booking"
            className="group p-8 border border-white/5 hover:border-gold/20 transition-colors duration-300"
          >
            <p className="section-label mb-2">Ready to Dine?</p>
            <h3 className="font-display text-2xl font-light text-cream group-hover:text-gold transition-colors">
              Book a Table →
            </h3>
          </Link>
        </div>
      </section>
    </>
  );
}
