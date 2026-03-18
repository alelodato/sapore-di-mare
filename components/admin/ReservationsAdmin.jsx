'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Calendar, Users, Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function ReservationsAdmin({ initialReservations, tables, isManager }) {
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [view, setView] = useState('list'); // 'list' | 'floor'
  const [search, setSearch] = useState('');
  const supabase = createClient();

  const timeSlots = [
    '12:00','12:30','13:00','13:30','14:00','14:30',
    '18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30',
  ];

  const filtered = reservations.filter(r => {
    const matchDate = r.date === selectedDate;
    const matchSearch = search
      ? r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email?.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchDate && matchSearch;
  });

  const forTimeSlot = filtered.filter(r => r.time === selectedTime);

  // Tavoli occupati per lo slot selezionato
  const occupiedTableIds = new Set(
    forTimeSlot.filter(r => r.table_id).map(r => r.table_id)
  );

  const prevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const nextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const assignTable = async (reservationId, tableId) => {
    await supabase.from('reservations').update({ table_id: tableId }).eq('id', reservationId);
    setReservations(prev => prev.map(r => r.id === reservationId ? { ...r, table_id: tableId } : r));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="section-label mb-2">Manage</p>
          <h1 className="font-display text-4xl font-light text-cream">Reservations</h1>
        </div>
        <div className="flex gap-2">
          {['list','floor'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={clsx('font-mono-label text-[10px] tracking-widest uppercase px-4 py-2 border transition-colors',
                view === v ? 'border-gold/40 text-gold bg-gold/5' : 'border-white/10 text-cream/40 hover:text-cream'
              )}
            >
              {v === 'list' ? 'List View' : 'Floor Plan'}
            </button>
          ))}
        </div>
      </div>

      {/* Date navigator */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={prevDay} className="p-2 border border-white/10 hover:border-gold/30 text-cream/50 hover:text-gold transition-colors">
          <ChevronLeft size={16} />
        </button>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="bg-noir-mid border border-white/10 text-cream text-sm px-4 py-2 focus:outline-none focus:border-gold/50"
        />
        <button onClick={nextDay} className="p-2 border border-white/10 hover:border-gold/30 text-cream/50 hover:text-gold transition-colors">
          <ChevronRight size={16} />
        </button>
        <span className="text-cream/40 text-sm font-light">
          {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
        <span className="ml-auto font-mono-label text-xs text-gold border border-gold/20 px-3 py-1">
          {filtered.length} reservations
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-noir-mid border border-white/10 text-cream text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-gold/50"
        />
      </div>

      {view === 'list' ? (
        /* LIST VIEW */
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="py-16 text-center border border-white/5">
              <Calendar size={32} className="text-gold/20 mx-auto mb-4" />
              <p className="text-cream/30 font-light">No reservations for this date</p>
            </div>
          ) : (
            filtered.map(r => {
              const table = tables.find(t => t.id === r.table_id);
              return (
                <div key={r.id} className="p-5 border border-white/5 hover:border-gold/10 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <span className="font-mono-label text-sm text-gold w-14 shrink-0">{r.time}</span>
                      <div>
                        <p className="font-display text-lg font-light text-cream">{r.name}</p>
                        <p className="text-cream/30 text-xs mt-0.5">{r.email}</p>
                      </div>
                      <div className="flex items-center gap-2 text-cream/40">
                        <Users size={12} />
                        <span className="text-xs">{r.guests} guests</span>
                      </div>
                      {r.notes && (
                        <p className="text-cream/25 text-xs italic hidden lg:block max-w-xs truncate">{r.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {table ? (
                        <span className="font-mono-label text-[9px] tracking-widest uppercase text-gold border border-gold/30 px-2 py-1">
                          Table {table.number}
                        </span>
                      ) : (
                        isManager && (
                          <select
                            onChange={e => assignTable(r.id, e.target.value)}
                            className="bg-noir border border-white/10 text-cream/50 text-xs px-2 py-1 focus:outline-none focus:border-gold/30"
                            defaultValue=""
                          >
                            <option value="" disabled>Assign table</option>
                            {tables
                              .filter(t => t.seats >= r.guests && !occupiedTableIds.has(t.id))
                              .map(t => (
                                <option key={t.id} value={t.id}>
                                  Table {t.number} ({t.seats} seats)
                                </option>
                              ))}
                          </select>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* FLOOR PLAN VIEW */
        <div>
          {/* Time slot selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {timeSlots.map(t => (
              <button key={t} onClick={() => setSelectedTime(t)}
                className={clsx('font-mono-label text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-colors',
                  selectedTime === t ? 'border-gold/40 text-gold bg-gold/5' : 'border-white/10 text-cream/30 hover:text-cream'
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <FloorPlan
            tables={tables}
            occupiedTableIds={occupiedTableIds}
            reservationsAtTime={forTimeSlot}
          />
        </div>
      )}
    </div>
  );
}

function FloorPlan({ tables, occupiedTableIds, reservationsAtTime }) {
  return (
    <div className="border border-white/10 bg-noir-mid relative overflow-auto" style={{ height: '600px' }}>
      {/* Legend */}
      <div className="absolute top-4 right-4 flex gap-4 z-10">
        {[
          { color: 'bg-gold/20 border-gold/40', label: 'Available' },
          { color: 'bg-red-900/40 border-red-700/50', label: 'Occupied' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 border ${l.color}`} />
            <span className="font-mono-label text-[9px] text-cream/40 tracking-wider uppercase">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Floor label */}
      <div className="absolute top-4 left-4 z-10">
        <p className="font-mono-label text-[9px] text-cream/20 tracking-widest uppercase">Dining Room</p>
      </div>

      {/* Tables */}
      {tables.map(table => {
        const isOccupied = occupiedTableIds.has(table.id);
        const reservation = reservationsAtTime.find(r => r.table_id === table.id);

        return (
          <div
            key={table.id}
            className={clsx(
              'absolute border flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group',
              table.shape === 'round' ? 'rounded-full' : 'rounded-sm',
              isOccupied
                ? 'bg-red-900/40 border-red-700/50 hover:bg-red-900/60'
                : 'bg-gold/10 border-gold/30 hover:bg-gold/20'
            )}
            style={{
              left: table.pos_x,
              top: table.pos_y,
              width: table.width,
              height: table.height,
            }}
            title={reservation ? `${reservation.name} — ${reservation.guests} guests` : `Table ${table.number} — ${table.seats} seats`}
          >
            <span className="font-mono-label text-[10px] text-gold tracking-wider">{table.number}</span>
            <span className="font-mono-label text-[8px] text-cream/30">{table.seats}p</span>
            {reservation && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-noir border border-white/10 px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <p className="font-mono-label text-[8px] text-cream tracking-wider">{reservation.name}</p>
              </div>
            )}
          </div>
        );
      })}

      {tables.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-cream/20 font-light text-sm">
            No tables configured — go to Settings to add tables
          </p>
        </div>
      )}
    </div>
  );
}