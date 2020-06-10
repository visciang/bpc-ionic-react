import React from "react";
import { IonList, IonItem, IonLabel, IonListHeader, IonInput, IonText } from "@ionic/react";
import { Ingredients, IngredientName, IngredientValue } from "./Recipe";
import "./IngredientsPercentage.css";

type Props = {
  title: string;
  ingredients: Ingredients;
  maxPercentage?: number;
  onIngredientsChange(ingredients: Ingredients): void;
};

const IngredientsPercentage: React.FC<Props> = ({ title, ingredients, maxPercentage, onIngredientsChange }) => {
  const onIngredientValueChange = (name: IngredientName, value: IngredientValue) => {
    onIngredientsChange(new Map([...ingredients, [name, value]]));
  };

  return (
    <IonList lines="none">
      <IonListHeader lines="inset" className="ion-no-padding">
        <IonLabel className="title ion-text-center">{title}</IonLabel>
      </IonListHeader>
      {[...ingredients.entries()].map(([name, value]) => (
        <IonItem key={name}>
          <IonLabel>{name}</IonLabel>
          <IonInput
            className="ion-text-right"
            value={value}
            type="number"
            min="0"
            max={maxPercentage?.toString()}
            onIonChange={(e) => onIngredientValueChange(name, parseIngredientValue(e.detail.value))}
          />
          <IonText class="ion-padding-start">%</IonText>
        </IonItem>
      ))}
    </IonList>
  );
};

const parseIngredientValue = (value: string | undefined | null) => {
  return value ? parseFloat(value) : undefined;
};

export default IngredientsPercentage;
