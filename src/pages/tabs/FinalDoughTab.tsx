import React, { useState } from "react";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmountInput from "components/TotalAmountInput";
import FinalDoughTable from "components/FinalDoughTable";
import { ScaleBy } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { Preferments } from "dataModel/Preferment";

type Props = {
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
};

let FinalDoughTab: React.FC<Props> = ({ flours, ingredients, preferments }) => {
  const [scaleBy, setScaleBy] = useState<ScaleBy | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const finalDoughTable =
    scaleBy && totalAmount ? (
      <FinalDoughTable
        flours={flours}
        ingredients={ingredients}
        preferments={preferments}
        scaleBy={scaleBy}
        totalAmount={totalAmount}
      />
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
};

export default FinalDoughTab = React.memo(FinalDoughTab);
