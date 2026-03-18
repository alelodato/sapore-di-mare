import TableEditor from '@/components/admin/TableEditor';
import { createClient } from '@/lib/supabase/server';

export default async function TablesPage() {
  const supabase = createClient();
  const { data: tables } = await supabase.from('tables').select('*').order('number');
  return <TableEditor initialTables={tables ?? []} />;
}