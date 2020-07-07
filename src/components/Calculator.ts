import { Recipe, ScaleBy } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { sum } from "components/utils";
import { Preferment, Preferments, PrefermentKind } from "dataModel/Preferment";

export const calculateFinalDough = (recipe: Recipe, scaleBy: ScaleBy, totalAmount: number): Recipe => {
  const scaleFactor = calculateScaleFactor(recipe.flours, recipe.ingredients, scaleBy);
  const scaleDoughFactor = totalAmount / scaleFactor;

  return calculateWeigths(recipe, scaleDoughFactor);
};

const calculateWeigths = (recipe: Recipe, scaleDoughFactor: number) => {
  const calculatedRecipe: Recipe = {
    name: recipe.name,
    flours: calculateIngredients(recipe.flours, scaleDoughFactor),
    ingredients: calculateIngredients(recipe.ingredients, scaleDoughFactor),
    preferments: calculatePreferments(recipe.preferments, scaleDoughFactor),
  };

  return calculatedRecipe;
};

const calculateScaleFactor = (flours: Ingredients, ingredients: Ingredients, scaleBy: ScaleBy): number => {
  return scaleBy === ScaleBy.FLOUR ? 100 : sum(flours.values(), ingredients.values());
};

const calculateIngredients = (ingredients: Ingredients, scaleDoughFactor: number): Ingredients => {
  return new Map([...ingredients].map(([name, value]) => [name, value! * scaleDoughFactor]));
};

const calculatePreferments = (preferments: Preferments, scaleDoughFactor: number): Preferments => {
  return new Map(
    [...preferments].map(([prefermentName, preferment]) => [
      prefermentName,
      calculatePreferment(preferment, scaleDoughFactor),
    ])
  );
};

const calculatePreferment = (preferment: Preferment, scaleDoughFactor: number): Preferment => {
  const prefermentScaleDoughFactor = scaleDoughFactor * (preferment.prefermentedFlour! / 100);
  const flours = calculateIngredients(preferment.flours, prefermentScaleDoughFactor);
  const ingredients = calculateIngredients(preferment.ingredients, prefermentScaleDoughFactor);

  if (preferment.kind === PrefermentKind.SOURDOUGH)
    return {
      kind: PrefermentKind.SOURDOUGH,
      prefermentedFlour: undefined,
      flours: flours,
      ingredients: ingredients,
      seed: preferment.seed! * prefermentScaleDoughFactor,
    };
  else
    return {
      kind: PrefermentKind.PREDOUGH,
      prefermentedFlour: undefined,
      flours: flours,
      ingredients: ingredients,
    };
};
