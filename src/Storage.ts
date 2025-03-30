import { Preferment, PrefermentKind } from "dataModel/Preferment";
import { Recipe } from "dataModel/Recipe";

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

export function store(recipe: Recipe, recipes: Map<string, Recipe>) {
  if (recipe.name) {
    setStoredRecipe(recipe);
  }

  // Make sure recipes Map is in sync with localStorage
  // This handles additions, updates, and deletions
  const storedKeys = new Set<string>();
  for (let idx = 0; idx < window.localStorage.length; idx++) {
    const key = window.localStorage.key(idx);
    if (key?.startsWith("recipe::")) {
      storedKeys.add(key.replace(/^recipe::/, ""));
    }
  }

  // Add/update recipes that are in the Map but not in localStorage
  recipes.forEach((recipeValue, recipeName) => {
    if (!storedKeys.has(recipeName)) {
      setStoredRecipe(recipeValue);
    }
  });

  // Remove recipes that are in localStorage but not in the Map
  storedKeys.forEach((name) => {
    if (!recipes.has(name)) {
      removeStoreRecipe(name);
    }
  });
}

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

function setStoredRecipe(recipe: Recipe) {
  window.localStorage.setItem(key(recipe.name!), JSON.stringify(encodeLocalStorage(recipe)));
}

function removeStoreRecipe(name: string) {
  window.localStorage.removeItem(key(name));
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
