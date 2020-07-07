import { Recipe, ScaleBy } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { sum } from "components/utils";

export const calculateFinalDough = (recipe: Recipe, scaleBy: ScaleBy, totalAmount: number): Recipe => {
  const scaleFactor = calculateScaleFactor(recipe.flours, recipe.ingredients, scaleBy);
  const scaleDoughFactor = totalAmount / scaleFactor;

  return calculateWeigths(recipe, scaleDoughFactor);
};

const calculateWeigths = (recipe: Recipe, scaleDoughFactor: number) => {
  const calculatedRecipe: Recipe = {
    name: recipe.name,
    flours: new Map([...recipe.flours].map(([name, value]) => [name, value! * scaleDoughFactor])),
    ingredients: new Map([...recipe.ingredients].map(([name, value]) => [name, value! * scaleDoughFactor])),
    preferments: new Map(), // TODO
  };

  return calculatedRecipe;
};

const calculateScaleFactor = (flours: Ingredients, ingredients: Ingredients, scaleBy: ScaleBy): number => {
  return scaleBy === ScaleBy.FLOUR ? 100 : sum(flours.values(), ingredients.values());
};
