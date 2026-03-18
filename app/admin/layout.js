import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = { title: 'Admin — Sapore Di Mare' };

export default async function AdminLayout({ children }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/admin/login');  // ← cambia questa riga

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || !profile.active) redirect('/admin/login');  // ← e questa

  return (
    <div className="min-h-screen bg-noir flex">
      <AdminSidebar profile={profile} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}