import React, { useState } from "react";
import FormulaTab from "../../components/FormulaTab";
import { Recipe, ScaleBy } from "../../components/Recipe";
import ScaleBySelector from "../../components/ScaleBySelector";
import TotalAmount from "../../components/TotalAmount";
import Calculate from "../../components/Calculate";

type Props = {
  recipe: Recipe;
};

const FinalDough: React.FC<Props> = ({ recipe }) => {
  const [scaleBy, setScaleBy] = useState(ScaleBy.DOUGH);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const calculate = () => {
    console.log("TODO calculation!");
  };

  return (
    <FormulaTab title={recipe.name}>
      <ScaleBySelector value={scaleBy} onChange={setScaleBy} />
      <TotalAmount value={totalAmount} onChange={setTotalAmount} />
      <Calculate onClick={calculate} />
    </FormulaTab>
  );
};

export default FinalDough;
