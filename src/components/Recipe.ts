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

export type YeastPreferment = BasePreferment;

export type SourdoughPreferment = BasePreferment & {
  seed: IngredientValue;
};

export enum PrefermentKind {
  YEAST = "YEAST",
  SOURDOUGH = "SOURDOUGH",
}

export type PrefermentName = string;
export type Preferment = YeastPreferment | SourdoughPreferment;
export type Preferments = Map<PrefermentName, Preferment>;

export type Recipe = {
  name: string;
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
};
