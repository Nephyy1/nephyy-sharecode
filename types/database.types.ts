export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          api_key: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          api_key?: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          user_id?: string
        }
      }
      badges: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name?: string
        }
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          snippet_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          snippet_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          snippet_id?: string
          user_id?: string
        }
      }
      forum_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          slug?: string
          title?: string
        }
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          topic_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          topic_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          topic_id?: string
          user_id?: string
        }
      }
      forum_topics: {
        Row: {
          category_id: string
          created_at: string
          id: string
          image_url: string | null
          title: string
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          title: string
          user_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          title?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
        }
      }
      snippets: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          language: string
          short_id: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          language: string
          short_id?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          language?: string
          short_id?: string | null
          title?: string
          user_id?: string | null
        }
      }
      user_badges: {
        Row: {
          assigned_at: string
          badge_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          badge_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          badge_id?: string
          user_id?: string
        }
      }
      votes: {
        Row: {
          id: number
          snippet_id: string
          user_id: string
          vote_type: number
        }
        Insert: {
          id?: number
          snippet_id: string
          user_id: string
          vote_type: number
        }
        Update: {
          id?: number
          snippet_id?: string
          user_id?: string
          vote_type?: number
        }
      }
    }
    Views: {
      snippet_votes: {
        Row: {
          score: number | null
          snippet_id: string | null
        }
      }
      topic_stats: {
        Row: {
          last_reply_at: string | null
          post_count: number | null
          topic_id: string | null
        }
      }
    }
    Functions: {
      create_new_topic: {
        Args: {
          category_id_input: string
          title_input: string
          content_input: string
          image_url_input?: string | null
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
      }
      
