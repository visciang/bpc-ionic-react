import React from "react";
import FormulaTab from "../components/FormulaTab";
import IngredientsPercentage from "../components/IngredientsPercentage";
import { Recipe } from "../components/Recipe";

type Props = {
  recipe: Recipe;
  onRecipeChange(recipe: Recipe): void;
};

const Overall: React.FC<Props> = ({ recipe, onRecipeChange }) => {
  return (
    <FormulaTab title={recipe.name}>
      <IngredientsPercentage
        title="FLOURS"
        ingredients={recipe.flours}
        maxPercentage={100}
        onIngredientsChange={(flours) => onRecipeChange({ ...recipe, flours: flours })}
      />
      <IngredientsPercentage
        title="INGREDIENTS"
        ingredients={recipe.ingredients}
        maxPercentage={undefined}
        onIngredientsChange={(ingredients) => onRecipeChange({ ...recipe, ingredients: ingredients })}
      />
    </FormulaTab>
  );
};

export default Overall;
