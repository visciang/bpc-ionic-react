export enum ScaleBy {
  DOUGH = "DOUGH",
  FLOUR = "FLOUR",
}

export type IngredientName = string;
export type IngredientValue = number | undefined;
export type Ingredients = Map<IngredientName, IngredientValue>;

type BasePreferment = {
  kind: PrefermentKind;
  prefermentedFlour: IngredientValue;
  flours: Ingredients;
  ingredients: Ingredients;
};

export type PreDoughPreferment = { kind: PrefermentKind.PREDOUGH } & BasePreferment;

export type SourdoughPreferment = {
  kind: PrefermentKind.SOURDOUGH;
  seed: IngredientValue;
} & BasePreferment;

export enum PrefermentKind {
  PREDOUGH = "PRE-DOUGH",
  SOURDOUGH = "SOURDOUGH",
}

export type PrefermentName = string;
export type Preferment = PreDoughPreferment | SourdoughPreferment;
export type Preferments = Map<PrefermentName, Preferment>;

export type Recipe = {
  name: string;
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
};
