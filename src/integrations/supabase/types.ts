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
      emma_ingredients: {
        Row: {
          "Beauty institute": number | null
          Benefit: string | null
          Category: string | null
          Description: string | null
          Distributor: number | null
          "Final consumer": string | null
          "FRAGRANCE NOTES": string | null
          "Full Description": string | null
          Importer: number | null
          "INCI LIST": string | null
          "Ingredient Breakdown": string | null
          "Order quantity": string | null
          Reference: string
          Texture: string | null
          Type: string | null
        }
        Insert: {
          "Beauty institute"?: number | null
          Benefit?: string | null
          Category?: string | null
          Description?: string | null
          Distributor?: number | null
          "Final consumer"?: string | null
          "FRAGRANCE NOTES"?: string | null
          "Full Description"?: string | null
          Importer?: number | null
          "INCI LIST"?: string | null
          "Ingredient Breakdown"?: string | null
          "Order quantity"?: string | null
          Reference: string
          Texture?: string | null
          Type?: string | null
        }
        Update: {
          "Beauty institute"?: number | null
          Benefit?: string | null
          Category?: string | null
          Description?: string | null
          Distributor?: number | null
          "Final consumer"?: string | null
          "FRAGRANCE NOTES"?: string | null
          "Full Description"?: string | null
          Importer?: number | null
          "INCI LIST"?: string | null
          "Ingredient Breakdown"?: string | null
          "Order quantity"?: string | null
          Reference?: string
          Texture?: string | null
          Type?: string | null
        }
        Relationships: []
      }
      forecasts: {
        Row: {
          created_at: string
          id: string
          name: string
          products: Json
          total_cost: number
          total_profit: number
          total_revenue: number
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          products: Json
          total_cost: number
          total_profit: number
          total_revenue: number
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          products?: Json
          total_cost?: number
          total_profit?: number
          total_revenue?: number
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      product_ingredients: {
        Row: {
          code: string
          created_at: string
          description: string
          id: string
          ingredients: string
          properties: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description: string
          id?: string
          ingredients: string
          properties: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string
          id?: string
          ingredients?: string
          properties?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          beauty_institute_moq: number
          beauty_institute_price: number
          category: string
          created_at: string
          description: string
          distributor_moq: number
          distributor_price: number
          final_consumer_price: number | null
          id: string
          importer_moq: number
          importer_price: number
          reference: string
          updated_at: string
        }
        Insert: {
          beauty_institute_moq: number
          beauty_institute_price: number
          category: string
          created_at?: string
          description: string
          distributor_moq: number
          distributor_price: number
          final_consumer_price?: number | null
          id?: string
          importer_moq: number
          importer_price: number
          reference: string
          updated_at?: string
        }
        Update: {
          beauty_institute_moq?: number
          beauty_institute_price?: number
          category?: string
          created_at?: string
          description?: string
          distributor_moq?: number
          distributor_price?: number
          final_consumer_price?: number | null
          id?: string
          importer_moq?: number
          importer_price?: number
          reference?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      waitlist_emails: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      user_role: "admin" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "customer"],
    },
  },
} as const
