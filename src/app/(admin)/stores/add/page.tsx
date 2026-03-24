import { getAdminSession } from '@/features/admin-auth/lib';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/widgets/admin-layout/ui';
import { StoreForm } from '@/entities/store/ui';

export default async function AddStorePage() {
  const session = await getAdminSession();
  
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout admin={session.admin} title="إضافة نقطة بيع جديدة">
      <div className="max-w-2xl">
        <StoreForm mode="create" />
      </div>
    </AdminLayout>
  );
}
