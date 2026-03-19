import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

function timesOverlap(time1, time2) {
  const toMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const start1 = toMinutes(time1);
  const end1 = start1 + 120;
  const start2 = toMinutes(time2);
  const end2 = start2 + 120;
  return start1 < end2 && start2 < end1;
}

function getTableRange(guests) {
  const n = parseInt(guests);
  if (n <= 2) return { min: 2, max: 2 };
  if (n <= 4) return { min: 4, max: 4 };
  if (n <= 6) return { min: 6, max: 6 };
  if (n <= 8) return { min: 8, max: 8 };
  return null;
}

export async function POST(request) {
  const { date, time, guests, excludeReservationId } = await request.json();

  if (!date || !time || !guests) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = createClient();

  const range = getTableRange(guests);
  if (!range) {
    return NextResponse.json({
      available: false,
      table: null,
      reason: 'invalid_guests'
    });
  }

  // Prendi tavoli attivi che rispettano la regola seats esatta
  const { data: tables } = await supabase
    .from('tables')
    .select('*')
    .eq('active', true)
    .eq('seats', range.min);

  if (!tables?.length) {
    return NextResponse.json({
      available: false,
      table: null,
      reason: 'no_suitable_tables'
    });
  }

  // Prendi TUTTE le prenotazioni per quella data
  let query = supabase
    .from('reservations')
    .select('id, table_id, time, guests')
    .eq('date', date);

  // Se stiamo modificando una prenotazione esistente, escludila
  if (excludeReservationId) {
    query = query.neq('id', excludeReservationId);
  }

  const { data: existingReservations, error: resError } = await query;

console.log('date:', date, 'time:', time, 'guests:', guests);
console.log('tables found:', tables);
console.log('existing reservations:', existingReservations);
console.log('res error:', resError);

const reservationsInSlot = existingReservations?.filter(r =>
  timesOverlap(r.time, time)
) ?? [];

console.log('reservations in slot:', reservationsInSlot);

const availableTable = tables.find(table => {
  const reservationsForTable = reservationsInSlot.filter(
    r => r.table_id === table.id
  );
  console.log(`table ${table.id} reservations:`, reservationsForTable);
  return reservationsForTable.length === 0;
});

console.log('available table:', availableTable);

  if (!availableTable) {
    return NextResponse.json({
      available: false,
      table: null,
      reason: 'all_tables_occupied'
    });
  }

  return NextResponse.json({ available: true, table: availableTable });
}