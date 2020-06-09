import React from "react";
import FormulaTab from "./FormulaTab";
import { Recipe } from "../components/Recipe";
import "./FinalDough.css";

interface Props {
  recipe: Recipe;
}

const FinalDough: React.FC<Props> = ({ recipe }) => {
  return (
    <FormulaTab title={recipe.name}>
      <p>{recipe.name}</p>
    </FormulaTab>
  );
};

export default FinalDough;
