import React, { useState } from "react";
import FormulaTab from "../../components/FormulaTab";
import IngredientsPercentage from "../../components/IngredientsPercentage";
import { Recipe } from "../../components/Recipe";

type Props = {
  recipe: Recipe;
  onRecipeChange(recipe: Recipe): void;
};

const Overall: React.FC<Props> = ({ recipe, onRecipeChange }) => {
  const [editable, setEditable] = useState(false);

  return (
    <FormulaTab title={recipe.name} onEditToggle={() => setEditable(!editable)}>
      <IngredientsPercentage
        title="FLOURS"
        ingredients={recipe.flours}
        maxPercentage={100}
        onIngredientsChange={(flours) => onRecipeChange({ ...recipe, flours: flours })}
        editable={editable}
      />
      <IngredientsPercentage
        title="INGREDIENTS"
        ingredients={recipe.ingredients}
        maxPercentage={undefined}
        onIngredientsChange={(ingredients) => onRecipeChange({ ...recipe, ingredients: ingredients })}
        editable={editable}
      />
    </FormulaTab>
  );
};

export default Overall;
