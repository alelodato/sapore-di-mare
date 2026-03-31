import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
  title: 'Dessert Menu — Sapore Di Mare',
};

const DESSERT_SLUGS = ['desserts', 'gelati', 'cheese', 'digestivi'];

export default async function DessertPage() {
  const supabase = createClient();

  const { data: sections } = await supabase
    .from('menu_sections')
    .select('*, menu_items(*)')
    .in('slug', DESSERT_SLUGS)
    .eq('active', true)
    .eq('menu_items.active', true)
    .order('position');

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] flex items-end pb-14">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1800&q=85"
            alt="Desserts"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Link href="/menu" className="inline-flex items-center gap-2 font-mono-label text-[10px] tracking-wider text-cream/40 uppercase hover:text-gold transition-colors mb-6">
            <ArrowLeft size={12} /> Back to Menus
          </Link>
          <p className="section-label mb-2">Menu</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light text-cream leading-none">
            Dessert <span className="italic text-gold">Menu</span>
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <p className="text-cream/40 text-sm font-light italic mb-16 max-w-xl">
          Our pastry kitchen draws on the deep traditions of Italian confectionery — from the vibrant
          markets of Palermo to the espresso bars of Naples. Everything is made in-house, daily.
        </p>

        <div className="space-y-16">
          {sections?.map((section) => (
            <div key={section.id} id={section.slug}>
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="section-label text-gold/60 mb-1">{section.subtitle}</p>
                  <h2 className="font-display text-3xl lg:text-4xl font-light text-cream">
                    {section.name}
                  </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
              </div>

              <div className="space-y-0 border-t border-white/5">
                {section.menu_items
                  ?.sort((a, b) => a.position - b.position)
                  .map((item) => (
                    <div key={item.id} className="group pt-6 pb-6 border-b border-white/5 hover:border-gold/10 transition-colors">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-xl font-light text-cream group-hover:text-gold transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex-1 border-b border-dashed border-white/10" />
                        <span className="font-mono-label text-sm text-gold shrink-0">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="mt-1.5 text-cream/40 text-sm font-light leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      {item.note && (
                        <p className="mt-1 font-mono-label text-[9px] text-cream/25 tracking-wider uppercase">
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 space-y-2">
          <p className="font-mono-label text-[10px] text-cream/25 tracking-wider uppercase">
            All prices include VAT · Optional 12.5% service charge
          </p>
          <p className="font-mono-label text-[10px] text-cream/25 tracking-wider uppercase">
            Please inform your server of any allergies or intolerances
          </p>
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between gap-4">
          <Link href="/menu/a-la-carte" className="btn-gold">
            <ArrowLeft size={14} /> À La Carte
          </Link>
          <Link href="/menu/wine-list" className="btn-gold-filled">
            Wine List <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}