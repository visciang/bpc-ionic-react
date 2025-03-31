import FinalDoughTable from "components/FinalDoughTable";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmountInput from "components/TotalAmountInput";
import { useRecipes } from "contexts/RecipesContext";
import { ScaleBy } from "dataModel/Recipe";
import { useState } from "react";

export default function FinalDoughView() {
  const [scaleBy, setScaleBy] = useState<ScaleBy | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const recipesBookCtx = useRecipes();
  const recipe = recipesBookCtx.currentRecipe;

  const finalDoughTable =
    scaleBy && totalAmount ? (
      <FinalDoughTable recipe={recipe} scaleBy={scaleBy} totalAmount={totalAmount} />
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
