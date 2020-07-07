import React from "react";
import { ScaleBy, Recipe } from "dataModel/Recipe";
import IngredientsWeightList from "components/IngredientsWeightList";
import { calculateFinalDough } from "components/Calculator";
import { validateRecipe } from "components/RecipeValidator";
import { PrefermentKind } from "dataModel/Preferment";

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
      {[...finalDough.preferments].map(([prefermentName, preferment]) => {
        const recipePreferment = recipe.preferments.get(prefermentName)!;

        const ingredientsPercentage = new Map([
          ...recipe.preferments.get(prefermentName)!.flours,
          ...recipe.preferments.get(prefermentName)!.ingredients,
        ]);
        const ingredientsWeight = new Map([...preferment.flours, ...preferment.ingredients]);
        let totalWeightSubtract = 0;

        if (recipePreferment.kind === PrefermentKind.SOURDOUGH) {
          ingredientsPercentage.set("(sourdough seed)", recipePreferment.seed);
        }
        if (preferment.kind === PrefermentKind.SOURDOUGH) {
          ingredientsWeight.set("(sourdough seed)", preferment.seed);
          totalWeightSubtract = preferment.seed!;
        }

        return (
          <IngredientsWeightList
            key={prefermentName}
            title={prefermentName}
            ingredientsPercentage={ingredientsPercentage}
            ingredientsWeight={ingredientsWeight}
            totalWeightSubtract={totalWeightSubtract}
          />
        );
      })}
      {/* TODO dough */}
    </div>
  );
};

export default FinalDoughTable;
