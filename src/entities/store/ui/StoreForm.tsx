'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Store, StoreFormData } from '@/entities/store/model';
import { createStore, updateStore } from '@/entities/store/api/mutations';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { Card, CardContent } from '@/shared/ui/card';
import { Loader2, MapPinned, Info } from 'lucide-react';
import { toast } from 'sonner';

const storeSchema = z.object({
  name: z.string().min(2, 'اسم البقالة مطلوب (على الأقل حرفين)'),
  address: z.string().min(5, 'العنوان مطلوب (على الأقل 5 أحرف)'),
  latitude: z.number({ message: 'خط العرض مطلوب' })
    .min(-90, 'خط العرض يجب أن يكون بين -90 و 90')
    .max(90, 'خط العرض يجب أن يكون بين -90 و 90'),
  longitude: z.number({ message: 'خط الطول مطلوب' })
    .min(-180, 'خط الطول يجب أن يكون بين -180 و 180')
    .max(180, 'خط الطول يجب أن يكون بين -180 و 180'),
  phone: z.string().optional(),
  google_map_url: z.string().url('رابط غير صحيح').optional().or(z.literal('')),
  is_active: z.boolean().optional(),
});

interface StoreFormProps {
  store?: Store;
  mode: 'create' | 'edit';
}

export default function StoreForm({ store, mode }: StoreFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: store
      ? {
        name: store.name,
        address: store.address,
        latitude: store.latitude,
        longitude: store.longitude,
        phone: store.phone || '',
        google_map_url: store.google_map_url || '',
        is_active: store.is_active,
      }
      : {
        is_active: true,
      },
  });

  const isActive = watch('is_active');

  const onSubmit = async (data: StoreFormData) => {
    setLoading(true);

    try {
      if (mode === 'create') {
        await createStore({
          name: data.name,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          phone: data.phone || null,
          google_map_url: data.google_map_url || null,
          is_active: data.is_active ?? true,
        });
        toast.success('تم إضافة نقطة البيع بنجاح');
      } else if (store) {
        await updateStore({
          id: store.id,
          name: data.name,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          phone: data.phone || null,
          google_map_url: data.google_map_url || null,
          is_active: data.is_active,
        });
        toast.success('تم تحديث بيانات نقطة البيع بنجاح');
      }

      router.push('/admin/stores');
      router.refresh();
    } catch (err) {
      console.error('Form submission error:', err);
      toast.error('حدث خطأ أثناء حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  // Extract coordinates from Google Maps URL
  const extractCoordinates = () => {
    const url = watch('google_map_url');

    if (!url) {
      toast.error('الرجاء إدخال رابط Google Maps أولاً');
      return;
    }

    const patterns = [
      /@(-?\d+\.\d+),(-?\d+\.\d+)/,
      /q=(-?\d+\.\d+),(-?\d+\.\d+)/,
      /ll=(-?\d+\.\d+),(-?\d+\.\d+)/,
      /\/(-?\d+\.\d+),(-?\d+\.\d+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        setValue('latitude', parseFloat(match[1]));
        setValue('longitude', parseFloat(match[2]));
        toast.success('تم استخراج الإحداثيات بنجاح');
        return;
      }
    }

    toast.error('لم يتم العثور على إحداثيات في الرابط');
  };

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info Fieldset */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPinned className="w-4 h-4 text-brand" aria-hidden="true" />
              المعلومات الأساسية
            </legend>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                اسم البقالة <span className="text-destructive" aria-hidden="true">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                {...register('name')}
                placeholder="مثال: سوبر ماركت الأمل"
                className="text-right"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-destructive text-sm" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">
                العنوان <span className="text-destructive" aria-hidden="true">*</span>
              </Label>
              <Input
                type="text"
                id="address"
                {...register('address')}
                placeholder="مثال: إب، شارع العدين، جوار مسجد الرحمن"
                className="text-right"
                aria-required="true"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <p id="address-error" className="text-destructive text-sm" role="alert">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
              <Input
                type="tel"
                id="phone"
                {...register('phone')}
                placeholder="مثال: 777123456"
                className="text-right"
              />
            </div>
          </fieldset>

          {/* Location Fieldset */}
          <fieldset className="space-y-4 pt-4 border-t border-border">
            <legend className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPinned className="w-4 h-4 text-accent-orange" aria-hidden="true" />
              بيانات الموقع
            </legend>

            {/* Google Maps URL */}
            <div className="space-y-2">
              <Label htmlFor="google_map_url">رابط Google Maps</Label>
              <div className="flex gap-2">
                <Input
                  type="url"
                  id="google_map_url"
                  {...register('google_map_url')}
                  placeholder="https://maps.app.goo.gl/..."
                  className="flex-1 text-right"
                  aria-invalid={!!errors.google_map_url}
                  aria-describedby="google-map-hint"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={extractCoordinates}
                  className="transition-colors"
                >
                  استخراج الإحداثيات
                </Button>
              </div>
              {errors.google_map_url && (
                <p className="text-destructive text-sm" role="alert">
                  {errors.google_map_url.message}
                </p>
              )}
              <p id="google-map-hint" className="text-muted-foreground text-sm flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>الصق رابط Google Maps ثم اضغط &quot;استخراج الإحداثيات&quot; لملء خطي العرض والطول تلقائياً</span>
              </p>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">
                  خط العرض (Latitude) <span className="text-destructive" aria-hidden="true">*</span>
                </Label>
                <Input
                  type="number"
                  id="latitude"
                  step="any"
                  {...register('latitude', { valueAsNumber: true })}
                  placeholder="مثال: 13.9750"
                  aria-required="true"
                  aria-invalid={!!errors.latitude}
                  aria-describedby={errors.latitude ? 'lat-error' : undefined}
                />
                {errors.latitude && (
                  <p id="lat-error" className="text-destructive text-sm" role="alert">
                    {errors.latitude.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">
                  خط الطول (Longitude) <span className="text-destructive" aria-hidden="true">*</span>
                </Label>
                <Input
                  type="number"
                  id="longitude"
                  step="any"
                  {...register('longitude', { valueAsNumber: true })}
                  placeholder="مثال: 44.1750"
                  aria-required="true"
                  aria-invalid={!!errors.longitude}
                  aria-describedby={errors.longitude ? 'lng-error' : undefined}
                />
                {errors.longitude && (
                  <p id="lng-error" className="text-destructive text-sm" role="alert">
                    {errors.longitude.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Status */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Checkbox
              id="is_active"
              checked={isActive}
              onCheckedChange={(checked) => setValue('is_active', checked as boolean)}
            />
            <Label htmlFor="is_active" className="font-medium cursor-pointer">
              نقطة البيع نشطة ومعروضة للعملاء
            </Label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-brand hover:bg-brand-dark transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 ms-2 animate-spin" aria-hidden="true" />
                  جاري الحفظ...
                </>
              ) : mode === 'create' ? (
                'إضافة نقطة البيع'
              ) : (
                'حفظ التعديلات'
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
