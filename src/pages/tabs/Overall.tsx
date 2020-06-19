import React, { useState } from "react";
import FormulaTab from "../../components/FormulaTab";
import IngredientsPercentage from "../../components/IngredientsPercentage";
import { Recipe } from "../../components/dataModel/Recipe";
import { Ingredients } from "../../components/dataModel/Ingredient";

type Props = {
  recipe: Recipe;
  onFloursChange(flours: Ingredients): void;
  onIngredientsChange(flours: Ingredients): void;
};

export const Overall: React.FC<Props> = ({ recipe, onFloursChange, onIngredientsChange }) => {
  const [editable, setEditable] = useState(false);

  return (
    <FormulaTab title={recipe.name} onEditToggle={() => setEditable(!editable)}>
      <IngredientsPercentage
        title="FLOURS"
        ingredients={recipe.flours}
        maxPercentage={100}
        onIngredientsChange={onFloursChange}
        editable={editable}
      />
      <IngredientsPercentage
        title="INGREDIENTS"
        ingredients={recipe.ingredients}
        maxPercentage={undefined}
        onIngredientsChange={onIngredientsChange}
        editable={editable}
      />
    </FormulaTab>
  );
};
