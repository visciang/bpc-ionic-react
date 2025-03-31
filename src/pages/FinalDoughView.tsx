import FinalDoughTable from "components/FinalDoughTable";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmountInput from "components/TotalAmountInput";
import { useFinalDough } from "contexts/FinalDoughContext";
import { useRecipes } from "contexts/RecipesContext";
import { debounce } from "lodash";
import { useMemo } from "react";

export default function FinalDoughView() {
  const { scaleBy, setScaleBy, totalAmount, setTotalAmount } = useFinalDough();

  const debouncedSetTotalAmount = useMemo(
    () =>
      debounce((totalAmount: number) => {
        setTotalAmount(totalAmount);
      }, 300),
    [setTotalAmount],
  );

  const recipesBookCtx = useRecipes();
  const recipe = recipesBookCtx.currentRecipe;

  const finalDoughTable =
    scaleBy && totalAmount ? (
      <FinalDoughTable recipe={recipe} scaleBy={scaleBy} totalAmount={totalAmount} />
    ) : undefined;

  return (
    <>
      <div className="ion-padding-bottom">
        <ScaleBySelector onSelect={setScaleBy} value={scaleBy} />
        <TotalAmountInput value={totalAmount} onChange={debouncedSetTotalAmount} />
      </div>
      <div className="border-top ion-padding-vertical">{finalDoughTable}</div>
    </>
  );
}
