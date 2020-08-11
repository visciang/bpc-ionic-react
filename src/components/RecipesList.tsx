import React, { useCallback } from "react";
import { IonList } from "@ionic/react";
import { IngredientName, Ingredients } from "dataModel/Ingredient";
import { Preferments } from "dataModel/Preferment";
import { Recipe } from "dataModel/Recipe";
import RecipeItem from "./RecipeItem";

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
};

let RecipesList: React.FC<Props> = ({
  recipes,
  editable,
  setRecipes,
  setName,
  setFlours,
  setIngredients,
  setPreferments,
  setAvailableFlours,
  setAvailableIngredients,
}) => {
  const loadRecipe = useCallback(
    (recipe: Recipe) => {
      setName(recipe.name);
      setFlours(recipe.flours);
      setIngredients(recipe.ingredients);
      setPreferments(recipe.preferments);
      setAvailableFlours([...recipe.flours.keys()]);
      setAvailableIngredients([...recipe.ingredients.keys()]);
    },
    [setName, setFlours, setIngredients, setPreferments, setAvailableFlours, setAvailableIngredients]
  );

  const deleteRecipe = useCallback((recipe: Recipe): void => setRecipes(recipes => recipes.filter((x) => x !== recipe)), [
    setRecipes,
  ]);

  return (
    <IonList>
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.name}
          name={recipe.name}
          editable={editable}
          onLoad={() => loadRecipe(recipe)}
          onDelete={() => deleteRecipe(recipe)}
        />
      ))}
    </IonList>
  );
};

export default RecipesList = React.memo(RecipesList);
