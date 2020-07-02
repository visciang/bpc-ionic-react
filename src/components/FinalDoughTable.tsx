import React from "react";
import { useRecoilValue } from "recoil";
import { ScaleBy, Recipe } from "dataModel/Recipe";
import IngredientsWeightList from "components/IngredientsWeightList";
import { calculateFinalDough } from "components/Calculator";
import { validateRecipe } from "components/RecipeValidator";
import * as State from "state/State";

type Props = {
  scaleBy: ScaleBy;
  totalAmount: number;
};

const FinalDoughTable: React.FC<Props> = ({ scaleBy, totalAmount }) => {
  const title = useRecoilValue(State.title);
  const flours = useRecoilValue(State.flours);
  const ingredients = useRecoilValue(State.ingredients);
  const preferments = useRecoilValue(State.preferments);

  const percentageRecipe: Recipe = { name: title, flours: flours, ingredients: ingredients, preferments: preferments };
  const recipeValidationErrors = validateRecipe(percentageRecipe);

  if (recipeValidationErrors.length > 0) {
    // TODO diagnostic
    console.log(recipeValidationErrors);
    return <strong>RECIPE NOT VALID</strong>;
  }

  const finalDough = calculateFinalDough(percentageRecipe, scaleBy, totalAmount);

  return (
    <div>
      <IngredientsWeightList
        title="OVERALL"
        ingredientsPercentage={new Map([...flours.entries(), ...ingredients.entries()])}
        ingredientsWeight={new Map([...finalDough.flours.entries(), ...finalDough.ingredients.entries()])}
      />
      {/* TODO preferments and dough */}
    </div>
  );
};

export default FinalDoughTable;
