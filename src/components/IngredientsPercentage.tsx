import React from "react";
import { IonList, IonItem, IonLabel, IonListHeader } from "@ionic/react";
import { Ingredient } from "./Recipe";
import "./IngredientsPercentage.css";

interface Props {
  title: string;
  ingredients: Ingredient[];
}

const IngredientsPercentage: React.FC<Props> = ({ title, ingredients }) => {
  return (
    <IonList lines="none">
      <IonListHeader lines="inset">
        <IonLabel className="title ion-text-center">{title}</IonLabel>
      </IonListHeader>
      {ingredients.map((ingredient) => (
        <IonItem>
          <IonLabel>{ingredient.name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default IngredientsPercentage;
