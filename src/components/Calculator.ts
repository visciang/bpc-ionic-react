import { ScaleBy } from "dataModel/Recipe";
import { Ingredients, IngredientValue } from "dataModel/Ingredient";
import { Preferment, Preferments, PrefermentKind, PrefermentName } from "dataModel/Preferment";
import { sum } from "components/utils";

type CalcPreferment = {
  kind: PrefermentKind;
  ingredients: Ingredients;
  seed?: IngredientValue;
};

type CalcPreferments = Map<PrefermentName, CalcPreferment>;

type CalcDough = {
  overall: Ingredients;
  preferments: CalcPreferments;
  final: Ingredients;
};

export const calculateDough = (
  flours: Ingredients,
  ingredients: Ingredients,
  preferments: Preferments,
  scaleBy: ScaleBy,
  totalAmount: number
): CalcDough => {
  const scaleFactor = calculateScaleFactor(flours, ingredients, scaleBy);
  const scaleDoughFactor = totalAmount / scaleFactor;

  return calculateWeigths(flours, ingredients, preferments, scaleDoughFactor);
};

const calculateWeigths = (
  flours: Ingredients,
  ingredients: Ingredients,
  preferments: Preferments,
  scaleDoughFactor: number
): CalcDough => {
  const overall = new Map([
    ...calculateIngredients(flours, scaleDoughFactor),
    ...calculateIngredients(ingredients, scaleDoughFactor),
  ]);
  const preferments_ = calculatePreferments(preferments, scaleDoughFactor);
  const final = calculateFinal(overall, preferments_);

  return {
    overall: overall,
    preferments: preferments_,
    final: final,
  };
};

const calculateScaleFactor = (flours: Ingredients, ingredients: Ingredients, scaleBy: ScaleBy): number => {
  return scaleBy === ScaleBy.FLOUR ? 100 : sum(flours.values(), ingredients.values());
};

const calculateIngredients = (ingredients: Ingredients, scaleDoughFactor: number): Ingredients => {
  return new Map([...ingredients].map(([name, value]) => [name, value! * scaleDoughFactor]));
};

const calculatePreferments = (preferments: Preferments, scaleDoughFactor: number): CalcPreferments => {
  return new Map(
    [...preferments].map(([prefermentName, preferment]) => [
      prefermentName,
      calculatePreferment(preferment, scaleDoughFactor),
    ])
  );
};

const calculatePreferment = (preferment: Preferment, scaleDoughFactor: number): CalcPreferment => {
  const prefermentScaleDoughFactor = scaleDoughFactor * (preferment.prefermentedFlour! / 100);
  let ingredients = new Map([
    ...calculateIngredients(preferment.ingredients, prefermentScaleDoughFactor),
    ...calculateIngredients(preferment.flours, prefermentScaleDoughFactor),
  ]);
  let seed = undefined;

  if (preferment.kind === PrefermentKind.SOURDOUGH) {
    seed = preferment.seed! * prefermentScaleDoughFactor;
    ingredients.set("(sourdough seed)", seed);
  }

  return {
    kind: preferment.kind,
    ingredients: ingredients,
    seed: seed,
  };
};

const calculateFinal = (overall: Ingredients, preferments: CalcPreferments): Ingredients => {
  const final = new Map([...overall]);

  for (let ingredient of overall.keys()) {
    let weight: IngredientValue =
      final.get(ingredient)! -
      sum([...preferments.values()].map((preferment) => preferment.ingredients.get(ingredient) || 0));

    if (Math.abs(weight) <= 0.01) {
      weight = 0;
    }

    if (weight < 0) {
      weight = undefined;
    }

    final.set(ingredient, weight);
  }

  return final;
};
