import { createClient } from '@/lib/supabase/server';
import ReservationsAdmin from '@/components/admin/ReservationsAdmin';

export default async function ReservationsPage() {
  const supabase = createClient();

  const today = new Date().toISOString().split('T')[0];

  const [{ data: reservations }, { data: tables }, { data: profile }] = await Promise.all([
    supabase.from('reservations').select('*').gte('date', today).order('date').order('time'),
    supabase.from('tables').select('*').eq('active', true).order('number'),
    supabase.from('profiles').select('role').eq('id', (await supabase.auth.getUser()).data.user?.id).single(),
  ]);

  return (
    <ReservationsAdmin
      initialReservations={reservations ?? []}
      tables={tables ?? []}
      isManager={['owner','manager'].includes(profile?.role)}
    />
  );
}