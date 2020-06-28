import { atom } from "recoil";
import { recipe } from "dataModel/SampleRecipe";

export const title = atom({
  key: "titleState",
  default: "Untitled",
});

export const flours = atom({
  key: "floursState",
  default: recipe.flours,
});

export const ingredients = atom({
  key: "ingredientsState",
  default: recipe.ingredients,
});

export const preferments = atom({
  key: "prefermentsState",
  default: recipe.preferments,
});

export const editable = atom({
  key: "editableState",
  default: false,
});
