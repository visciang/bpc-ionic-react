import React from "react";
import { IonList, IonItem, IonLabel, IonListHeader, IonInput, IonText } from "@ionic/react";
import { Ingredient } from "./Recipe";
import "./IngredientsPercentage.css";

interface Props {
  title: string;
  ingredients: Ingredient[];
  maxPercentage?: number;
}

const IngredientsPercentage: React.FC<Props> = ({ title, ingredients, maxPercentage }) => {
  return (
    <IonList lines="none">
      <IonListHeader lines="inset" className="ion-no-padding">
        <IonLabel className="title ion-text-center">{title}</IonLabel>
      </IonListHeader>
      {ingredients.map((ingredient) => (
        <IonItem key={ingredient.name}>
          <IonLabel>{ingredient.name}</IonLabel>
          <IonInput
            className="ion-text-right"
            value={ingredient.value}
            type="number"
            min="0"
            max={maxPercentage?.toString()}
          ></IonInput>
          <IonText class="ion-padding-start">%</IonText>
        </IonItem>
      ))}
    </IonList>
  );
};

export default IngredientsPercentage;
