import React, { useState } from "react";
import Tab from "pages/tabs/Tab";
import ScaleBySelector from "components/ScaleBySelector";
import TotalAmountInput from "components/TotalAmountInput";
import FinalDoughTable from "components/FinalDoughTable";
import { propsShallowCompare } from "components/utils";
import { ScaleBy, Recipe } from "dataModel/Recipe";

type Props = {
  recipe: Recipe;
};

const Component: React.FC<Props> = ({ recipe }) => {
  const [scaleBy, setScaleBy] = useState<ScaleBy | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const finalDoughTable =
    scaleBy && totalAmount ? (
      <FinalDoughTable recipe={recipe} scaleBy={scaleBy} totalAmount={totalAmount} />
    ) : undefined;

  return (
    <Tab title={recipe.name}>
      <div className="ion-padding-bottom">
        <ScaleBySelector onSelect={setScaleBy} />
        <TotalAmountInput value={totalAmount} onChange={setTotalAmount} />
      </div>
      <div className="border-top ion-padding-vertical">{finalDoughTable}</div>
    </Tab>
  );
};

const FinalDoughTab = React.memo(Component, (p: Props, n: Props) => propsShallowCompare(p, n, ["recipe"]));
export default FinalDoughTab;
