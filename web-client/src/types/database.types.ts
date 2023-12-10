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
          folder_id: string | null
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
          folder_id?: string | null
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
          folder_id?: string | null
          imgsrc?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          url?: string | null
          user_id?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_folder_id_fkey"
            columns: ["folder_id"]
            referencedRelation: "folders"
            referencedColumns: ["id"]
          }
        ]
      }
      folders: {
        Row: {
          created_at: string
          folder_name: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          folder_name: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          folder_name?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_src: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_src?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_src?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
          updated_at?: string | null
          username?: string | null
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
