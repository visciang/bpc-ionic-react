import React from "react";
import { Ingredients, IngredientName } from "dataModel/Ingredient";
import { Preferments } from "dataModel/Preferment";
import { Recipe } from "dataModel/Recipe";
import RecipesList from "components/RecipesList";
import RecipeSaveAsAlert from "components/RecipeSaveAsAlert";

type Props = {
  name: string;
  recipes: Recipe[];
  editable: boolean;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setFlours: React.Dispatch<React.SetStateAction<Ingredients>>;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients>>;
  setPreferments: React.Dispatch<React.SetStateAction<Preferments>>;
  setAvailableFlours: React.Dispatch<React.SetStateAction<IngredientName[]>>;
  setAvailableIngredients: React.Dispatch<React.SetStateAction<IngredientName[]>>;
  showSaveAsAlert: boolean;
  setShowSaveAsAlert: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveRecipe(name: string): void;
};

let RecipesTab: React.FC<Props> = ({
  name,
  recipes,
  editable,
  setRecipes,
  setName,
  setFlours,
  setIngredients,
  setPreferments,
  setAvailableFlours,
  setAvailableIngredients,
  showSaveAsAlert,
  setShowSaveAsAlert,
  onSaveRecipe,
}) => {
  return (
    <>
      <RecipeSaveAsAlert
        name={name}
        showAlert={showSaveAsAlert}
        setShowAlert={setShowSaveAsAlert}
        onSave={onSaveRecipe}
      />
      <RecipesList
        recipes={recipes}
        editable={editable}
        setRecipes={setRecipes}
        setName={setName}
        setFlours={setFlours}
        setIngredients={setIngredients}
        setPreferments={setPreferments}
        setAvailableFlours={setAvailableFlours}
        setAvailableIngredients={setAvailableIngredients}
      />
    </>
  );
};

export default RecipesTab = React.memo(RecipesTab);
