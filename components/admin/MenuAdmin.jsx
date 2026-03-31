'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Upload } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

const MENU_GROUPS = [
  {
    label: 'À La Carte',
    slugs: ['raw-fish', 'vegetarian-starters', 'hot-starters', 'pasta-risotto', 'main-courses', 'sides'],
  },
  {
    label: 'Dessert Menu',
    slugs: ['desserts', 'gelati', 'cheese', 'digestivi'],
  },
  {
    label: 'Wine List',
    slugs: ['sparkling', 'white-north', 'white-central', 'white-south', 'rose', 'red-north', 'red-central', 'red-south', 'dessert-wines'],
  },
];

export default function MenuAdmin({ initialSections, initialItems }) {
  const [sections, setSections] = useState(initialSections);
  const [items, setItems] = useState(initialItems);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Sezioni del gruppo attivo
  const groupSections = sections.filter(s =>
    MENU_GROUPS[activeGroup].slugs.includes(s.slug)
  ).sort((a, b) => a.position - b.position);

  const sectionItems = items
    .filter(i => i.section_id === activeSection)
    .sort((a, b) => a.position - b.position);

  // ─── SECTIONS ───
  const toggleSection = async (id, active) => {
    await supabase.from('menu_sections').update({ active: !active }).eq('id', id);
    setSections(prev => prev.map(s => s.id === id ? { ...s, active: !active } : s));
  };

  const saveSection = async (form) => {
    setLoading(true);
    if (editSection?.id) {
      const { data } = await supabase.from('menu_sections').update(form).eq('id', editSection.id).select().single();
      setSections(prev => prev.map(s => s.id === editSection.id ? data : s));
    } else {
      const { data } = await supabase.from('menu_sections').insert([{
        ...form,
        position: sections.length,
      }]).select().single();
      setSections(prev => [...prev, data]);
    }
    setEditSection(null);
    setShowAddSection(false);
    setLoading(false);
  };

  const deleteSection = async (id) => {
    if (!confirm('Delete this section and all its items?')) return;
    await supabase.from('menu_sections').delete().eq('id', id);
    setSections(prev => prev.filter(s => s.id !== id));
    setItems(prev => prev.filter(i => i.section_id !== id));
    if (activeSection === id) setActiveSection(null);
  };

  // ─── ITEMS ───
  const toggleItem = async (id, active) => {
    await supabase.from('menu_items').update({ active: !active }).eq('id', id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, active: !active } : i));
  };

  const saveItem = async (form) => {
    setLoading(true);
    if (editItem?.id) {
      const { data } = await supabase.from('menu_items').update(form).eq('id', editItem.id).select().single();
      setItems(prev => prev.map(i => i.id === editItem.id ? data : i));
    } else {
      const { data } = await supabase.from('menu_items').insert([{
        ...form,
        section_id: activeSection,
        position: sectionItems.length,
      }]).select().single();
      setItems(prev => [...prev, data]);
    }
    setEditItem(null);
    setShowAddItem(false);
    setLoading(false);
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this item?')) return;
    await supabase.from('menu_items').delete().eq('id', id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const uploadImage = async (file, itemId) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${itemId ?? 'new'}-${Date.now()}.${ext}`;
    await supabase.storage.from('menu-images').upload(path, file, { upsert: true });
    const url = `${supabaseUrl}/storage/v1/object/public/menu-images/${path}`;
    setUploading(false);
    return url;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label mb-2">Manage</p>
          <h1 className="font-display text-4xl font-light text-cream">Menu</h1>
        </div>
        <button
          onClick={() => setShowAddSection(true)}
          className="btn-gold text-xs py-2.5 flex items-center gap-2"
        >
          <Plus size={14} /> Add Section
        </button>
      </div>

      {/* Menu group tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-0">
        {MENU_GROUPS.map((group, i) => (
          <button
            key={group.label}
            onClick={() => { setActiveGroup(i); setActiveSection(null); }}
            className={clsx(
              'px-6 py-3 font-mono-label text-[10px] tracking-widest uppercase transition-colors border-b-2 -mb-px',
              activeGroup === i
                ? 'border-gold text-gold'
                : 'border-transparent text-cream/40 hover:text-cream'
            )}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[260px,1fr] gap-6">
        {/* Sections sidebar */}
        <div className="space-y-1">
          <p className="font-mono-label text-[9px] text-cream/25 tracking-widest uppercase px-2 mb-3">
            Sections
          </p>
          {groupSections.map(s => (
            <div
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={clsx(
                'flex items-center gap-2 px-4 py-3 border cursor-pointer transition-colors group',
                activeSection === s.id
                  ? 'border-gold/30 bg-gold/5 text-gold'
                  : 'border-white/5 text-cream/50 hover:text-cream hover:border-white/10'
              )}
            >
              <span className="flex-1 font-mono-label text-[10px] tracking-widest uppercase truncate">
                {s.name}
              </span>
              <span className={clsx(
                'w-1.5 h-1.5 rounded-full shrink-0',
                s.active ? 'bg-green-500' : 'bg-red-500/50'
              )} />
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={e => { e.stopPropagation(); toggleSection(s.id, s.active); }}
                  className="p-1 hover:text-gold transition-colors"
                >
                  {s.active ? <EyeOff size={11} /> : <Eye size={11} />}
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setEditSection(s); }}
                  className="p-1 hover:text-gold transition-colors"
                >
                  <Pencil size={11} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); deleteSection(s.id); }}
                  className="p-1 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Items panel */}
        <div>
          {!activeSection ? (
            <div className="py-20 text-center border border-white/5">
              <p className="text-cream/25 text-sm font-light">
                Select a section from the left to manage its items
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-light text-cream">
                    {sections.find(s => s.id === activeSection)?.name}
                  </h2>
                  <p className="font-mono-label text-[9px] text-cream/30 tracking-widest uppercase mt-1">
                    {sectionItems.length} items · {sectionItems.filter(i => i.active).length} active
                  </p>
                </div>
                <button
                  onClick={() => setShowAddItem(true)}
                  className="flex items-center gap-2 font-mono-label text-[10px] tracking-widest uppercase text-gold border border-gold/30 px-3 py-1.5 hover:bg-gold/5 transition-colors"
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>

              <div className="space-y-3">
                {sectionItems.length === 0 ? (
                  <div className="py-12 text-center border border-white/5">
                    <p className="text-cream/25 text-sm font-light">No items in this section yet</p>
                  </div>
                ) : (
                  sectionItems.map(item => (
                    <div
                      key={item.id}
                      className={clsx(
                        'flex items-start gap-4 p-5 border transition-colors',
                        item.active ? 'border-white/5 hover:border-gold/10' : 'border-white/3 opacity-50'
                      )}
                    >
                      {item.image_url && (
                        <div className="relative w-16 h-16 shrink-0 overflow-hidden">
                          <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-display text-lg font-light text-cream">{item.name}</h3>
                          <span className="font-mono-label text-sm text-gold">{item.price}</span>
                        </div>
                        {item.description && (
                          <p className="text-cream/40 text-xs mt-1 leading-relaxed">{item.description}</p>
                        )}
                        {item.note && (
                          <p className="text-cream/25 text-[10px] mt-1 italic">{item.note}</p>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => toggleItem(item.id, item.active)}
                          className="p-2 border border-white/5 hover:border-gold/20 text-cream/30 hover:text-gold transition-colors"
                        >
                          {item.active ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                        <button
                          onClick={() => setEditItem(item)}
                          className="p-2 border border-white/5 hover:border-gold/20 text-cream/30 hover:text-gold transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-2 border border-white/5 hover:border-red-800/40 text-cream/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Item Modal */}
      {(editItem !== null || showAddItem) && (
        <ItemModal
          item={editItem}
          onClose={() => { setEditItem(null); setShowAddItem(false); }}
          onSave={saveItem}
          onUpload={uploadImage}
          loading={loading}
          uploading={uploading}
        />
      )}

      {/* Section Modal */}
      {(editSection !== null || showAddSection) && (
        <SectionModal
          section={editSection}
          onClose={() => { setEditSection(null); setShowAddSection(false); }}
          onSave={saveSection}
          loading={loading}
        />
      )}
    </div>
  );
}

function ItemModal({ item, onClose, onSave, onUpload, loading, uploading }) {
  const [form, setForm] = useState({
    name: item?.name ?? '',
    description: item?.description ?? '',
    price: item?.price ?? '',
    note: item?.note ?? '',
    image_url: item?.image_url ?? '',
    active: item?.active ?? true,
  });
  const fileRef = useRef(null);
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await onUpload(file, item?.id);
    setForm(p => ({ ...p, image_url: url }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/90 backdrop-blur-sm">
      <div className="bg-noir-mid border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-display text-2xl font-light text-cream">
            {item ? 'Edit Item' : 'New Item'}
          </h2>
          <button onClick={onClose} className="text-cream/40 hover:text-gold transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block section-label text-[10px] mb-2">Name *</label>
            <input
              value={form.name}
              onChange={set('name')}
              required
              className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block section-label text-[10px] mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={set('description')}
              rows={3}
              className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block section-label text-[10px] mb-2">Price *</label>
              <input
                value={form.price}
                onChange={set('price')}
                placeholder="£24"
                className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block section-label text-[10px] mb-2">Note</label>
              <input
                value={form.note}
                onChange={set('note')}
                placeholder="e.g. For two"
                className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
              />
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="block section-label text-[10px] mb-2">Photo</label>
            {form.image_url && (
              <div className="relative w-full h-32 mb-3 overflow-hidden">
                <Image src={form.image_url} alt="Preview" fill className="object-cover" />
                <button
                  onClick={() => setForm(p => ({ ...p, image_url: '' }))}
                  className="absolute top-2 right-2 bg-noir/80 p-1 text-cream/60 hover:text-red-400 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 font-mono-label text-[10px] tracking-widest uppercase border border-white/10 text-cream/40 hover:text-gold hover:border-gold/30 px-4 py-2.5 transition-colors disabled:opacity-50"
            >
              <Upload size={12} /> {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={e => setForm(p => ({ ...p, active: e.target.checked }))}
              className="accent-gold"
            />
            <label htmlFor="active" className="font-mono-label text-[10px] text-cream/50 tracking-widest uppercase">
              Active (visible on menu)
            </label>
          </div>

          <button
            onClick={() => onSave(form)}
            disabled={loading}
            className="w-full btn-gold-filled py-3 font-mono-label text-xs tracking-widest uppercase disabled:opacity-50"
          >
            {loading ? 'Saving...' : item ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionModal({ section, onClose, onSave, loading }) {
  const [form, setForm] = useState({
    name: section?.name ?? '',
    slug: section?.slug ?? '',
    subtitle: section?.subtitle ?? '',
    active: section?.active ?? true,
  });
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/90 backdrop-blur-sm">
      <div className="bg-noir-mid border border-white/10 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-display text-2xl font-light text-cream">
            {section ? 'Edit Section' : 'New Section'}
          </h2>
          <button onClick={onClose} className="text-cream/40 hover:text-gold transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block section-label text-[10px] mb-2">Name *</label>
            <input
              value={form.name}
              onChange={set('name')}
              required
              className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block section-label text-[10px] mb-2">Slug * (e.g. raw-fish)</label>
            <input
              value={form.slug}
              onChange={set('slug')}
              placeholder="raw-fish"
              className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block section-label text-[10px] mb-2">Subtitle</label>
            <input
              value={form.subtitle}
              onChange={set('subtitle')}
              placeholder="Crudo"
              className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="sec-active"
              checked={form.active}
              onChange={e => setForm(p => ({ ...p, active: e.target.checked }))}
              className="accent-gold"
            />
            <label htmlFor="sec-active" className="font-mono-label text-[10px] text-cream/50 tracking-widest uppercase">
              Active
            </label>
          </div>
          <button
            onClick={() => onSave(form)}
            disabled={loading}
            className="w-full btn-gold-filled py-3 font-mono-label text-xs tracking-widest uppercase disabled:opacity-50"
          >
            {loading ? 'Saving...' : section ? 'Update Section' : 'Add Section'}
          </button>
        </div>
      </div>
    </div>
  );
}