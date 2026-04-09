import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Wine List — Sapore Di Mare',
};

const WINE_SLUGS = [
  'sparkling',
  'white-north',
  'white-central',
  'white-south',
  'rose',
  'red-north',
  'red-central',
  'red-south',
  'dessert-wines',
];

export default async function WineListPage() {
  const supabase = createClient();

  const { data: sections } = await supabase
    .from('menu_sections')
    .select('*, menu_items(*)')
    .in('slug', WINE_SLUGS)
    .eq('active', true)
    .eq('menu_items.active', true)
    .order('position');

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] flex items-end pb-14">
        <div className="absolute inset-0">
          <Image
            src="/vino2.jpg"
            alt="Wine List"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-noir/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Link href="/menu" className="inline-flex items-center gap-2 font-mono-label text-[10px] tracking-wider text-cream/40 uppercase hover:text-gold transition-colors mb-6">
            <ArrowLeft size={12} /> Back to Menus
          </Link>
          <p className="section-label mb-2">Menu</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light text-cream leading-none">
            Wine <span className="italic text-gold">List</span>
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 pb-4">
        <p className="text-cream/40 text-sm font-light italic leading-relaxed max-w-2xl">
          Over 200 labels spanning the finest Italian estates — whites, reds, sparkling, rosé,
          and dessert wines — curated to complement every dish on our menu.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 space-y-16 pb-32">
        {sections?.map((section) => (
          <div key={section.id} id={section.slug}>
            <div className="flex items-center gap-6 mb-8">
              <div>
                <p className="section-label text-gold/60 mb-1">{section.subtitle}</p>
                <h2 className="font-display text-3xl font-light text-cream">{section.name}</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
            </div>

            {/* Desktop table header */}
            <div className="hidden md:grid grid-cols-[1fr,auto,auto] gap-4 mb-3 pb-3 border-b border-white/5">
              <span className="font-mono-label text-[10px] tracking-widest uppercase text-cream/25">Wine</span>
              <span className="font-mono-label text-[10px] tracking-widest uppercase text-cream/25 w-16 text-right">Glass</span>
              <span className="font-mono-label text-[10px] tracking-widest uppercase text-cream/25 w-16 text-right">Bottle</span>
            </div>

            <div className="space-y-0 border-t border-white/5">
              {section.menu_items
                ?.sort((a, b) => a.position - b.position)
                .map((item) => (
                  <div key={item.id} className="group py-5 border-b border-white/5 hover:border-gold/10 transition-colors">
                    {/* Mobile */}
                    <div className="md:hidden">
                      <div className="flex justify-between items-start">
                        <h3 className="font-display text-lg font-light text-cream group-hover:text-gold transition-colors flex-1 pr-4">
                          {item.name}
                        </h3>
                        <span className="font-mono-label text-sm text-gold shrink-0">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="text-cream/35 text-xs mt-1">{item.description}</p>
                      )}
                      {item.note && (
                        <p className="text-cream/25 text-xs font-mono-label mt-1">{item.note}</p>
                      )}
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-[1fr,auto,auto] gap-4 items-baseline">
                      <div>
                        <h3 className="font-display text-lg font-light text-cream group-hover:text-gold transition-colors">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-cream/35 text-xs mt-0.5">{item.description}</p>
                        )}
                      </div>
                      <span className="font-mono-label text-sm text-cream/40 w-16 text-right">
                        {item.note ? item.note.replace('Glass ', '') : '—'}
                      </span>
                      <span className="font-mono-label text-sm text-gold w-16 text-right">
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="pt-6 border-t border-white/10 space-y-2">
          <p className="font-mono-label text-[10px] text-cream/25 tracking-wider uppercase">
            All prices include VAT · Sommelier available on request
          </p>
          <p className="font-mono-label text-[10px] text-cream/25 tracking-wider uppercase">
            Corkage £35 per bottle · Half bottles available — please ask
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
          <Link href="/menu/dessert" className="btn-gold">
            <ArrowLeft size={14} /> Dessert Menu
          </Link>
          <Link href="/booking" className="btn-gold-filled">
            Reserve a Table
          </Link>
        </div>
      </div>
    </div>
  );
}