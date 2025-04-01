
export type EmmaIngredient = {
  Reference: string;
  Description: string;
  Category: string;
  "INCI LIST"?: string;
  "FRAGRANCE NOTES"?: string;
  "Ingredient Breakdown"?: string;
  Benefit?: string;
  Texture?: string;
  "Beauty institute"?: number;
  "Order quantity"?: string;
  "Full Description"?: string;
  Importer?: number;
  Distributor?: number;
  "Final consumer"?: string;
};

export type ConnectionStatus = 'unknown' | 'success' | 'failed';

export interface EmmaIngredientsQueryDetails {
  url: string;
  key: string;
  tableName: string;
}
