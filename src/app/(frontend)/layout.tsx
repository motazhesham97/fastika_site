import type { Metadata } from 'next';
import { Header } from '@/widgets/header/ui';
import { Footer } from '@/widgets/footer/ui';

export const metadata: Metadata = {
  title: 'فستكا - نقاط البيع | Fastika Store Locator',
  description: 'اعثر على أقرب نقطة بيع لمنتجات فستكا - شوكولاتة دبي الفاخرة. صُنعت بحبّ لتجمع بين الفخامة والنكهة الفريدة.',
  keywords: ['فستكا', 'fastika', 'شوكولاتة دبي', 'نقاط البيع', 'إب', 'اليمن'],
  openGraph: {
    title: 'فستكا - نقاط البيع',
    description: 'اعثر على أقرب نقطة بيع لمنتجات فستكا الفاخرة',
    locale: 'ar_YE',
    type: 'website',
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl" lang="ar">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
