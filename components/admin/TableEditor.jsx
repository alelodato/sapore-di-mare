'use client';

import { useState, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Save } from 'lucide-react';
import clsx from 'clsx';

const FLOOR_W = 900;
const FLOOR_H = 600;

export default function TableEditor({ initialTables }) {
  const [tables, setTables] = useState(initialTables);
  // Tiene traccia dei tavoli da eliminare al salvataggio
  const [pendingDeletes, setPendingDeletes] = useState([]);
  // Tiene traccia dei tavoli nuovi non ancora salvati
  const [unsavedIds, setUnsavedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const floorRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const supabase = createClient();

  const selectedTable = tables.find(t => t.id === selected);

  // ─── DRAG ───
  const onMouseDown = useCallback((e, id) => {
    e.preventDefault();
    setSelected(id);
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(id);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    const floor = floorRef.current.getBoundingClientRect();
    const t = tables.find(t => t.id === dragging);
    const x = Math.max(0, Math.min(e.clientX - floor.left - dragOffset.current.x, FLOOR_W - t.width));
    const y = Math.max(0, Math.min(e.clientY - floor.top - dragOffset.current.y, FLOOR_H - t.height));
    setTables(prev => prev.map(t => t.id === dragging ? { ...t, pos_x: x, pos_y: y } : t));
    setHasChanges(true);
  }, [dragging, tables]);

  const onMouseUp = useCallback(() => setDragging(null), []);

  // ─── ADD TABLE — solo in memoria, non su DB ───
  const addTable = (shape) => {
    const tempId = `temp-${Date.now()}`;
    const number = tables.length > 0 ? Math.max(...tables.map(t => t.number)) + 1 : 1;
    const newTable = {
      id: tempId,
      number,
      shape,
      seats: 4,
      pos_x: 100 + (tables.length % 5) * 110,
      pos_y: 100 + Math.floor(tables.length / 5) * 130,
      width: shape === 'round' ? 80 : 100,
      height: shape === 'round' ? 80 : 70,
      active: true,
    };
    setTables(prev => [...prev, newTable]);
    setUnsavedIds(prev => new Set([...prev, tempId]));
    setSelected(tempId);
    setHasChanges(true);
  };

  // ─── DELETE TABLE — solo in memoria finché non si salva ───
  const deleteTable = (id) => {
    // Se è un tavolo già salvato nel DB, aggiungilo ai pending deletes
    if (!unsavedIds.has(id)) {
      setPendingDeletes(prev => [...prev, id]);
    }
    // Sempre rimuovilo dalla vista
    setTables(prev => prev.filter(t => t.id !== id));
    setUnsavedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (selected === id) setSelected(null);
    setHasChanges(true);
  };

  // ─── UPDATE PROP ───
  const updateProp = (id, key, value) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, [key]: value } : t));
    setHasChanges(true);
  };

  // ─── SAVE ALL — ora salva davvero tutto ───
  const saveAll = async () => {
    // 1. Elimina i tavoli marcati per l'eliminazione
    for (const id of pendingDeletes) {
      await supabase.from('tables').delete().eq('id', id);
    }

    const newIdMap = {};

    // 2. Inserisci i tavoli nuovi (temp id)
    for (const t of tables) {
      if (unsavedIds.has(t.id)) {
        const { data } = await supabase.from('tables').insert([{
          number: t.number,
          shape: t.shape,
          seats: t.seats,
          pos_x: t.pos_x,
          pos_y: t.pos_y,
          width: t.width,
          height: t.height,
          active: t.active,
        }]).select().single();
        if (data) newIdMap[t.id] = data.id;
      }
    }

    // 3. Aggiorna posizioni dei tavoli esistenti
    for (const t of tables) {
      if (!unsavedIds.has(t.id)) {
        await supabase.from('tables').update({
          pos_x: t.pos_x,
          pos_y: t.pos_y,
          seats: t.seats,
          number: t.number,
          width: t.width,
          height: t.height,
          shape: t.shape,
        }).eq('id', t.id);
      }
    }

    // 4. Aggiorna gli id temporanei con quelli reali
    setTables(prev => prev.map(t => {
      if (newIdMap[t.id]) return { ...t, id: newIdMap[t.id] };
      return t;
    }));

    // 5. Reset stato
    setUnsavedIds(new Set());
    setPendingDeletes([]);
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label mb-2">Configure</p>
          <h1 className="font-display text-4xl font-light text-cream">Floor Plan</h1>
          {hasChanges && (
            <p className="font-mono-label text-[9px] text-gold/60 tracking-wider uppercase mt-1">
              ● Unsaved changes
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={() => addTable('round')}
            className="flex items-center gap-2 font-mono-label text-[10px] tracking-widest uppercase border border-white/10 text-cream/50 hover:text-gold hover:border-gold/30 px-4 py-2.5 transition-colors"
          >
            <Plus size={12} /> Round Table
          </button>
          <button onClick={() => addTable('rect')}
            className="flex items-center gap-2 font-mono-label text-[10px] tracking-widest uppercase border border-white/10 text-cream/50 hover:text-gold hover:border-gold/30 px-4 py-2.5 transition-colors"
          >
            <Plus size={12} /> Rect Table
          </button>
          <button
            onClick={saveAll}
            disabled={!hasChanges}
            className={clsx(
              'flex items-center gap-2 font-mono-label text-[10px] tracking-widest uppercase px-4 py-2.5 transition-all',
              saved
                ? 'bg-green-900/40 border border-green-700/50 text-green-400'
                : hasChanges
                  ? 'btn-gold-filled'
                  : 'border border-white/10 text-cream/20 cursor-not-allowed'
            )}
          >
            <Save size={12} /> {saved ? 'Saved!' : 'Save Layout'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr,280px] gap-6">
        {/* Floor canvas */}
        <div
          ref={floorRef}
          className="relative border border-white/10 bg-noir-mid overflow-hidden select-none"
          style={{ width: FLOOR_W, height: FLOOR_H }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Grid */}
          <svg className="absolute inset-0 opacity-10" width={FLOOR_W} height={FLOOR_H}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <p className="absolute top-3 left-4 font-mono-label text-[9px] text-cream/15 tracking-widest uppercase">
            Dining Room — drag to position
          </p>

          {tables.map(table => (
            <div
              key={table.id}
              onMouseDown={e => onMouseDown(e, table.id)}
              className={clsx(
                'absolute flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-shadow',
                table.shape === 'round' ? 'rounded-full' : 'rounded-sm',
                unsavedIds.has(table.id) && 'opacity-70 border-dashed',
                selected === table.id
                  ? 'bg-gold/25 border-2 border-gold shadow-lg shadow-gold/20'
                  : 'bg-gold/10 border border-gold/30 hover:bg-gold/20'
              )}
              style={{ left: table.pos_x, top: table.pos_y, width: table.width, height: table.height }}
            >
              <span className="font-mono-label text-xs text-gold font-medium">{table.number}</span>
              <span className="font-mono-label text-[8px] text-cream/40">{table.seats}p</span>
              {unsavedIds.has(table.id) && (
                <span className="font-mono-label text-[7px] text-gold/40 uppercase">new</span>
              )}
            </div>
          ))}

          {tables.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-cream/20 text-sm font-light">Add tables using the buttons above</p>
            </div>
          )}
        </div>

        {/* Properties panel */}
        <div className="space-y-4">
          <h3 className="font-mono-label text-[10px] tracking-widest uppercase text-cream/40">
            {selectedTable ? `Table ${selectedTable.number} Properties` : 'Select a table'}
          </h3>

          {selectedTable ? (
            <div className="space-y-4">
              <div>
                <label className="block section-label text-[9px] mb-2">Table Number</label>
                <input
                  type="number"
                  value={selectedTable.number}
                  onChange={e => updateProp(selectedTable.id, 'number', parseInt(e.target.value))}
                  className="w-full bg-noir-mid border border-white/10 text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="block section-label text-[9px] mb-2">Seats</label>
                <select
                  value={selectedTable.seats}
                  onChange={e => updateProp(selectedTable.id, 'seats', parseInt(e.target.value))}
                  className="w-full bg-noir-mid border border-white/10 text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold/50"
                >
                  <option value={2}>2 seats</option>
                  <option value={4}>4 seats</option>
                  <option value={6}>6 seats</option>
                  <option value={8}>8 seats</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block section-label text-[9px] mb-2">Width</label>
                  <input
                    type="number"
                    value={selectedTable.width}
                    onChange={e => updateProp(selectedTable.id, 'width', parseInt(e.target.value))}
                    className="w-full bg-noir-mid border border-white/10 text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold/50"
                  />
                </div>
                <div>
                  <label className="block section-label text-[9px] mb-2">Height</label>
                  <input
                    type="number"
                    value={selectedTable.height}
                    onChange={e => updateProp(selectedTable.id, 'height', parseInt(e.target.value))}
                    className="w-full bg-noir-mid border border-white/10 text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold/50"
                  />
                </div>
              </div>
              <div>
                <label className="block section-label text-[9px] mb-2">Shape</label>
                <div className="grid grid-cols-2 gap-2">
                  {['round', 'rect'].map(s => (
                    <button key={s}
                      onClick={() => updateProp(selectedTable.id, 'shape', s)}
                      className={clsx(
                        'py-2 border font-mono-label text-[9px] tracking-widest uppercase transition-colors',
                        selectedTable.shape === s ? 'border-gold/40 text-gold bg-gold/5' : 'border-white/10 text-cream/40'
                      )}
                    >
                      {s === 'round' ? '⬤ Round' : '▬ Rect'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <p className="section-label text-[9px] mb-1">Position</p>
                <p className="font-mono-label text-[10px] text-cream/30">
                  X: {Math.round(selectedTable.pos_x)} · Y: {Math.round(selectedTable.pos_y)}
                </p>
              </div>
              <button
                onClick={() => deleteTable(selectedTable.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-800/40 text-red-400/60 hover:text-red-400 hover:border-red-700/60 font-mono-label text-[10px] tracking-widest uppercase transition-colors"
              >
                <Trash2 size={12} /> Delete Table
              </button>
            </div>
          ) : (
            <div className="py-8 text-center border border-white/5">
              <p className="text-cream/20 text-xs font-light">Click a table to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}