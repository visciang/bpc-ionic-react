import React from "react";
import { IonList } from "@ionic/react";
import { Ingredients } from "dataModel/Ingredient";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";

type Props = {
  title: string;
  ingredients: Ingredients;
};

const IngredientsWeightList: React.FC<Props> = ({ title, ingredients }) => {
  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} />
      {/* TODO table */}
    </IonList>
  );
};

export default IngredientsWeightList;
