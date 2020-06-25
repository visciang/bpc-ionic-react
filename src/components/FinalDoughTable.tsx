import React from "react";
import { ScaleBy, Recipe } from "dataModel/Recipe";
import IngredientsWeightList from "components/IngredientsWeightList";
import { calculate } from "components/Calculator";

type Props = {
  recipe: Recipe;
  scaleBy: ScaleBy;
  totalAmount: number;
};

const FinalDoughTable: React.FC<Props> = ({ recipe, scaleBy, totalAmount }) => {
  const finalDough = calculate(recipe, scaleBy, totalAmount);

  return (
    <div>
      <IngredientsWeightList
        title="OVERALL"
        ingredients={new Map([...finalDough.flours.entries(), ...finalDough.ingredients.entries()])}
      />
      {/* TODO preferments and dough */}
    </div>
  );
};

export default FinalDoughTable;
