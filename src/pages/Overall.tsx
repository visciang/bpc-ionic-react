import React from "react";
import FormulaTab from "./FormulaTab";
import IngredientsPercentage from "../components/IngredientsPercentage";
import { Recipe } from "../components/Recipe";
import "./Overall.css";

interface Props {
  recipe: Recipe;
}

const Overall: React.FC<Props> = ({ recipe }) => {
  return (
    <FormulaTab title={recipe.name}>
      <IngredientsPercentage title="FLOURS" ingredients={recipe.flours} maxPercentage={100}/>
      <IngredientsPercentage title="INGREDIENTS" ingredients={recipe.ingredients} />
    </FormulaTab>
  );
};

export default Overall;
