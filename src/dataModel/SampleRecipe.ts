import { Recipe } from "./Recipe";
import { PrefermentKind } from "./Preferment";

export const recipe: Recipe = {
  name: "Untitled",
  flours: new Map([
    ["Farina 00 W300", 80],
    ["Semola Rimacinata", 20],
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
        flours: new Map([
          ["Farina 00 W300", 50],
          ["Semola Rimacinata", 50],
        ]),
        ingredients: new Map([["Acqua", 45]]),
      },
    ],
  ]),
};
