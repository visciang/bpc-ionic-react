import { Ingredients } from "./Ingredient";
import { Preferments } from "./Preferment";

export enum ScaleBy {
  DOUGH = "DOUGH",
  FLOUR = "FLOUR",
}

export type Recipe = {
  name: string;
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
};
