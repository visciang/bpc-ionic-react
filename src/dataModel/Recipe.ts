import { Ingredients } from "./Ingredient";
import { Preferments } from "./Preferment";

export enum ScaleBy {
  DOUGH = "DOUGH",
  FLOUR = "FLOUR",
}

export type Recipe = {
  name: string | undefined;
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
};

export function newRecipe(name: string | undefined): Recipe {
  return {
    name: name,
    flours: new Map(),
    ingredients: new Map(),
    preferments: new Map()
  };
}
