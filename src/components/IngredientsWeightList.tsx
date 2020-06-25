import React from "react";
import { IonList, IonGrid, IonRow, IonCol } from "@ionic/react";
import { Ingredients } from "dataModel/Ingredient";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";

type Props = {
  title: string;
  ingredientsPercentage: Ingredients;
  ingredientsWeight: Ingredients;
};

const IngredientsWeightList: React.FC<Props> = ({ title, ingredientsPercentage, ingredientsWeight }) => {
  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} />
      <IonGrid>
        <IonRow color="light">
          <IonCol className="ion-text-start">
            <strong>INGREDIENT</strong>
          </IonCol>
          <IonCol size="2" className="ion-text-end">
            <strong>%</strong>
          </IonCol>
          <IonCol className="ion-text-end">
            <strong>WEIGHT</strong>
          </IonCol>
        </IonRow>
        {[...ingredientsPercentage.entries()].map(([name, percentage], idx) => (
          <IonRow key={`${idx}-${name}`} className={idx % 2 === 0 ? "background-light" : undefined}>
            <IonCol className="ion-text-start">{name}</IonCol>
            <IonCol size="2" className="ion-text-end">
              {percentage}
            </IonCol>
            <IonCol className="ion-text-end">{ingredientsWeight.get(name)!.toFixed(2)}</IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </IonList>
  );
};

export default IngredientsWeightList;
