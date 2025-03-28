import { useState } from "react";
import FinalDoughTable from "../components/FinalDoughTable";
import ScaleBySelector from "../components/ScaleBySelector";
import TotalAmountInput from "../components/TotalAmountInput";
import { Recipe, ScaleBy } from "../dataModel/Recipe";

type Props = {
  recipe: Recipe;
};

export default function FinalDoughView({ recipe }: Props) {
  const [scaleBy, setScaleBy] = useState<ScaleBy | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const finalDoughTable = scaleBy && totalAmount ? (
    <FinalDoughTable
      recipe={recipe}
      scaleBy={scaleBy}
      totalAmount={totalAmount} />
  ) : undefined;

  return (
    <>
      <div className="ion-padding-bottom">
        <ScaleBySelector onSelect={setScaleBy} />
        <TotalAmountInput value={totalAmount} onChange={setTotalAmount} />
      </div>
      <div className="border-top ion-padding-vertical">{finalDoughTable}</div>
    </>
  );
}
