import React from "react";
import { Recipe } from "dataModel/Recipe";
import RecipesList from "components/RecipesList";
import RecipeSaveAsAlert from "components/RecipeSaveAsAlert";

type Props = {
  editable: boolean;
  name: string;
  recipes: Recipe[];
  showSaveAsAlert: boolean;
  setShowSaveAsAlert: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveRecipe(name: string): void;
  onLoadRecipe(recipe: Recipe): void;
  onDeleteRecipe(recipe: Recipe): void;
};

let RecipesTab: React.FC<Props> = ({
  editable,
  name,
  recipes,
  showSaveAsAlert,
  setShowSaveAsAlert,
  onSaveRecipe,
  onLoadRecipe,
  onDeleteRecipe,
}) => {
  return (
    <>
      <RecipeSaveAsAlert
        name={name}
        showAlert={showSaveAsAlert}
        setShowAlert={setShowSaveAsAlert}
        onSave={onSaveRecipe}
      />
      <RecipesList recipes={recipes} editable={editable} onLoadRecipe={onLoadRecipe} onDeleteRecipe={onDeleteRecipe} />
    </>
  );
};

export default RecipesTab = React.memo(RecipesTab);
