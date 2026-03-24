'use client';

import type { StoreWithDistance } from '@/entities/store/model';
import { formatDistance } from '@/features/store-locator/lib';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { MapPin, Navigation, ExternalLink, Store, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface StoreCardProps {
  store: StoreWithDistance;
  showDistance: boolean;
  index: number;
}

export default function StoreCard({ store, showDistance, index }: StoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className="group"
    >
      <Card
        className="relative cursor-pointer border-border/60 hover:border-brand/40 bg-white/90 backdrop-blur-sm h-full transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] focus-within:ring-2 focus-within:ring-ring/50"
        aria-label={`نقطة بيع: ${store.name} - ${store.address}`}
      >
        <CardContent className="p-5 flex flex-col h-full">
          {/* Header: Store Icon + Name + Distance Badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Store Icon */}
              <div className="flex-shrink-0 w-11 h-11 rounded-xl brand-gradient flex items-center justify-center shadow-sm">
                <Store className="w-5 h-5 text-white" aria-hidden="true" />
              </div>

              {/* Store Name */}
              <h3 className="font-bold text-foreground text-base sm:text-lg leading-tight truncate">
                {store.name}
              </h3>
            </div>

            {/* Distance Badge */}
            {showDistance && store.distance !== undefined && (
              <Badge
                variant="secondary"
                className="flex-shrink-0 bg-brand text-white hover:bg-brand-dark gap-1 transition-colors"
              >
                <Navigation className="w-3 h-3" aria-hidden="true" />
                <span>{formatDistance(store.distance)}</span>
              </Badge>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 mb-3 text-muted-foreground flex-1">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent-orange" aria-hidden="true" />
            <p className="text-sm leading-relaxed">{store.address}</p>
          </div>

          {/* Phone (if available) */}
          {store.phone && (
            <a
              href={`tel:${store.phone}`}
              className="flex items-center gap-2 text-sm text-brand hover:text-brand-dark transition-colors mb-4 focus-ring rounded-md px-1 -mx-1"
              aria-label={`اتصل بـ ${store.name}: ${store.phone}`}
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-medium" dir="ltr">{store.phone}</span>
            </a>
          )}

          {/* Map Button */}
          {store.google_map_url ? (
            <Button
              asChild
              className="w-full bg-brand hover:bg-brand-dark text-white gap-2 mt-auto transition-all duration-200"
            >
              <a
                href={store.google_map_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`افتح موقع ${store.name} في خرائط جوجل`}
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>افتح في الخريطة</span>
                <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
              </a>
            </Button>
          ) : (
            <Button variant="secondary" disabled className="w-full mt-auto" aria-disabled="true">
              الموقع غير متوفر
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
