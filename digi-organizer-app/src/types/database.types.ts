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
      bookmarks: {
        Row: {
          created_at: string
          featured: boolean | null
          imgsrc: string | null
          tags: string[] | null
          title: string | null
          updated_at: string
          url: string | null
          user_id: string | null
          uuid: string
        }
        Insert: {
          created_at?: string
          featured?: boolean | null
          imgsrc?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
          uuid?: string
        }
        Update: {
          created_at?: string
          featured?: boolean | null
          imgsrc?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
          uuid?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_src: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: string
        }
        Insert: {
          avatar_src?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string
        }
        Update: {
          avatar_src?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
