import React, { useState } from "react";
import Tab from "pages/tabs/Tab";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmountInput from "components/TotalAmountInput";
import CalculateButton from "components/CalculateButton";
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
    <Tab title={recipe.name}>
      <ScaleBySelector onSelect={setScaleBy} />
      <TotalAmountInput value={totalAmount} onChange={setTotalAmount} />
      <CalculateButton onClick={calculate} />
    </Tab>
  );
};
