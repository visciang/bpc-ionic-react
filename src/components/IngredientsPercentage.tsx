import React, { useState } from "react";
import { IonList, IonItem, IonLabel, IonListHeader, IonInput, IonText, IonButton, IonIcon } from "@ionic/react";
import { Ingredients, IngredientName, IngredientValue } from "./Recipe";
import "./IngredientsPercentage.css";
import { addOutline } from "ionicons/icons";

type Props = {
  title: string;
  ingredients: Ingredients;
  maxPercentage?: number;
  onIngredientsChange(ingredients: Ingredients): void;
};

const IngredientsPercentage: React.FC<Props> = ({ title, ingredients, maxPercentage, onIngredientsChange }) => {
  const [newIngredientName, setNewIngredientName] = useState<string | undefined>(undefined);

  const onIngredientValueChange = (name: IngredientName, value: IngredientValue) => {
    onIngredientsChange(new Map([...ingredients, [name, value]]));
  };
  const onNewIngredientClick = () => {
    onIngredientsChange(new Map([...ingredients, [newIngredientName!, undefined]]));
    setNewIngredientName(undefined);
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
            type="number"
            min="0"
            max={maxPercentage?.toString()}
            value={value}
            onIonChange={(e) => onIngredientValueChange(name, parseIngredientValue(e.detail.value))}
          />
          <IonText class="ion-padding-start">%</IonText>
        </IonItem>
      ))}
      <IonItem key="__new__flour__">
        <IonInput
          required={true}
          type="text"
          placeholder="New ..."
          value={newIngredientName}
          onIonChange={(e) => setNewIngredientName(parseNewIngredientName(e.detail.value))}
        />
        <IonButton onClick={onNewIngredientClick} fill="clear" disabled={!newIngredientName}>
          <IonIcon slot="icon-only" icon={addOutline} />
        </IonButton>
      </IonItem>
    </IonList>
  );
};

const parseIngredientValue = (value: string | undefined | null) => {
  return value ? parseFloat(value) : undefined;
};

const parseNewIngredientName = (value: string | undefined | null) => {
  return value?.trim() ? value : undefined;
};

export default IngredientsPercentage;
