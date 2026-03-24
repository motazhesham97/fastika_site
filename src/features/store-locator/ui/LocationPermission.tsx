'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { MapPin, Loader2, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationPermissionProps {
  permissionState: 'prompt' | 'granted' | 'denied' | 'unavailable';
  error: string | null;
  onRequestLocation: () => void;
  loading: boolean;
}

export default function LocationPermission({
  permissionState,
  error,
  onRequestLocation,
  loading,
}: LocationPermissionProps) {
  if (permissionState === 'granted') {
    return null;
  }

  const getContent = () => {
    switch (permissionState) {
      case 'denied':
        return {
          icon: <XCircle className="w-8 h-8 text-red-400" aria-hidden="true" />,
          iconBg: 'bg-red-500/10',
          title: 'تم رفض إذن الموقع',
          description: 'يمكنك السماح بالوصول للموقع من إعدادات المتصفح.',
          buttonText: null,
          role: 'alert' as const,
        };
      case 'unavailable':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-amber-400" aria-hidden="true" />,
          iconBg: 'bg-amber-500/10',
          title: 'خدمة الموقع غير متوفرة',
          description: 'خدمة تحديد الموقع غير متوفرة في متصفحك.',
          buttonText: null,
          role: 'alert' as const,
        };
      default:
        return {
          icon: <MapPin className="w-8 h-8 text-accent-orange" aria-hidden="true" />,
          iconBg: 'brand-gradient',
          title: 'هل تريد عرض أقرب نقاط البيع؟',
          description: 'اسمح لنا بالوصول إلى موقعك لترتيب نقاط البيع حسب المسافة.',
          buttonText: 'تحديد موقعي',
          role: 'status' as const,
        };
    }
  };

  const content = getContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
      role={content.role}
    >
      <Card className="border-2 border-dashed border-accent-orange/30 bg-accent-orange/5">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right">
            {/* Icon */}
            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${content.iconBg} flex items-center justify-center`}>
              {content.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-brand-dark mb-1">
                {content.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {content.description}
              </p>
              {error && (
                <p className="text-red-600 text-sm mt-2" role="alert">
                  {error}
                </p>
              )}
            </div>

            {/* Button */}
            {content.buttonText && (
              <Button
                onClick={onRequestLocation}
                disabled={loading}
                size="lg"
                className="flex-shrink-0 bg-accent-orange hover:bg-accent-orange-dark text-brand-dark font-bold gap-2 w-full sm:w-auto transition-colors duration-200"
                aria-label="السماح بتحديد الموقع الجغرافي"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>جاري التحديد...</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span>{content.buttonText}</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
