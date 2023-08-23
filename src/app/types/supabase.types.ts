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
          featured: boolean | null
          imgsrc: string | null
          tags: string[] | null
          title: string | null
          url: string | null
          uuid: string
        }
        Insert: {
          featured?: boolean | null
          imgsrc?: string | null
          tags?: string[] | null
          title?: string | null
          url?: string | null
          uuid?: string
        }
        Update: {
          featured?: boolean | null
          imgsrc?: string | null
          tags?: string[] | null
          title?: string | null
          url?: string | null
          uuid?: string
        }
        Relationships: []
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
