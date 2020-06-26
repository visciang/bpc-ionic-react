import React, { useState } from "react";
import Tab from "pages/tabs/Tab";
import IngredientsPercentageList from "components/IngredientsPercentageList";
import { propsShallowCompare } from "components/utils";
import { Ingredients } from "dataModel/Ingredient";

type Props = {
  title: string;
  flours: Ingredients;
  ingredients: Ingredients;
  onFloursChange(flours: Ingredients): void;
  onIngredientsChange(flours: Ingredients): void;
};

const Component: React.FC<Props> = ({ title, flours, ingredients, onFloursChange, onIngredientsChange }) => {
  const [editable, setEditable] = useState(false);

  return (
    <Tab title={title} editActive={editable} onEditToggle={() => setEditable(!editable)}>
      <IngredientsPercentageList
        title="FLOURS"
        ingredients={flours}
        maxPercentage={100}
        onIngredientsChange={onFloursChange}
        editable={editable}
      />
      <IngredientsPercentageList
        title="INGREDIENTS"
        ingredients={ingredients}
        maxPercentage={undefined}
        onIngredientsChange={onIngredientsChange}
        editable={editable}
      />
    </Tab>
  );
};

const OverallTab = React.memo(Component, (p: Props, n: Props) =>
  propsShallowCompare(p, n, ["title", "flours", "ingredients"])
);
export default OverallTab;
