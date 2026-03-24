'use client';

import { useUserLocation, useStores } from '@/features/store-locator/lib';
import StoreCard from './StoreCard';
import LocationPermission from './LocationPermission';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Skeleton } from '@/shared/ui/skeleton';
import { Separator } from '@/shared/ui/separator';
import { BrandedSpinner } from '@/shared/ui/branded-spinner';
import { CheckCircle, MapPin, ArrowDownNarrowWide, Store, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function StoresList() {
  const {
    latitude,
    longitude,
    loading: locationLoading,
    error: locationError,
    permissionState,
    requestLocation,
    hasLocation,
  } = useUserLocation();

  const {
    stores,
    loading: storesLoading,
    error: storesError,
  } = useStores({
    userLatitude: latitude,
    userLongitude: longitude,
    sortByDistance: hasLocation,
  });

  const showDistance = hasLocation;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark mb-3">
            نقاط البيع
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
            اعثر على أقرب نقطة بيع لمنتجات فستكا
          </p>
          <Separator className="w-20 mx-auto mt-5 bg-brand" />
        </motion.div>

        {/* Location Permission Request */}
        {permissionState !== 'granted' && !locationLoading && (
          <LocationPermission
            permissionState={permissionState}
            error={locationError}
            onRequestLocation={requestLocation}
            loading={locationLoading}
          />
        )}

        {/* Location Success Message */}
        {hasLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-8"
            role="status"
            aria-live="polite"
          >
            <Card className="border-green-200 bg-green-50/60">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full brand-gradient flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">تم تحديد موقعك بنجاح</p>
                    <p className="text-sm text-muted-foreground">نقاط البيع مرتبة من الأقرب إليك</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Loading State */}
        {storesLoading && (
          <div className="space-y-8" role="status" aria-live="polite" aria-label="جاري تحميل نقاط البيع">
            {/* Branded Spinner */}
            <div className="flex justify-center py-8">
              <BrandedSpinner size="lg" label="جاري تحميل نقاط البيع..." />
            </div>

            {/* Skeleton Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Skeleton className="w-11 h-11 rounded-xl" />
                      <Skeleton className="h-5 flex-1" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-5" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {storesError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="alert"
            aria-live="assertive"
          >
            <Card className="border-red-200 bg-red-50/60">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-red-800 mb-2">حدث خطأ</h3>
                <p className="text-red-600">{storesError}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stores Grid */}
        {!storesLoading && !storesError && stores.length > 0 && (
          <>
            {/* Store Count & Sort Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-between gap-3 mb-6"
            >
              <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-brand-dark border-brand/40">
                <Store className="w-4 h-4" aria-hidden="true" />
                <span>{stores.length} نقطة بيع</span>
              </Badge>

              {showDistance && (
                <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-muted-foreground">
                  <ArrowDownNarrowWide className="w-4 h-4" aria-hidden="true" />
                  <span>مرتبة حسب الأقرب</span>
                </Badge>
              )}
            </motion.div>

            {/* Cards Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
              role="list"
              aria-label="قائمة نقاط البيع"
            >
              {stores.map((store, index) => (
                <div key={store.id} role="listitem">
                  <StoreCard
                    store={store}
                    showDistance={showDistance}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!storesLoading && !storesError && stores.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-10 h-10 text-muted-foreground" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">لا توجد نقاط بيع</h3>
                <p className="text-muted-foreground">لا توجد نقاط بيع متاحة حالياً</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
