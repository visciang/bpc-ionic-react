import React, { useState } from "react";
import Tab from "pages/tabs/Tab";
import IngredientsPercentageList from "components/IngredientsPercentageList";
import { Ingredients } from "dataModel/Ingredient";

type Props = {
  title: string;
  flours: Ingredients;
  ingredients: Ingredients;
  onFloursChange(flours: Ingredients): void;
  onIngredientsChange(flours: Ingredients): void;
};

export const Overall: React.FC<Props> = ({ title, flours, ingredients, onFloursChange, onIngredientsChange }) => {
  const [editable, setEditable] = useState(false);

  return (
    <Tab title={title} onEditToggle={() => setEditable(!editable)}>
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
