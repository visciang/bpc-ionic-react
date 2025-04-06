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
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const recipe = recipesBookCtx.currentRecipe;

  const finalDoughTable =
    scaleBy && totalAmount ? (
      <FinalDoughTable recipe={recipe} scaleBy={scaleBy} totalAmount={(totalItems || 1) * totalAmount} />
    ) : undefined;

  return (
    <>
      <div className="ion-padding">
        <ScaleBySelector onSelect={setScaleBy} value={scaleBy} />
        <TotalAmountInput
          items={totalItems}
          amount={totalAmount}
          onChangeAmount={setTotalAmount}
          onChangeItems={setTotalItems}
        />
      </div>
      {finalDoughTable}
    </>
  );
}
