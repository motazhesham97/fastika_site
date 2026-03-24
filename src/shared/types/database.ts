export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stores: {
        Row: {
          id: string
          name: string
          address: string
          latitude: number
          longitude: number
          phone: string | null
          google_map_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          latitude: number
          longitude: number
          phone?: string | null
          google_map_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          latitude?: number
          longitude?: number
          phone?: string | null
          google_map_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      admins: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string | null
          created_at: string
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          name?: string | null
          created_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          name?: string | null
          created_at?: string
          last_login?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// Helper types for direct use
export type StoreRow = Database['public']['Tables']['stores']['Row']
export type StoreInsert = Database['public']['Tables']['stores']['Insert']
export type StoreUpdate = Database['public']['Tables']['stores']['Update']
export type AdminRow = Database['public']['Tables']['admins']['Row']
export type AdminInsert = Database['public']['Tables']['admins']['Insert']
export type AdminUpdate = Database['public']['Tables']['admins']['Update']
