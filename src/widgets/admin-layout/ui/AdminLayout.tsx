import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';
import { PageTransition } from '@/shared/ui/page-transition';
import type { Admin } from '@/entities/admin/model';

interface AdminLayoutProps {
  children: React.ReactNode;
  admin: Admin | null;
  title: string;
}

export default function AdminLayout({ children, admin, title }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />

      <main className="flex-1 lg:mr-64 p-4 lg:p-8 pt-20 lg:pt-8">
        <AdminHeader admin={admin} title={title} />
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  );
}
