import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'لوحة التحكم - فستكا',
  description: 'لوحة تحكم إدارة نقاط البيع',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background" dir="rtl" lang="ar">
      {children}
    </div>
  );
}
