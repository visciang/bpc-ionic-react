import React from "react";
import { ScaleBy, Recipe } from "dataModel/Recipe";
import IngredientsWeightList from "components/IngredientsWeightList";
import { calculateFinalDough } from "components/Calculator";

type Props = {
  recipe: Recipe;
  scaleBy: ScaleBy;
  totalAmount: number;
};

const FinalDoughTable: React.FC<Props> = ({ recipe, scaleBy, totalAmount }) => {
  const finalDough = calculateFinalDough(recipe, scaleBy, totalAmount);

  if (finalDough) {
    return (
      <div>
        <IngredientsWeightList
          title="OVERALL"
          ingredientsPercentage={new Map([...recipe.flours.entries(), ...recipe.ingredients.entries()])}
          ingredientsWeight={new Map([...finalDough.flours.entries(), ...finalDough.ingredients.entries()])}
        />
        {/* TODO preferments and dough */}
      </div>
    );
  } else {
    return <strong>RECIPE NOT VALID</strong>;
  }
};

export default FinalDoughTable;
