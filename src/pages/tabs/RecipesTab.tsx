import React from "react";
import Tab from "pages/tabs/Tab";
import { Ingredients, IngredientName } from "dataModel/Ingredient";
import { Preferments } from "dataModel/Preferment";
import { Recipe } from "dataModel/Recipe";
import RecipesList from "components/RecipesList";

type Props = {
  recipes: Recipe[];
  editable: boolean;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setFlours: React.Dispatch<React.SetStateAction<Ingredients>>;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredients>>;
  setPreferments: React.Dispatch<React.SetStateAction<Preferments>>;
  setAvailableFlours: React.Dispatch<React.SetStateAction<IngredientName[]>>;
  setAvailableIngredients: React.Dispatch<React.SetStateAction<IngredientName[]>>;
  onEditToggle(): void;
};

let RecipesTab: React.FC<Props> = ({
  editable,
  recipes,
  setRecipes,
  onEditToggle,
  setName,
  setFlours,
  setIngredients,
  setPreferments,
  setAvailableFlours,
  setAvailableIngredients,
}) => {
  return (
    <Tab title="Recipes" editActive={editable} onEditToggle={onEditToggle}>
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
    </Tab>
  );
};

export default RecipesTab = React.memo(RecipesTab);
