import { Recipe } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { sum } from "components/utils";

export const isValidRecipe = (recipe: Recipe): boolean => {
  return checkFlours(recipe.flours) && checkIngredients(recipe.ingredients);
};

const checkFlours = (flours: Ingredients): boolean => {
  for (let [flourName, flourValue] of flours) {
    if (flourValue === undefined) {
      console.log(`Undefined flour value: '${flourName}'`);
      return false;
    }
  }

  if (sum(flours.values()) !== 100) {
    console.log("Bad flours percentage, the sum should be 100%");
    return false;
  }

  return true;
};

const checkIngredients = (ingredients: Ingredients): boolean => {
  return true;
};
