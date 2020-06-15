import React from "react";
import { IonItem, IonLabel, IonInput, IonText, IonReorder, IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { IngredientName, IngredientValue } from "./Recipe";
import { onIonChangeFloat } from "./utils";

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
          inputMode="decimal"
          min="0"
          max={maxPercentage?.toString()}
          value={value}
          onIonChange={onIonChangeFloat((v) => onChange(name, v))}
        />
        <IonText>%</IonText>
      </IonItem>
    );
  }
};

export default IngredientsPercentageItem;
