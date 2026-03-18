import { createClient } from '@/lib/supabase/server';
import MenuAdmin from '@/components/admin/MenuAdmin';

export default async function MenuAdminPage() {
  const supabase = createClient();
  const [{ data: sections }, { data: items }] = await Promise.all([
    supabase.from('menu_sections').select('*').order('position'),
    supabase.from('menu_items').select('*').order('position'),
  ]);

  return <MenuAdmin initialSections={sections ?? []} initialItems={items ?? []} />;
}