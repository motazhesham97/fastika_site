import { getAdminSession } from '@/features/admin-auth/lib';
import { getStoresCount } from '@/entities/store/api';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/widgets/admin-layout/ui';
import Link from 'next/link';
import { Card, CardContent } from '@/shared/ui/card';
import { MapPin, CheckCircle, XCircle, Clock, Plus, ExternalLink } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/login');
  }

  const storesCount = await getStoresCount();

  const stats = [
    {
      title: 'إجمالي نقاط البيع',
      value: storesCount.total,
      icon: MapPin,
      gradient: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'نقاط بيع نشطة',
      value: storesCount.active,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-emerald-600',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      title: 'نقاط بيع معطلة',
      value: storesCount.total - storesCount.active,
      icon: XCircle,
      gradient: 'from-orange-400 to-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      title: 'آخر تسجيل دخول',
      value: session.admin.last_login
        ? new Date(session.admin.last_login).toLocaleDateString('ar-YE')
        : 'أول دخول',
      icon: Clock,
      gradient: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      isText: true,
    },
  ];

  const quickActions = [
    {
      title: 'إضافة نقطة بيع',
      description: 'أضف نقطة بيع جديدة',
      href: '/stores/add',
      icon: Plus,
      gradient: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
    },
    {
      title: 'عرض نقاط البيع',
      description: 'إدارة جميع النقاط',
      href: '/stores',
      icon: MapPin,
      gradient: 'brand-gradient',
      lightColor: 'bg-green-50',
    },
    {
      title: 'عرض الموقع',
      description: 'شاهد الموقع كما يراه العملاء',
      href: '/',
      external: true,
      icon: ExternalLink,
      gradient: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-50',
    },
  ];

  return (
    <AdminLayout admin={session.admin} title="لوحة التحكم">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${stat.gradient === 'brand-gradient' ? 'brand-gradient' : `bg-gradient-to-br ${stat.gradient}`} rounded-xl flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className={`font-extrabold ${stat.isText ? 'text-sm' : 'text-2xl'} text-foreground`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-5">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const linkProps = action.external
                ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  {...linkProps}
                  className={`flex items-center gap-3 p-4 ${action.lightColor} rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 focus-ring`}
                >
                  <div
                    className={`w-10 h-10 ${action.gradient === 'brand-gradient' ? 'brand-gradient' : `bg-gradient-to-br ${action.gradient}`} rounded-lg flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
