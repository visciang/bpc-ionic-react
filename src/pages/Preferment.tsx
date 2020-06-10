import React from "react";
import FormulaTab from "../components/FormulaTab";
import { Recipe } from "../components/Recipe";
import "./Preferment.css";

type Props = {
  recipe: Recipe;
};

const Preferment: React.FC<Props> = ({ recipe }) => {
  return (
    <FormulaTab title={recipe.name}>
      <p>TODO</p>
    </FormulaTab>
  );
};

export default Preferment;
