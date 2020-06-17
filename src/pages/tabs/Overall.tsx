import React, { useState } from "react";
import FormulaTab from "../../components/FormulaTab";
import IngredientsPercentage from "../../components/IngredientsPercentage";
import { Recipe, Ingredients } from "../../components/Recipe";

type Props = {
  recipe: Recipe;
  onFloursChange(flours: Ingredients): void;
  onIngredientsChange(flours: Ingredients): void;
};

const Overall: React.FC<Props> = ({ recipe, onFloursChange, onIngredientsChange }) => {
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

export default Overall;
