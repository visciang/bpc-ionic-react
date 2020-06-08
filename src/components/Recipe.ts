export interface Ingredient {
  name: string;
  value: number;
}

export interface Recipe {
  name: string;
  flours: Ingredient[];
  ingredients: Ingredient[];
}
