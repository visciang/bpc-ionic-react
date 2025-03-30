import { Ingredients } from "../dataModel/Ingredient";
import { Preferments } from "../dataModel/Preferment";
import { Recipe } from "../dataModel/Recipe";
import { sum } from "./utils";

export type RecipeValidationErrors = string[];

export function validateRecipe(recipe: Recipe): RecipeValidationErrors {
  const errors: RecipeValidationErrors = [];

  errors.push(...checkFlours(recipe.flours, "OVERALL"));
  errors.push(...checkIngredients(recipe.ingredients, "OVERALL"));
  errors.push(...checkPreferments(recipe.preferments));

  return errors;
}

function checkFlours(flours: Ingredients, err_title: string): RecipeValidationErrors {
  const errors: RecipeValidationErrors = [];

  for (const [name, value] of flours) {
    if (value === undefined) {
      errors.push(`[${err_title}] Undefined flour value: '${name}'`);
    }
  }

  if (sum(flours.values()) !== 100) {
    errors.push(`[${err_title}] Bad flours percentage, the sum should be 100%`);
  }

  return errors;
}

function checkIngredients(ingredients: Ingredients, err_title: string): RecipeValidationErrors {
  const errors: RecipeValidationErrors = [];

  for (const [name, value] of ingredients) {
    if (value === undefined) {
      errors.push(`[${err_title}] Undefined ingredient value: '${name}'`);
    }
  }

  return errors;
}

function checkPreferments(preferments: Preferments): RecipeValidationErrors {
  const errors: RecipeValidationErrors = [];

  for (const [name, value] of preferments) {
    if (value.prefermentedFlour === undefined) {
      errors.push("Undefined prefermented flour value");
    }

    errors.push(...checkFlours(value.flours, `PREFERMENT ${name}`));
    errors.push(...checkIngredients(value.ingredients, `PREFERMENT ${name}`));
  }

  if (sum([...preferments.values()].map((p) => p.prefermentedFlour)) > 100) {
    errors.push("Total prefermented flour > 100%");
  }

  return errors;
}
