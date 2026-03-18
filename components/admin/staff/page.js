import { createClient } from '@/lib/supabase/server';
import StaffAdmin from '@/components/admin/StaffAdmin';
import { redirect } from 'next/navigation';

export default async function StaffPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: currentProfile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single();

  if (!['owner','manager'].includes(currentProfile?.role)) redirect('/admin');

  const { data: profiles } = await supabase
    .from('profiles').select('*').order('created_at');

  return <StaffAdmin profiles={profiles ?? []} currentRole={currentProfile.role} />;
}