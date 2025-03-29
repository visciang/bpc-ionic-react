import { IonList, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import { Ingredients } from "../dataModel/Ingredient";
import IngredientsTitleToolbar from "./IngredientsTitleToolbar";
import { sum } from "./utils";

type Props = {
  title: string;
  ingredientsPercentage: Ingredients;
  ingredientsWeight: Ingredients;
  totalWeightSubtract?: number;
};

export default function IngredientsWeightList({
  title,
  ingredientsPercentage,
  ingredientsWeight,
  totalWeightSubtract,
}: Props) {
  const totalWeight = sum(ingredientsWeight.values());
  let totalWeightStr: string | undefined;

  if (totalWeightSubtract) {
    totalWeightStr = `${numberToString(totalWeight)} - (${numberToString(totalWeightSubtract)}) = ${numberToString(totalWeight - totalWeightSubtract)}`;
  } else {
    totalWeightStr = numberToString(totalWeight);
  }

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} />
      <IonGrid>
        <IonRow>
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
        {[...ingredientsPercentage]
          .filter(([name]) => ingredientsWeight.has(name) && ingredientsWeight.get(name) !== 0)
          .map(([name, percentage], idx) => (
            <IonRow key={`${idx}-${name}`} className={idx % 2 === 0 ? "background-light" : undefined}>
              <IonCol className="ion-text-start">{name}</IonCol>
              <IonCol size="2" className="ion-text-end">
                {numberToString(percentage)}
              </IonCol>
              <IonCol className="ion-text-end">
                {numberToString(ingredientsWeight.get(name)) || <IonText color="danger">ERROR !</IonText>}
              </IonCol>
            </IonRow>
          ))}
        <IonRow>
          <IonCol className="ion-text-start"></IonCol>
          <IonCol size="2" className="ion-text-end"></IonCol>
          <IonCol className="ion-text-end">{totalWeightStr || <IonText color="danger">ERROR !</IonText>}</IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
}

function numberToString(value: number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}
