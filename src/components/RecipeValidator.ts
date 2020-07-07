import { Recipe } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { sum } from "components/utils";

export type RecipeValidationErrors = string[];

export const validateRecipe = (recipe: Recipe): RecipeValidationErrors => {
  return checkFlours(recipe.flours).concat(checkIngredients(recipe.ingredients));
};

const checkFlours = (flours: Ingredients): RecipeValidationErrors => {
  const errors: RecipeValidationErrors = [];

  for (let [name, value] of flours) {
    if (value === undefined) {
      errors.push(`Undefined flour value: '${name}'`);
    }
  }

  if (sum(flours.values()) !== 100) {
    errors.push("Bad flours percentage, the sum should be 100%");
  }

  return errors;
};

const checkIngredients = (ingredients: Ingredients): RecipeValidationErrors => {
  const errors: RecipeValidationErrors = [];

  for (let [name, value] of ingredients) {
    if (value === undefined) {
      errors.push(`Undefined ingredient value: '${name}'`);
    }
  }

  return errors;
};
