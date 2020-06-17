import React from "react";
import { IonList } from "@ionic/react";
import { Preferment, Recipe, IngredientName, IngredientValue } from "./Recipe";
import IngredientsTitleToolbar from "./IngredientsTitleToolbar";
import IngredientsPercentageItem from "./IngredientsPercentageItem";

type Props = {
  title: string;
  recipe: Recipe;
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(preferment: Preferment): void;
};

const PrefermentPercentage: React.FC<Props> = ({ title, preferment, onPrefermentChange }) => {
  let title_ = `${title} [${preferment.kind}]`;

  const onPrefermentedFlourChange = (name: IngredientName, value: IngredientValue) => {
    onPrefermentChange({ ...preferment, prefermentedFlour: value });
  };

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title_} />
      <IngredientsPercentageItem
        name="Prefermented flour"
        value={preferment.prefermentedFlour}
        maxPercentage={100}
        onChange={onPrefermentedFlourChange}
      />
    </IonList>
  );
};

export default PrefermentPercentage;
