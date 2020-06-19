import { OrderedMap } from "immutable";

export type IngredientName = string;
export type IngredientValue = number | undefined;
export type Ingredients = OrderedMap<IngredientName, IngredientValue>;
