import React, { useCallback } from "react";
import { IonList, IonLabel, IonItem } from "@ionic/react";
import { IngredientName, Ingredients } from "dataModel/Ingredient";
import { Preferments } from "dataModel/Preferment";
import { Recipe } from "dataModel/Recipe";

type Props = {
  recipes: Recipe[];
  editable: boolean;
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
  setName,
  setFlours,
  setIngredients,
  setPreferments,
  setAvailableFlours,
  setAvailableIngredients,
}) => {
  const loadRecipe = useCallback(
    (recipe: Recipe): void => {
      setName(recipe.name);
      setFlours(recipe.flours);
      setIngredients(recipe.ingredients);
      setPreferments(recipe.preferments);
      setAvailableFlours([...recipe.flours.keys()]);
      setAvailableIngredients([...recipe.ingredients.keys()]);
    },
    [setName, setFlours, setIngredients, setPreferments, setAvailableFlours, setAvailableIngredients]
  );

  return (
    <IonList>
      {recipes.map((recipe) => (
        <IonItem key={recipe.name} button onClick={() => loadRecipe(recipe)} routerLink="/overallTab" routerDirection="none" detail={false}>
          <IonLabel>{recipe.name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default RecipesList = React.memo(RecipesList);
