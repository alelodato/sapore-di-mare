'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit2, Trash2, X, Calendar, Clock, Users, FileText, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
];

const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8'];

const emptyForm = {
  name: '',
  email: '',
  date: '',
  time: '19:00',
  guests: '2',
  notes: '',
};

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-noir/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-noir-mid border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-display text-2xl font-light text-cream">{title}</h2>
          <button onClick={onClose} className="text-cream/40 hover:text-gold transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ConfirmModal({ message, onConfirm, onCancel, loading }) {
  return (
    <Modal title="Confirm Deletion" onClose={onCancel}>
      <p className="text-cream/60 font-light mb-8 leading-relaxed">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 border border-white/10 font-mono-label text-xs tracking-widest uppercase text-cream/50 hover:border-white/30 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-3 bg-red-900/60 border border-red-800/50 font-mono-label text-xs tracking-widest uppercase text-red-400 hover:bg-red-800/60 transition-colors disabled:opacity-50"
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
}

function ReservationForm({ initial, onSubmit, loading, error }) {
  const [form, setForm] = useState(initial || emptyForm);
  const today = new Date().toISOString().split('T')[0];
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-800/50 text-red-400 text-sm font-light">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block section-label text-[10px] mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Your full name"
            className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
        <div className="col-span-2">
          <label className="block section-label text-[10px] mb-2">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder="your@email.com"
            className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
        <div>
          <label className="block section-label text-[10px] mb-2">Date *</label>
          <input
            type="date"
            required
            min={today}
            value={form.date}
            onChange={set('date')}
            className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors appearance-none"
          />
        </div>
        <div>
          <label className="block section-label text-[10px] mb-2">Time *</label>
          <div className="relative">
            <select
              required
              value={form.time}
              onChange={set('time')}
              className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors appearance-none"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 pointer-events-none" />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block section-label text-[10px] mb-2">Guests *</label>
          <div className="relative">
            <select
              required
              value={form.guests}
              onChange={set('guests')}
              className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors appearance-none"
            >
              {GUEST_OPTIONS.map((g) => (
                <option key={g} value={g}>{g} {g === '1' ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 pointer-events-none" />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block section-label text-[10px] mb-2">Special Requests</label>
          <textarea
            value={form.notes}
            onChange={set('notes')}
            rows={3}
            placeholder="Dietary requirements, allergies, special occasions..."
            className="w-full bg-noir border border-white/10 text-cream text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gold-filled py-4 font-mono-label text-xs tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Checking availability...' : initial ? 'Update Reservation' : 'Confirm Reservation'}
      </button>
    </form>
  );
}

function ReservationCard({ reservation, onEdit, onDelete }) {
  const date = new Date(reservation.date + 'T00:00:00');
  const formatted = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const isPast = date < new Date(new Date().toDateString());

  return (
    <div className={clsx(
      'border p-6 transition-colors duration-200',
      isPast ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-gold/20'
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className={clsx(
              'font-mono-label text-[10px] tracking-widest uppercase px-2 py-1',
              isPast ? 'bg-white/5 text-cream/30' : 'bg-gold/10 text-gold border border-gold/20'
            )}>
              {isPast ? 'Past' : 'Upcoming'}
            </span>
          </div>
          <h3 className="font-display text-xl font-light text-cream mb-4">{reservation.name}</h3>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
            <div className="flex items-center gap-2 text-cream/50">
              <Calendar size={13} className="text-gold/60 shrink-0" />
              <span className="text-sm font-light">{formatted}</span>
            </div>
            <div className="flex items-center gap-2 text-cream/50">
              <Clock size={13} className="text-gold/60 shrink-0" />
              <span className="text-sm font-light">{reservation.time}</span>
            </div>
            <div className="flex items-center gap-2 text-cream/50">
              <Users size={13} className="text-gold/60 shrink-0" />
              <span className="text-sm font-light">
                {reservation.guests} {parseInt(reservation.guests) === 1 ? 'Guest' : 'Guests'}
              </span>
            </div>
            {reservation.notes && (
              <div className="flex items-start gap-2 text-cream/50 col-span-2">
                <FileText size={13} className="text-gold/60 shrink-0 mt-0.5" />
                <span className="text-sm font-light line-clamp-2">{reservation.notes}</span>
              </div>
            )}
          </div>
        </div>
        {!isPast && (
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={() => onEdit(reservation)}
              className="p-2 text-cream/30 hover:text-gold border border-white/5 hover:border-gold/30 transition-all duration-200"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDelete(reservation)}
              className="p-2 text-cream/30 hover:text-red-400 border border-white/5 hover:border-red-800/40 transition-all duration-200"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReservationDashboard({ user }) {
  const supabase = createClient();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editReservation, setEditReservation] = useState(null);
  const [deleteReservation, setDeleteReservation] = useState(null);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    if (!error) setReservations(data || []);
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // Controlla disponibilità tavoli
const checkAvailability = async (date, time, guests, excludeId = null) => {
  const res = await fetch('/api/reservations/available', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      date,
      time,
      guests: parseInt(guests),
      excludeReservationId: excludeId,
    }),
  });
  return await res.json();
};

const handleCreate = async (form) => {
  setFormLoading(true);
  setFormError('');

  const { available, table } = await checkAvailability(form.date, form.time, form.guests);

  if (!available) {
    setFormError(`No tables available for ${form.guests} guests at ${form.time}. Please try a different time or date.`);
    setFormLoading(false);
    return;
  }

  const { error } = await supabase.from('reservations').insert([{
    user_id: user.id,
    name: form.name,
    email: form.email,
    date: form.date,
    time: form.time,
    guests: parseInt(form.guests),
    notes: form.notes || null,
    table_id: table.id,
  }]);

  setFormLoading(false);
  if (error) {
    setFormError(error.message);
  } else {
    setShowCreateModal(false);
    setSuccess(`Table ${table.number} confirmed for ${form.date} at ${form.time}. We look forward to welcoming you!`);
    setTimeout(() => setSuccess(''), 6000);
    fetchReservations();
  }
};

const handleUpdate = async (form) => {
  setFormLoading(true);
  setFormError('');

  // Passa l'id della prenotazione corrente per escluderla dal check
  const { available, table } = await checkAvailability(
    form.date,
    form.time,
    form.guests,
    editReservation.id
  );

  if (!available) {
    setFormError(`No tables available for ${form.guests} guests at ${form.time}. Please try a different time or date.`);
    setFormLoading(false);
    return;
  }

  const { error } = await supabase
    .from('reservations')
    .update({
      name: form.name,
      email: form.email,
      date: form.date,
      time: form.time,
      guests: parseInt(form.guests),
      notes: form.notes || null,
      table_id: table.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', editReservation.id)
    .eq('user_id', user.id);

  setFormLoading(false);
  if (error) {
    setFormError(error.message);
  } else {
    setEditReservation(null);
    setSuccess('Reservation updated successfully.');
    setTimeout(() => setSuccess(''), 4000);
    fetchReservations();
  }
};

  const handleDelete = async () => {
    setDeleteLoading(true);
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', deleteReservation.id)
      .eq('user_id', user.id);
    setDeleteLoading(false);
    if (!error) {
      setDeleteReservation(null);
      fetchReservations();
    }
  };

  const upcoming = reservations.filter(
    (r) => new Date(r.date + 'T00:00:00') >= new Date(new Date().toDateString())
  );
  const past = reservations.filter(
    (r) => new Date(r.date + 'T00:00:00') < new Date(new Date().toDateString())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl lg:text-4xl font-light text-cream">
            My <span className="italic text-gold">Reservations</span>
          </h2>
          <p className="text-cream/40 text-sm font-light mt-2">Welcome back, {user.email}</p>
        </div>
        <button
          onClick={() => { setShowCreateModal(true); setFormError(''); }}
          className="btn-gold flex items-center gap-2 text-xs py-3"
        >
          <Plus size={14} /> New Booking
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="mb-6 p-4 bg-gold/10 border border-gold/30 text-gold text-sm font-light">
          {success}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div className="p-5 border border-white/5 bg-noir-mid">
          <p className="section-label text-[10px] mb-2">Upcoming</p>
          <p className="font-display text-4xl font-light text-gold">{upcoming.length}</p>
        </div>
        <div className="p-5 border border-white/5 bg-noir-mid">
          <p className="section-label text-[10px] mb-2">Total Visits</p>
          <p className="font-display text-4xl font-light text-cream">{reservations.length}</p>
        </div>
        <div className="hidden lg:block p-5 border border-white/5 bg-noir-mid">
          <p className="section-label text-[10px] mb-2">Total Covers</p>
          <p className="font-display text-4xl font-light text-cream">
            {reservations.reduce((s, r) => s + parseInt(r.guests), 0)}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="inline-block w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      ) : reservations.length === 0 ? (
        <div className="py-20 text-center border border-white/5">
          <Calendar size={36} className="text-gold/20 mx-auto mb-6" />
          <h3 className="font-display text-2xl font-light text-cream mb-3">No reservations yet</h3>
          <p className="text-cream/40 text-sm font-light mb-8">Book your first table at Sapore Di Mare</p>
          <button onClick={() => setShowCreateModal(true)} className="btn-gold-filled text-xs py-3 px-8">
            Make a Reservation
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {upcoming.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-5">
                <h3 className="section-label text-[11px]">Upcoming</h3>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="space-y-4">
                {upcoming.map((r) => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    onEdit={(res) => { setEditReservation(res); setFormError(''); }}
                    onDelete={setDeleteReservation}
                  />
                ))}
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-5">
                <h3 className="section-label text-[11px] text-cream/30">Past</h3>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="space-y-4">
                {past.slice(0, 5).map((r) => (
                  <ReservationCard
                    key={r.id}
                    reservation={r}
                    onEdit={(res) => { setEditReservation(res); setFormError(''); }}
                    onDelete={setDeleteReservation}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showCreateModal && (
        <Modal title="New Reservation" onClose={() => setShowCreateModal(false)}>
          <ReservationForm
            onSubmit={handleCreate}
            loading={formLoading}
            error={formError}
          />
        </Modal>
      )}

      {editReservation && (
        <Modal title="Edit Reservation" onClose={() => setEditReservation(null)}>
          <ReservationForm
            initial={{
              name: editReservation.name,
              email: editReservation.email,
              date: editReservation.date,
              time: editReservation.time,
              guests: String(editReservation.guests),
              notes: editReservation.notes || '',
            }}
            onSubmit={handleUpdate}
            loading={formLoading}
            error={formError}
          />
        </Modal>
      )}

      {deleteReservation && (
        <ConfirmModal
          message={`Are you sure you want to cancel your reservation on ${new Date(deleteReservation.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at ${deleteReservation.time}? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteReservation(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
}