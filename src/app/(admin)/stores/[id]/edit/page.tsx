import { getAdminSession } from '@/features/admin-auth/lib';
import { getStoreById } from '@/entities/store/api';
import { redirect, notFound } from 'next/navigation';
import { AdminLayout } from '@/widgets/admin-layout/ui';
import { StoreForm } from '@/entities/store/ui';

interface EditStorePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditStorePage({ params }: EditStorePageProps) {
  const session = await getAdminSession();
  
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const store = await getStoreById(id);

  if (!store) {
    notFound();
  }

  return (
    <AdminLayout admin={session.admin} title={`تعديل: ${store.name}`}>
      <div className="max-w-2xl">
        <StoreForm store={store} mode="edit" />
      </div>
    </AdminLayout>
  );
}
