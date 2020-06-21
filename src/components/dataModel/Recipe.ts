import { Ingredients } from "components/dataModel/Ingredient";
import { Preferments } from "components/dataModel/Preferment";

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
