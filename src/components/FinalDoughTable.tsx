import { calculate } from "components/FinalDoughCalculator";
import IngredientsWeightList from "components/IngredientsWeightList";
import { validateRecipe } from "components/RecipeValidator";
import { sum } from "components/utils";
import { PrefermentKind } from "dataModel/Preferment";
import { Recipe, ScaleBy } from "dataModel/Recipe";

export const SOURDOUGH_SEED_LABEL = "(sourdough seed)";

type Props = {
  recipe: Recipe;
  scaleBy: ScaleBy;
  totalAmount: number;
};

export default function FinalDoughTable({ recipe, scaleBy, totalAmount }: Props) {
  const recipeValidationErrors = validateRecipe(recipe);

  if (recipeValidationErrors.length > 0) {
    return (
      <div className="ion-padding">
        <strong>RECIPE NOT VALID</strong>
        <ul>
          {recipeValidationErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  const dough = calculate(recipe, scaleBy, totalAmount);

  const finalIngredientsPercentage = new Map(
    [...recipe.flours.keys(), ...recipe.ingredients.keys()].map((k) => [k, undefined]),
  );

  dough.preferments.keys().forEach((prefermentName) => {
    finalIngredientsPercentage.set(prefermentName, undefined);
    const prefermentTotalWeight = sum(dough.preferments.get(prefermentName)!.ingredients.values());
    dough.final.set(prefermentName, prefermentTotalWeight);
  });

  return (
    <>
      <IngredientsWeightList
        title="OVERALL"
        ingredientsPercentage={new Map([...recipe.flours, ...recipe.ingredients])}
        ingredientsWeight={dough.overall}
      />
      {[...dough.preferments].map(([prefermentName, prefermentWeights]) => {
        const preferment = recipe.preferments.get(prefermentName)!;
        const ingredientsPercentage = new Map([...preferment.flours, ...preferment.ingredients]);

        if (preferment.kind === PrefermentKind.SOURDOUGH) {
          ingredientsPercentage.set(SOURDOUGH_SEED_LABEL, preferment.seed);
        }

        return (
          <IngredientsWeightList
            key={prefermentName}
            title={prefermentName}
            ingredientsPercentage={ingredientsPercentage}
            ingredientsWeight={prefermentWeights.ingredients}
          />
        );
      })}
      <IngredientsWeightList
        title="FINAL DOUGH"
        ingredientsPercentage={finalIngredientsPercentage}
        ingredientsWeight={dough.final}
      />
    </>
  );
}
