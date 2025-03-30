import { useCallback } from "react";
import IngredientsPercentageList from "../components/IngredientsPercentageList";
import { Ingredients } from "../dataModel/Ingredient";
import { Recipe } from "../dataModel/Recipe";

type Props = {
  recipe: Recipe;
  editable: boolean;
  onEditRecipe(recipe: Recipe): void;
};

export default function IngredientsView({ recipe, onEditRecipe, editable }: Props) {
  const onFloursChange = useCallback(
    (flours: Ingredients) => {
      onEditRecipe({ ...recipe, flours });
    },
    [recipe, onEditRecipe],
  );

  const onIngredientsChange = useCallback(
    (ingredients: Ingredients) => {
      onEditRecipe({ ...recipe, ingredients });
    },
    [recipe, onEditRecipe],
  );

  return (
    <>
      <IngredientsPercentageList
        title="FLOURS"
        ingredients={recipe.flours}
        maxPercentage={100}
        onIngredientsChange={onFloursChange}
        editable={editable}
      />
      <IngredientsPercentageList
        title="INGREDIENTS"
        ingredients={recipe.ingredients}
        maxPercentage={undefined}
        onIngredientsChange={onIngredientsChange}
        editable={editable}
      />
    </>
  );
}
