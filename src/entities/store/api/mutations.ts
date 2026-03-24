'use server';

import { createAdminClient } from '@/shared/api/supabase/server';
import type { StoreCreateInput, StoreUpdateInput, Store } from '@/entities/store/model';
import type { StoreRow } from '@/shared/types/database';
import { revalidatePath } from 'next/cache';

export async function createStore(input: StoreCreateInput): Promise<Store> {
  const supabase = await createAdminClient();
  
  const { data, error } = await supabase
    .from('stores')
    .insert({
      name: input.name,
      address: input.address,
      latitude: input.latitude,
      longitude: input.longitude,
      phone: input.phone || null,
      google_map_url: input.google_map_url || null,
      is_active: input.is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating store:', error);
    throw new Error('فشل في إنشاء نقطة البيع');
  }

  revalidatePath('/');
  revalidatePath('/stores');
  
  return data as StoreRow;
}

export async function updateStore(input: StoreUpdateInput): Promise<Store> {
  const supabase = await createAdminClient();
  
  const updateData: Partial<StoreCreateInput> = {};
  
  if (input.name !== undefined) updateData.name = input.name;
  if (input.address !== undefined) updateData.address = input.address;
  if (input.latitude !== undefined) updateData.latitude = input.latitude;
  if (input.longitude !== undefined) updateData.longitude = input.longitude;
  if (input.phone !== undefined) updateData.phone = input.phone;
  if (input.google_map_url !== undefined) updateData.google_map_url = input.google_map_url;
  if (input.is_active !== undefined) updateData.is_active = input.is_active;

  const { data, error } = await supabase
    .from('stores')
    .update(updateData)
    .eq('id', input.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating store:', error);
    throw new Error('فشل في تحديث نقطة البيع');
  }

  revalidatePath('/');
  revalidatePath('/stores');
  revalidatePath(`/stores/${input.id}/edit`);
  
  return data as StoreRow;
}

export async function deleteStore(id: string): Promise<void> {
  const supabase = await createAdminClient();
  
  const { error } = await supabase
    .from('stores')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting store:', error);
    throw new Error('فشل في حذف نقطة البيع');
  }

  revalidatePath('/');
  revalidatePath('/stores');
}

export async function toggleStoreStatus(id: string, isActive: boolean): Promise<Store> {
  const supabase = await createAdminClient();
  
  const { data, error } = await supabase
    .from('stores')
    .update({ is_active: isActive })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error toggling store status:', error);
    throw new Error('فشل في تغيير حالة نقطة البيع');
  }

  revalidatePath('/');
  revalidatePath('/stores');
  
  return data as StoreRow;
}
