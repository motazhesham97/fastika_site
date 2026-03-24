'use client';

import { useState, useEffect, useMemo } from 'react';
import { getSupabaseClient } from '@/shared/api/supabase/client';
import { sortStoresByDistance } from './distance';
import type { Store, StoreWithDistance } from '@/entities/store/model';
import type { StoreRow } from '@/shared/types/database';

interface UseStoresOptions {
  userLatitude?: number | null;
  userLongitude?: number | null;
  sortByDistance?: boolean;
}

interface UseStoresReturn {
  stores: StoreWithDistance[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStores(options: UseStoresOptions = {}): UseStoresReturn {
  const { userLatitude, userLongitude, sortByDistance = true } = options;

  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);

      const supabase = getSupabaseClient();
      const { data, error: fetchError } = await supabase
        .from('stores')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setStores((data as StoreRow[]) || []);
    } catch (err) {
      console.error('Error fetching stores:', err);
      setError('فشل في تحميل نقاط البيع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Sort stores by distance if user location is available
  const sortedStores = useMemo<StoreWithDistance[]>(() => {
    if (
      sortByDistance &&
      userLatitude !== null &&
      userLatitude !== undefined &&
      userLongitude !== null &&
      userLongitude !== undefined
    ) {
      return sortStoresByDistance(stores, {
        latitude: userLatitude,
        longitude: userLongitude,
      });
    }

    // Return stores without distance
    return stores.map((store) => ({ ...store, distance: undefined }));
  }, [stores, userLatitude, userLongitude, sortByDistance]);

  return {
    stores: sortedStores,
    loading,
    error,
    refetch: fetchStores,
  };
}
