import React from "react";
import { IonList } from "@ionic/react";
import { Recipe } from "dataModel/Recipe";
import RecipeItem from "./RecipeItem";

type Props = {
  recipes: Recipe[];
  editable: boolean;
  onLoadRecipe(recipe: Recipe): void;
  onDeleteRecipe(recipe: Recipe): void;
};

let RecipesList: React.FC<Props> = ({ recipes, editable, onLoadRecipe, onDeleteRecipe }) => {
  return (
    <IonList>
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.name}
          name={recipe.name}
          editable={editable}
          onLoad={() => onLoadRecipe(recipe)}
          onDelete={() => onDeleteRecipe(recipe)}
        />
      ))}
    </IonList>
  );
};

export default RecipesList = React.memo(RecipesList);
