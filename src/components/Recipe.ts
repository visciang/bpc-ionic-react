export type IngredientName = string;
export type IngredientValue = number | undefined;
export type Ingredients = Map<IngredientName, IngredientValue>;

export type Recipe = {
  name: string;
  flours: Ingredients;
  ingredients: Ingredients;
};
