import React, { useState } from "react";
import FormulaTab from "components/FormulaTab";
import IngredientsPercentage from "components/IngredientsPercentage";
import { Ingredients } from "components/dataModel/Ingredient";

type Props = {
  title: string;
  flours: Ingredients;
  ingredients: Ingredients;
  onFloursChange(flours: Ingredients): void;
  onIngredientsChange(flours: Ingredients): void;
};

export const Overall: React.FC<Props> = ({ title, flours, ingredients, onFloursChange, onIngredientsChange }) => {
  const [editable, setEditable] = useState(false);

  return (
    <FormulaTab title={title} onEditToggle={() => setEditable(!editable)}>
      <IngredientsPercentage
        title="FLOURS"
        ingredients={flours}
        maxPercentage={100}
        onIngredientsChange={onFloursChange}
        editable={editable}
      />
      <IngredientsPercentage
        title="INGREDIENTS"
        ingredients={ingredients}
        maxPercentage={undefined}
        onIngredientsChange={onIngredientsChange}
        editable={editable}
      />
    </FormulaTab>
  );
};
