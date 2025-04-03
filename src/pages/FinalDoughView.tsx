import FinalDoughTable from "components/FinalDoughTable";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmountInput from "components/TotalAmountInput";
import { ScaleBy } from "dataModel/Recipe";
import { RecipesBookContextProps } from "hooks/useRecipesBook";
import { useState } from "react";

type Props = {
  recipesBookCtx: RecipesBookContextProps;
};

export default function FinalDoughView({ recipesBookCtx }: Props) {
  const [scaleBy, setScaleBy] = useState<ScaleBy>(ScaleBy.DOUGH);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const recipe = recipesBookCtx.currentRecipe;

  const finalDoughTable =
    scaleBy && totalAmount ? (
      <FinalDoughTable recipe={recipe} scaleBy={scaleBy} totalAmount={totalAmount} />
    ) : undefined;

  return (
    <>
      <div className="ion-padding-bottom">
        <ScaleBySelector onSelect={setScaleBy} value={scaleBy} />
        <TotalAmountInput value={totalAmount} onChange={setTotalAmount} />
      </div>
      <div className="border-top ion-padding-vertical">{finalDoughTable}</div>
    </>
  );
}
