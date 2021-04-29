import { useState, useEffect } from "react";
import { Recipe } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { Preferments, Preferment, PrefermentKind } from "dataModel/Preferment";

export const useRecipes = (): [Recipe[], React.Dispatch<React.SetStateAction<Recipe[]>>] => {
  const localStorageKey = "recipes";
  const defaultRecipes: Recipe[] = [];

  const [value, setValue] = useState<Recipe[]>(() => {
    const storedValue = window.localStorage.getItem(localStorageKey);

    return storedValue !== null ? fromJSONObject(JSON.parse(storedValue)) : defaultRecipes;
  });

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(toJSONObject(value)));
  }, [localStorageKey, value]);

  return [value, setValue];
};

const toJSONObject = (recipes: Recipe[]) => {
  return recipes.map(toJSONObjectRecipe);
};

const fromJSONObject = (recipes: ReturnType<typeof toJSONObject>): Recipe[] => {
  return recipes.map(fromJSONObjectRecipe);
};

const toJSONObjectRecipe = (recipe: Recipe) => {
  return {
    name: recipe.name,
    flours: toJSONObjectIngredients(recipe.flours),
    ingredients: toJSONObjectIngredients(recipe.ingredients),
    preferments: toJSONObjectPreferments(recipe.preferments),
  };
};

const fromJSONObjectRecipe = (recipe: ReturnType<typeof toJSONObjectRecipe>): Recipe => {
  return {
    name: recipe.name,
    flours: fromJSONObjectIngredients(recipe.flours),
    ingredients: fromJSONObjectIngredients(recipe.ingredients),
    preferments: fromJSONObjectPreferments(recipe.preferments),
  };
};

const toJSONObjectIngredients = (ingredients: Ingredients) => {
  return [...ingredients];
};
const fromJSONObjectIngredients = (ingredients: ReturnType<typeof toJSONObjectIngredients>): Ingredients => {
  return new Map(ingredients);
};

const toJSONObjectPreferments = (preferments: Preferments) => {
  return [...preferments].map<[string, ReturnType<typeof toJSONObjectPreferment>]>(([name, preferment]) => [
    name,
    toJSONObjectPreferment(preferment),
  ]);
};
const fromJSONObjectPreferments = (preferments: ReturnType<typeof toJSONObjectPreferments>): Preferments => {
  return new Map(preferments.map(([name, preferment]) => [name, fromJSONObjectPreferment(preferment)]));
};

const toJSONObjectPreferment = (preferment: Preferment) => {
  if (preferment.kind === PrefermentKind.PREDOUGH) {
    return {
      kind: preferment.kind,
      prefermentedFlour: preferment.prefermentedFlour,
      flours: toJSONObjectIngredients(preferment.flours),
      ingredients: toJSONObjectIngredients(preferment.ingredients),
    };
  } else {
    return {
      kind: preferment.kind,
      prefermentedFlour: preferment.prefermentedFlour,
      seed: preferment.seed,
      flours: toJSONObjectIngredients(preferment.flours),
      ingredients: toJSONObjectIngredients(preferment.ingredients),
    };
  }
};

const fromJSONObjectPreferment = (preferment: ReturnType<typeof toJSONObjectPreferment>): Preferment => {
  if (preferment.kind === PrefermentKind.PREDOUGH) {
    return {
      kind: preferment.kind,
      prefermentedFlour: preferment.prefermentedFlour,
      flours: fromJSONObjectIngredients(preferment.flours),
      ingredients: fromJSONObjectIngredients(preferment.ingredients),
    };
  } else {
    return {
      kind: preferment.kind,
      prefermentedFlour: preferment.prefermentedFlour,
      seed: preferment.seed,
      flours: fromJSONObjectIngredients(preferment.flours),
      ingredients: fromJSONObjectIngredients(preferment.ingredients),
    };
  }
};
