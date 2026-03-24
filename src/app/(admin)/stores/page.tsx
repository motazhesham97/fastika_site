import { getAdminSession } from '@/features/admin-auth/lib';
import { getAllStores } from '@/entities/store/api';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '@/widgets/admin-layout/ui';
import { StoreTable } from '@/entities/store/ui';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Plus, MapPin, CheckCircle, XCircle } from 'lucide-react';

export default async function StoresPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/login');
  }

  const stores = await getAllStores();

  const stats = [
    {
      title: 'إجمالي النقاط',
      value: stores.length,
      icon: MapPin,
      gradient: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
    },
    {
      title: 'نشطة',
      value: stores.filter((s) => s.is_active).length,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-emerald-600',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      title: 'معطلة',
      value: stores.filter((s) => !s.is_active).length,
      icon: XCircle,
      gradient: 'from-orange-400 to-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <AdminLayout admin={session.admin} title="نقاط البيع">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <Link href="/stores/add">
          <Button className="bg-brand hover:bg-brand-dark gap-2 transition-colors">
            <Plus className="w-5 h-5" aria-hidden="true" />
            إضافة نقطة بيع
          </Button>
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stores Table */}
      <StoreTable stores={stores} />
    </AdminLayout>
  );
}
