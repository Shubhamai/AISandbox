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
      apikeys: {
        Row: {
          created: string | null
          hash: string
          id: string
          key: string
          name: string
          user_id: string
        }
        Insert: {
          created?: string | null
          hash: string
          id?: string
          key: string
          name: string
          user_id: string
        }
        Update: {
          created?: string | null
          hash?: string
          id?: string
          key?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "apikeys_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      feedback: {
        Row: {
          created_at: string
          email: string
          feedback: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          feedback: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          feedback?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          image: string | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: string
          image?: string | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          image?: string | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          whitelisted: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          whitelisted?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          whitelisted?: boolean
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
