import FinalDoughTable from "components/FinalDoughTable";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmountInput from "components/TotalAmountInput";
import { useFinalDough } from "contexts/FinalDoughContext";
import { useRecipes } from "contexts/RecipesContext";

export default function FinalDoughView() {
  const { scaleBy, setScaleBy, totalAmount, setTotalAmount } = useFinalDough();

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
        <TotalAmountInput value={totalAmount} onChange={setTotalAmount} />
      </div>
      <div className="border-top ion-padding-vertical">{finalDoughTable}</div>
    </>
  );
}
