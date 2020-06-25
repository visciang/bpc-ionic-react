import produce from "immer";
import { Recipe, ScaleBy } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { sum } from "components/utils";

export const calculateFinalDough = (recipe: Recipe, scaleBy: ScaleBy, totalAmount: number): Recipe => {
  const scaleFactor = calculateScaleFactor(recipe.flours, recipe.ingredients, scaleBy);
  const scaleDoughFactor = totalAmount / scaleFactor;

  return calculateWeigths(recipe, scaleDoughFactor);
};

const calculateWeigths = (recipe: Recipe, scaleDoughFactor: number) => {
  return produce(recipe, (draft) => {
    for (let [name, value] of draft.flours.entries()) {
      draft.flours.set(name, value! * scaleDoughFactor);
    }

    for (let [name, value] of draft.ingredients.entries()) {
      draft.ingredients.set(name, value! * scaleDoughFactor);
    }
  });
};

const calculateScaleFactor = (flours: Ingredients, ingredients: Ingredients, scaleBy: ScaleBy): number => {
  if (scaleBy === ScaleBy.FLOUR) {
    return 100;
  } else {
    return sum(flours.values(), ingredients.values())!;
  }
};
