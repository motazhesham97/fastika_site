'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAdmin } from '@/features/admin-auth/lib';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import {
  LayoutDashboard,
  MapPin,
  Plus,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const navItems = [
  {
    href: '/dashboard',
    label: 'لوحة التحكم',
    icon: LayoutDashboard,
  },
  {
    href: '/stores',
    label: 'نقاط البيع',
    icon: MapPin,
  },
  {
    href: '/stores/add',
    label: 'إضافة نقطة بيع',
    icon: Plus,
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/login');
    router.refresh();
  };

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="mb-8 pb-5 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 group focus-ring rounded-lg">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-accent-orange/40 transition-all duration-300">
            <Image src="/Asset 1.png" alt="فستكا" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">فستكا</h1>
            <p className="text-white/50 text-xs">لوحة التحكم</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1" aria-label="التنقل الرئيسي">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 focus-ring ${isActive
                ? 'bg-accent-orange text-brand-dark font-semibold shadow-sm'
                : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-5 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-colors focus-ring"
          aria-label="عرض الموقع في نافذة جديدة"
        >
          <ExternalLink className="w-5 h-5" aria-hidden="true" />
          <span>عرض الموقع</span>
        </Link>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/15 hover:text-red-200 justify-start transition-colors"
          aria-label="تسجيل الخروج من لوحة التحكم"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          <span>تسجيل الخروج</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 brand-gradient min-h-screen p-5 fixed right-0 top-0 shadow-float"
        aria-label="القائمة الجانبية"
      >
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 brand-gradient z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <Link href="/dashboard" className="flex items-center gap-2 focus-ring rounded-md">
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/20">
            <Image src="/Asset 1.png" alt="فستكا" fill className="object-cover" />
          </div>
          <span className="text-white font-bold">فستكا</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white"
          aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Panel */}
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-y-0 right-0 w-72 brand-gradient z-50 p-5 pt-16 shadow-float"
              role="dialog"
              aria-label="القائمة الرئيسية"
            >
              <div className="flex flex-col h-full">
                <NavContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
