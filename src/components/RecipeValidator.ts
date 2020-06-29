import { Recipe } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { sum } from "components/utils";

export type RecipeValidationErrors = string[];

export const validateRecipe = (recipe: Recipe): RecipeValidationErrors => {
  return checkFlours(recipe.flours).concat(checkIngredients(recipe.ingredients));
};

const checkFlours = (flours: Ingredients): RecipeValidationErrors => {
  const errors: RecipeValidationErrors = [];

  for (let [flourName, flourValue] of flours.entries()) {
    if (flourValue === undefined) {
      errors.push(`Undefined flour value: '${flourName}'`);
    }
  }

  if (sum(flours.values()) !== 100) {
    errors.push("Bad flours percentage, the sum should be 100%");
  }

  return errors;
};

const checkIngredients = (ingredients: Ingredients): RecipeValidationErrors => {
  const errors: RecipeValidationErrors = [];
  return errors;
};
