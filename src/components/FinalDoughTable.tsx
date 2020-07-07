import React from "react";
import { ScaleBy, Recipe } from "dataModel/Recipe";
import IngredientsWeightList from "components/IngredientsWeightList";
import { calculateFinalDough } from "components/Calculator";
import { validateRecipe } from "components/RecipeValidator";

type Props = {
  recipe: Recipe;
  scaleBy: ScaleBy;
  totalAmount: number;
};

const FinalDoughTable: React.FC<Props> = ({ recipe, scaleBy, totalAmount }) => {
  const recipeValidationErrors = validateRecipe(recipe);

  if (recipeValidationErrors.length > 0) {
    // TODO diagnostic
    console.log(recipeValidationErrors);
    return <strong>RECIPE NOT VALID</strong>;
  }

  const finalDough = calculateFinalDough(recipe, scaleBy, totalAmount);

  return (
    <div>
      <IngredientsWeightList
        title="OVERALL"
        ingredientsPercentage={new Map([...recipe.flours, ...recipe.ingredients])}
        ingredientsWeight={new Map([...finalDough.flours, ...finalDough.ingredients])}
      />
      {/* TODO preferments and dough */}
    </div>
  );
};

export default FinalDoughTable;
