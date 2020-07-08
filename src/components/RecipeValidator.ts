import { Ingredients } from "dataModel/Ingredient";
import { sum } from "components/utils";
import { Preferments } from "dataModel/Preferment";

export type RecipeValidationErrors = string[];

export const validateRecipe = (
  flours: Ingredients,
  ingredients: Ingredients,
  preferments: Preferments
): RecipeValidationErrors => {
  const errors: RecipeValidationErrors = [];

  errors.push(...checkFlours(flours, "OVERALL"));
  errors.push(...checkIngredients(ingredients, "OVERALL"));
  errors.push(...checkPreferments(preferments));

  return errors;
};

const checkFlours = (flours: Ingredients, err_title: string): RecipeValidationErrors => {
  const errors: RecipeValidationErrors = [];

  for (let [name, value] of flours) {
    if (value === undefined) {
      errors.push(`[${err_title}] Undefined flour value: '${name}'`);
    }
  }

  if (sum(flours.values()) !== 100) {
    errors.push(`[${err_title}] Bad flours percentage, the sum should be 100%`);
  }

  return errors;
};

const checkIngredients = (ingredients: Ingredients, err_title: string): RecipeValidationErrors => {
  const errors: RecipeValidationErrors = [];

  for (let [name, value] of ingredients) {
    if (value === undefined) {
      errors.push(`[${err_title}] Undefined ingredient value: '${name}'`);
    }
  }

  return errors;
};

const checkPreferments = (preferments: Preferments): RecipeValidationErrors => {
  const errors: RecipeValidationErrors = [];

  for (let [name, value] of preferments) {
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
};
