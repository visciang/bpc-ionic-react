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

type PreDoughPreferment = {
  kind: PrefermentKind.PREDOUGH;
} & BasePreferment;

type SourdoughPreferment = {
  kind: PrefermentKind.SOURDOUGH;
  seed: IngredientValue;
} & BasePreferment;

export type PrefermentName = string;

export type Preferment = PreDoughPreferment | SourdoughPreferment;
export type Preferments = Map<PrefermentName, Preferment>;
