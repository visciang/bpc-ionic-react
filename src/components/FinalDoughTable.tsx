import { calculate } from "components/FinalDoughCalculator";
import IngredientsWeightList from "components/IngredientsWeightList";
import { validateRecipe } from "components/RecipeValidator";
import { Recipe, ScaleBy } from "dataModel/Recipe";

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

  return (
    <>
      <IngredientsWeightList
        title="OVERALL"
        ingredientsPercentage={new Map([...recipe.flours, ...recipe.ingredients])}
        ingredientsWeight={dough.overall}
      />
      {[...dough.preferments].map(([prefermentName, preferment]) => {
        const ingredientsPercentage = new Map([
          ...recipe.preferments.get(prefermentName)!.flours,
          ...recipe.preferments.get(prefermentName)!.ingredients,
        ]);

        if (preferment.seed) {
          ingredientsPercentage.set("(sourdough seed)", preferment.seed);
        }

        return (
          <IngredientsWeightList
            key={prefermentName}
            title={prefermentName}
            ingredientsPercentage={ingredientsPercentage}
            ingredientsWeight={preferment.ingredients}
            totalWeightSubtract={preferment.seed}
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
