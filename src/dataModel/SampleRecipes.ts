import { Recipe } from "dataModel/Recipe";
import { PrefermentKind } from "dataModel/Preferment";

const recipe1: Recipe = {
  name: "Sample Recipe 1",
  flours: new Map([
    ["Farina 00 W300", 80],
    ["Semola", 20],
  ]),
  ingredients: new Map([
    ["Acqua", 73],
    ["Lievito", 0.8],
    ["Sale", 2.5],
  ]),
  preferments: new Map([
    [
      "Biga",
      {
        kind: PrefermentKind.PREDOUGH,
        prefermentedFlour: 80,
        flours: new Map([["Farina 00 W300", 100]]),
        ingredients: new Map([
          ["Acqua", 45],
          ["Lievito", 1],
        ]),
      },
    ],
  ]),
};

const recipe2: Recipe = {
  name: "Sample Recipe 2",
  flours: new Map([["Buratto", 100]]),
  ingredients: new Map([
    ["Acqua", 78],
    ["Lievito", 1],
    ["Sale", 2],
  ]),
  preferments: new Map([]),
};

export const recipes = [recipe1, recipe2];
