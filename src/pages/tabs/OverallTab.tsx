import React from "react";
import IngredientsPercentageList from "components/IngredientsPercentageList";
import { Ingredients } from "dataModel/Ingredient";

type Props = {
  flours: Ingredients;
  ingredients: Ingredients;
  editable: boolean;
  onFloursChange(flours: Ingredients): void;
  onIngredientsChange(flours: Ingredients): void;
};

let OverallTab: React.FC<Props> = ({ flours, ingredients, editable, onFloursChange, onIngredientsChange }) => {
  return (
    <>
      <IngredientsPercentageList
        title="FLOURS"
        ingredients={flours}
        maxPercentage={100}
        onIngredientsChange={onFloursChange}
        editable={editable}
      />
      <IngredientsPercentageList
        title="INGREDIENTS"
        ingredients={ingredients}
        maxPercentage={undefined}
        onIngredientsChange={onIngredientsChange}
        editable={editable}
      />
    </>
  );
};

export default OverallTab = React.memo(OverallTab);
