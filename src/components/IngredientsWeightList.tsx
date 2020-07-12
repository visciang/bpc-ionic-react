import React from "react";
import { IonList, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import { Ingredients } from "dataModel/Ingredient";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import { sum } from "components/utils";

type Props = {
  title: string;
  ingredientsPercentage: Ingredients;
  ingredientsWeight: Ingredients;
  totalWeightSubtract?: number;
};

let IngredientsWeightList: React.FC<Props> = ({
  title,
  ingredientsPercentage,
  ingredientsWeight,
  totalWeightSubtract,
}) => {
  const totalWeight = sum(ingredientsWeight.values()) - (totalWeightSubtract || 0);

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
        {[...ingredientsPercentage].map(([name, percentage], idx) => (
          <IonRow key={`${idx}-${name}`} className={idx % 2 === 0 ? "background-light" : undefined}>
            <IonCol className="ion-text-start">{name}</IonCol>
            <IonCol size="2" className="ion-text-end">
              {percentage}
            </IonCol>
            <IonCol className="ion-text-end">
              {ingredientsWeight.get(name)?.toFixed(2) || <IonText color="danger">ERROR !</IonText>}
            </IonCol>
          </IonRow>
        ))}
        <IonRow>
          <IonCol className="ion-text-start"></IonCol>
          <IonCol size="2" className="ion-text-end"></IonCol>
          <IonCol className="ion-text-end">
            {totalWeight?.toFixed(2) || <IonText color="danger">ERROR !</IonText>}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};

export default IngredientsWeightList = React.memo(IngredientsWeightList);
