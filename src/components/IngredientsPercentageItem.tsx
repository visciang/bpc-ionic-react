import React from "react";
import { IonItem, IonLabel, IonInput, IonText, IonReorder, IonButton, IonIcon } from "@ionic/react";
import { IngredientName, IngredientValue } from "./Recipe";
import { trashOutline } from "ionicons/icons";

type Props = {
  name: IngredientName;
  value: IngredientValue;
  editable: boolean;
  maxPercentage?: number;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete(name: IngredientName): void;
};

const IngredientsPercentageItem: React.FC<Props> = ({ name, value, editable, maxPercentage, onChange, onDelete }) => {
  if (editable) {
    return (
      <IonItem>
        <IonLabel>{name}</IonLabel>
        <IonButton slot="end" onClick={() => onDelete(name)} fill="clear">
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonButton>
        <IonReorder slot="end" />
      </IonItem>
    );
  } else {
    return (
      <IonItem>
        <IonLabel>{name}</IonLabel>
        <IonInput
          className="ion-padding-horizontal ion-text-right"
          type="number"
          min="0"
          max={maxPercentage?.toString()}
          value={value}
          onIonChange={(e) => onChange(name, parseIngredientValue(e.detail.value))}
        />
        <IonText>%</IonText>
      </IonItem>
    );
  }
};

const parseIngredientValue = (value: string | undefined | null) => {
  return value ? parseFloat(value) : undefined;
};

export default IngredientsPercentageItem;
