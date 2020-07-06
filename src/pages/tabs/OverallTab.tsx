import React from "react";
import Tab from "pages/tabs/Tab";
import IngredientsPercentageList from "components/IngredientsPercentageList";
import { Ingredients } from "dataModel/Ingredient";

type Props = {
  title: string;
  flours: Ingredients;
  ingredients: Ingredients;
  editable: boolean;
  onFloursChange(flours: Ingredients): void;
  onIngredientsChange(flours: Ingredients): void;
  onEditToggle(): void;
};

const OverallTab: React.FC<Props> = ({
  title,
  flours,
  ingredients,
  editable,
  onFloursChange,
  onIngredientsChange,
  onEditToggle,
}) => {
  return (
    <Tab title={title} editActive={editable} onEditToggle={onEditToggle}>
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

export default OverallTab;
