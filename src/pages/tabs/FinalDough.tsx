import React, { useState } from "react";
import FormulaTab from "components/FormulaTab";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmount from "components/TotalAmount";
import Calculate from "components/Calculate";
import { ScaleBy, Recipe } from "dataModel/Recipe";

type Props = {
  recipe: Recipe;
};

export const FinalDough: React.FC<Props> = ({ recipe }) => {
  const [scaleBy, setScaleBy] = useState(ScaleBy.DOUGH);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const calculate = () => {
    console.log(`TODO calculation! ${scaleBy} ${totalAmount}`);
  };

  return (
    <FormulaTab title={recipe.name}>
      <ScaleBySelector onSelect={setScaleBy} />
      <TotalAmount value={totalAmount} onChange={setTotalAmount} />
      <Calculate onClick={calculate} />
    </FormulaTab>
  );
};
