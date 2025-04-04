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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
