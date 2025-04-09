import { Ingredients, IngredientValue } from "dataModel/Ingredient";

export enum PrefermentKind {
  PREDOUGH = "PREDOUGH",
  SOURDOUGH = "SOURDOUGH",
}

type BasePreferment = {
  prefermentedFlour: IngredientValue;
  flours: Ingredients;
  ingredients: Ingredients;
};

export type PreDoughPreferment = {
  kind: PrefermentKind.PREDOUGH;
} & BasePreferment;

export type SourdoughPreferment = {
  kind: PrefermentKind.SOURDOUGH;
  seed: IngredientValue;
} & BasePreferment;

export type PrefermentName = string;

export type Preferment = PreDoughPreferment | SourdoughPreferment;
export type Preferments = Map<PrefermentName, Preferment>;
