import IngredientsPercentageList from "components/IngredientsPercentageList";
import { Ingredients } from "dataModel/Ingredient";
import { RecipesBookContextProps } from "hooks/useRecipesBook";
import { useCallback } from "react";

type Props = {
  editable: boolean;
  recipesBookCtx: RecipesBookContextProps;
};

export default function IngredientsView({ editable, recipesBookCtx }: Props) {
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
        onIngredientsChange={onFloursChange}
        editable={editable}
      />
      <IngredientsPercentageList
        title="INGREDIENTS"
        ingredients={recipe.ingredients}
        onIngredientsChange={onIngredientsChange}
        editable={editable}
      />
    </>
  );
}
