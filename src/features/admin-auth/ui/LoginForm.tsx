'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/features/admin-auth/lib';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginAdmin(email, password);

      if (result.success) {
        window.location.href = '/dashboard';
      } else {
        setError(result.error || 'حدث خطأ أثناء تسجيل الدخول');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    } catch {
      setError('حدث خطأ غير متوقع');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center brand-gradient p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-accent-orange/5" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.1 }}
            className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-accent-orange/25 shadow-float"
          >
            <Image src="/Asset 1.png" alt="شعار فستكا" fill className="object-cover" />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-white mb-1">فستكا</h1>
          <p className="text-white/60 text-sm">لوحة تحكم المسؤول</p>
        </div>

        {/* Login Form */}
        <motion.div
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-float">
            <CardHeader>
              <CardTitle className="text-center text-xl">تسجيل الدخول</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@fastika.com"
                    required
                    disabled={loading}
                    autoComplete="email"
                    className="text-right"
                    aria-describedby={error ? 'login-error' : undefined}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    autoComplete="current-password"
                    className="text-right"
                    aria-describedby={error ? 'login-error' : undefined}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand hover:bg-brand-dark transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 ms-2 animate-spin" aria-hidden="true" />
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-white/60 hover:text-white transition-colors text-sm focus-ring rounded-md px-2 py-1"
          >
            ← العودة للموقع الرئيسي
          </a>
        </div>
      </motion.div>
    </div>
  );
}
