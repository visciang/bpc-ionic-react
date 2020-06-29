import { atom } from "recoil";
import { recipe } from "dataModel/SampleRecipe";

export const title = atom({
  key: "title",
  default: "Untitled",
});

export const flours = atom({
  key: "flours",
  default: recipe.flours,
});

export const ingredients = atom({
  key: "ingredients",
  default: recipe.ingredients,
});

export const preferments = atom({
  key: "preferments",
  default: recipe.preferments,
});

export const editable = atom({
  key: "editable",
  default: false,
});
