import type { Admin } from '@/entities/admin/model';
import { User } from 'lucide-react';

interface AdminHeaderProps {
  admin: Admin | null;
  title: string;
}

export default function AdminHeader({ admin, title }: AdminHeaderProps) {
  return (
    <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground">{title}</h1>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-6 h-6 rounded-full brand-gradient flex items-center justify-center" aria-hidden="true">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-muted-foreground text-sm">
            مرحباً، <span className="font-medium text-foreground">{admin?.name || admin?.email || 'المسؤول'}</span>
          </p>
        </div>
      </div>
      <div className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
        {new Date().toLocaleDateString('ar-YE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </header>
  );
}
