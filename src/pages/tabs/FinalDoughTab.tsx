import React, { useState } from "react";
import Tab from "pages/tabs/Tab";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmountInput from "components/TotalAmountInput";
import FinalDoughTable from "components/FinalDoughTable";
import { ScaleBy } from "dataModel/Recipe";
import { Ingredients } from "dataModel/Ingredient";
import { Preferments } from "dataModel/Preferment";

type Props = {
  title: string;
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
};

const FinalDoughTab: React.FC<Props> = ({ title, flours, ingredients, preferments }) => {
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
    <Tab title={title}>
      <div className="ion-padding-bottom">
        <ScaleBySelector onSelect={setScaleBy} />
        <TotalAmountInput value={totalAmount} onChange={setTotalAmount} />
      </div>
      <div className="border-top ion-padding-vertical">{finalDoughTable}</div>
    </Tab>
  );
};

export default FinalDoughTab;
