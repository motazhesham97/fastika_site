import { createClient, createAdminClient } from '@/shared/api/supabase/server';
import type { Store, StoreWithDistance } from '@/entities/store/model';
import type { StoreRow } from '@/shared/types/database';

export async function getActiveStores(): Promise<Store[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching stores:', error);
    throw new Error('فشل في جلب نقاط البيع');
  }

  return (data as StoreRow[]) || [];
}

export async function getAllStores(): Promise<Store[]> {
  const supabase = await createAdminClient();
  
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all stores:', error);
    throw new Error('فشل في جلب نقاط البيع');
  }

  return (data as StoreRow[]) || [];
}

export async function getStoreById(id: string): Promise<Store | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching store:', error);
    return null;
  }

  return data as StoreRow;
}

export async function getStoresCount(): Promise<{ total: number; active: number }> {
  const supabase = await createAdminClient();
  
  const { count: total } = await supabase
    .from('stores')
    .select('*', { count: 'exact', head: true });

  const { count: active } = await supabase
    .from('stores')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  return {
    total: total || 0,
    active: active || 0
  };
}

// Client-side function to sort stores by distance
export function sortStoresByDistance(
  stores: Store[],
  userLat: number,
  userLng: number
): StoreWithDistance[] {
  return stores
    .map((store) => ({
      ...store,
      distance: calculateDistance(userLat, userLng, store.latitude, store.longitude),
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

// Haversine formula to calculate distance between two points
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
