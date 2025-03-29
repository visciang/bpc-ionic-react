import { Preferment, PrefermentKind } from "./Preferment";
import { Recipe } from "./Recipe";

type StoredRecipe = {
  name: string;
  flours: [string, number][];
  ingredients: [string, number][];
  preferments: [string, StoredPreferment][];
};

type StoredPreferment = {
  kind: PrefermentKind;
  prefermentedFlour: number;
  flours: [string, number][];
  ingredients: [string, number][];
  seed?: number; // Optional because it's only in SOURDOUGH
};

export function getStoredRecipes(): Map<string, Recipe> {
  const recipes = new Map<string, Recipe>();

  for (let idx = 0; idx < window.localStorage.length; idx++) {
    const key = window.localStorage.key(idx)!;
    const recipe = decodeLocalStorage(JSON.parse(window.localStorage.getItem(key)!));
    recipes.set(recipe.name!, recipe);
  }

  return recipes;
}

export function fetchStoredRecipe(name: string): Recipe {
  const recipe = window.localStorage.getItem(key(name))!;
  return decodeLocalStorage(JSON.parse(recipe));
}

export function getStoredRecipe(name: string, defaultRecipe: Recipe): Recipe {
  const recipe = window.localStorage.getItem(key(name));
  return recipe ? decodeLocalStorage(JSON.parse(recipe)) : defaultRecipe;
}

export function setStoredRecipe(recipe: Recipe) {
  window.localStorage.setItem(key(recipe.name!), JSON.stringify(encodeLocalStorage(recipe)));
}

export function removeStoreRecipe(name: string) {
  window.localStorage.removeItem(key(name));
}

export function exportRecipes(): string {
  const recipes = getStoredRecipes();
  return JSON.stringify([...recipes.values()].map(encodeLocalStorage), null, 2);
}

export function importRecipes(recipesJson: string): number {
  const recipes = JSON.parse(recipesJson).map(decodeLocalStorage);
  recipes.forEach(setStoredRecipe);
  return recipes.length;
}

function key(name: string) {
  return `recipe::${name}`;
}

function encodeLocalStorage(recipe: Recipe) {
  return {
    name: recipe.name,
    flours: [...recipe.flours],
    ingredients: [...recipe.ingredients],
    preferments: [...recipe.preferments].map(([name, preferment]) => [name, encodePreferment(preferment)]),
  };
}

function encodePreferment(preferment: Preferment) {
  if (preferment.kind === PrefermentKind.PREDOUGH) {
    return {
      kind: preferment.kind,
      prefermentedFlour: preferment.prefermentedFlour,
      flours: [...preferment.flours],
      ingredients: [...preferment.ingredients],
    };
  } else {
    return {
      kind: preferment.kind,
      prefermentedFlour: preferment.prefermentedFlour,
      seed: preferment.seed,
      flours: [...preferment.flours],
      ingredients: [...preferment.ingredients],
    };
  }
}

function decodeLocalStorage(recipe: StoredRecipe): Recipe {
  return {
    name: recipe.name,
    flours: new Map(recipe.flours),
    ingredients: new Map(recipe.ingredients),
    preferments: new Map(
      recipe.preferments.map(([name, preferment]: [string, StoredPreferment]) => [name, decodePreferment(preferment)]),
    ),
  };
}

function decodePreferment(preferment: StoredPreferment): Preferment {
  if (preferment.kind === PrefermentKind.PREDOUGH) {
    return {
      kind: PrefermentKind.PREDOUGH,
      prefermentedFlour: preferment.prefermentedFlour,
      flours: new Map(preferment.flours),
      ingredients: new Map(preferment.ingredients),
    };
  } else {
    return {
      kind: PrefermentKind.SOURDOUGH,
      prefermentedFlour: preferment.prefermentedFlour,
      seed: preferment.seed,
      flours: new Map(preferment.flours),
      ingredients: new Map(preferment.ingredients),
    };
  }
}
