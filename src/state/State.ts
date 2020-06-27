import { atom } from "recoil";
import { recipe } from "dataModel/SampleRecipe";

export const titleState = atom({
  key: "titleState",
  default: "Untitled",
});

export const floursState = atom({
  key: "floursState",
  default: recipe.flours,
});

export const ingredientsState = atom({
  key: "ingredientsState",
  default: recipe.ingredients,
});

export const prefermentsState = atom({
  key: "prefermentsState",
  default: recipe.preferments,
});

export const editableState = atom({
  key: "editableState",
  default: false,
});
