export interface Store {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  google_map_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StoreWithDistance extends Store {
  distance?: number; // Distance in kilometers
}

export interface StoreFormData {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  google_map_url?: string;
  is_active?: boolean;
}

export interface StoreCreateInput {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string | null;
  google_map_url?: string | null;
  is_active?: boolean;
}

export interface StoreUpdateInput extends Partial<StoreCreateInput> {
  id: string;
}
