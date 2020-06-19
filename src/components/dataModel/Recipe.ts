import { Record, RecordOf, OrderedMap } from "immutable";
import { Ingredients } from "./Ingredient";
import { Preferments } from "./Preferment";

export enum ScaleBy {
  DOUGH = "DOUGH",
  FLOUR = "FLOUR",
}

type RecipeProps = {
  name: string;
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
};
const recipeDefaultValues: RecipeProps = {
  name: "Untitled",
  flours: OrderedMap(),
  ingredients: OrderedMap(),
  preferments: OrderedMap(),
};

export type Recipe = RecordOf<RecipeProps>;
export const makeRecipe: Record.Factory<RecipeProps> = Record(recipeDefaultValues);
