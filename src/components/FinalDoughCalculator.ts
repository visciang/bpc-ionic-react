import { SOURDOUGH_SEED_LABEL } from "components/FinalDoughTable";
import { sum } from "components/utils";
import { Ingredients, IngredientValue } from "dataModel/Ingredient";
import {
  Preferment,
  Preferments,
  PrefermentKind,
  PrefermentName,
  PreDoughPreferment,
  SourdoughPreferment,
} from "dataModel/Preferment";
import { Recipe, ScaleBy } from "dataModel/Recipe";

type CalcPreferment = {
  ingredients: Ingredients;
  seedSubtractIngredients: Ingredients;
};

type CalcPreferments = Map<PrefermentName, CalcPreferment>;

type CalcDough = {
  overall: Ingredients;
  preferments: CalcPreferments;
  final: Ingredients;
};

export function calculate(recipe: Recipe, scaleBy: ScaleBy, totalAmount: number): CalcDough {
  const scaleFactor = calculateScaleFactor(recipe.flours, recipe.ingredients, scaleBy);
  const scaleDoughFactor = totalAmount / scaleFactor;

  return calculateWeigths(recipe, scaleDoughFactor);
}

function calculateWeigths(recipe: Recipe, scaleDoughFactor: number): CalcDough {
  const overall = new Map([
    ...calculateIngredients(recipe.flours, scaleDoughFactor),
    ...calculateIngredients(recipe.ingredients, scaleDoughFactor),
  ]);
  const preferments_ = calculatePreferments(recipe.preferments, scaleDoughFactor);
  const final = calculateFinal(overall, preferments_);

  return {
    overall: overall,
    preferments: preferments_,
    final: final,
  };
}

function calculateScaleFactor(flours: Ingredients, ingredients: Ingredients, scaleBy: ScaleBy): number {
  return scaleBy === ScaleBy.FLOUR ? 100 : sum(flours.values(), ingredients.values());
}

function calculateIngredients(ingredients: Ingredients, scaleDoughFactor: number): Ingredients {
  return new Map([...ingredients].map(([name, value]) => [name, value! * scaleDoughFactor]));
}

function calculatePreferments(preferments: Preferments, scaleDoughFactor: number): CalcPreferments {
  return new Map(
    [...preferments].map(([prefermentName, preferment]) => [
      prefermentName,
      calculatePreferment(preferment, scaleDoughFactor),
    ]),
  );
}

function calculatePreferment(preferment: Preferment, scaleDoughFactor: number): CalcPreferment {
  switch (preferment.kind) {
    case PrefermentKind.PREDOUGH:
      return calculatePredough(preferment, scaleDoughFactor);

    case PrefermentKind.SOURDOUGH:
      return calculateSourdough(preferment, scaleDoughFactor);
  }
}

function calculatePredough(preferment: PreDoughPreferment, scaleDoughFactor: number): CalcPreferment {
  const prefermentScaleDoughFactor = scaleDoughFactor * (preferment.prefermentedFlour! / 100);
  const ingredients = new Map([
    ...calculateIngredients(preferment.ingredients, prefermentScaleDoughFactor),
    ...calculateIngredients(preferment.flours, prefermentScaleDoughFactor),
  ]);

  return {
    ingredients: ingredients,
    seedSubtractIngredients: new Map(),
  };
}

function calculateSourdough(preferment: SourdoughPreferment, scaleDoughFactor: number): CalcPreferment {
  const prefermentScaleDoughFactor = scaleDoughFactor * (preferment.prefermentedFlour! / 100);
  const prefermentWeight =
    prefermentScaleDoughFactor * sum(preferment.flours.values(), preferment.ingredients.values());
  const prefermentRelativeScaleDoughFactor =
    prefermentWeight / sum(preferment.flours.values(), preferment.ingredients.values(), [preferment.seed!]);

  const ingredients = new Map([
    ...calculateIngredients(preferment.flours, prefermentRelativeScaleDoughFactor),
    ...calculateIngredients(preferment.ingredients, prefermentRelativeScaleDoughFactor),
    ...calculateIngredients(new Map([[SOURDOUGH_SEED_LABEL, preferment.seed!]]), prefermentRelativeScaleDoughFactor),
  ]);

  const seedSubtractFactor =
    ingredients.get(SOURDOUGH_SEED_LABEL)! / sum(preferment.flours.values(), preferment.ingredients.values());

  const seedSubtractIngredients = new Map([
    ...calculateIngredients(preferment.flours, seedSubtractFactor),
    ...calculateIngredients(preferment.ingredients, seedSubtractFactor),
  ]);

  return {
    ingredients: ingredients,
    seedSubtractIngredients: seedSubtractIngredients,
  };
}

function calculateFinal(overall: Ingredients, preferments: CalcPreferments): Ingredients {
  const final = new Map([...overall]);

  for (const ingredient of overall.keys()) {
    let weight: IngredientValue =
      final.get(ingredient)! -
      sum(
        [...preferments.values()].map((preferment) => {
          return (
            (preferment.ingredients.get(ingredient) || 0) + (preferment.seedSubtractIngredients?.get(ingredient) || 0)
          );
        }),
      );

    if (Math.abs(weight) <= 0.01) {
      weight = 0;
    }

    if (weight < 0) {
      weight = undefined;
    }

    final.set(ingredient, weight);
  }

  return final;
}
