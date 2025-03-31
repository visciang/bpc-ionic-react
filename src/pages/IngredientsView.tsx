import IngredientsPercentageList from "components/IngredientsPercentageList";
import { useRecipes } from "contexts/RecipesContext";
import { Ingredients } from "dataModel/Ingredient";
import { useCallback } from "react";

type Props = {
  editable: boolean;
};

export default function IngredientsView({ editable }: Props) {
  const recipesBookCtx = useRecipes();
  const recipe = recipesBookCtx.currentRecipe;
  const onEditRecipe = recipesBookCtx.onEdit;

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
