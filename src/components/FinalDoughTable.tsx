import React from "react";
import { ScaleBy } from "dataModel/Recipe";
import IngredientsWeightList from "components/IngredientsWeightList";
import { calculateDough } from "components/Calculator";
import { validateRecipe } from "components/RecipeValidator";
import { Preferments } from "dataModel/Preferment";
import { Ingredients, IngredientName } from "dataModel/Ingredient";

type Props = {
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
  scaleBy: ScaleBy;
  totalAmount: number;
};

let FinalDoughTable: React.FC<Props> = ({ flours, ingredients, preferments, scaleBy, totalAmount }) => {
  const recipeValidationErrors = validateRecipe(flours, ingredients, preferments);

  if (recipeValidationErrors.length > 0) {
    // TODO diagnostic
    console.log(recipeValidationErrors);
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

  const dough = calculateDough(flours, ingredients, preferments, scaleBy, totalAmount);

  const finalFlours = [...flours.keys()].map<[IngredientName, undefined]>((k) => [k, undefined]);
  const finalIngredients = [...ingredients.keys()].map<[IngredientName, undefined]>((k) => [k, undefined]);
  const finalIngredientsPercentage = new Map([...finalFlours, ...finalIngredients]);

  return (
    <>
      <IngredientsWeightList
        title="OVERALL"
        ingredientsPercentage={new Map([...flours, ...ingredients])}
        ingredientsWeight={dough.overall}
      />
      {[...dough.preferments].map(([prefermentName, preferment]) => {
        let ingredientsPercentage = new Map([
          ...preferments.get(prefermentName)!.flours,
          ...preferments.get(prefermentName)!.ingredients,
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
};

export default FinalDoughTable = React.memo(FinalDoughTable);
