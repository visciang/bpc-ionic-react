import { OrderedMap, Record, RecordOf } from "immutable";
import { Ingredients, IngredientValue } from "./Ingredient";

export enum PrefermentKind {
  PREDOUGH = "PRE-DOUGH",
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

type PrefermentProps = PreDoughPreferment | SourdoughPreferment;
const prefermentDefaultValues: PrefermentProps = {
  kind: PrefermentKind.PREDOUGH,
  prefermentedFlour: undefined,
  flours: OrderedMap(),
  ingredients: OrderedMap(),
};
export type Preferment = RecordOf<PrefermentProps>;
export const makePreferment: Record.Factory<PrefermentProps> = Record<PrefermentProps>(prefermentDefaultValues);

export type Preferments = OrderedMap<PrefermentName, Preferment>;
