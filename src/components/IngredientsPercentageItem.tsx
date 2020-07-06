import React from "react";
import { IonItem, IonLabel, IonInput, IonText, IonButton, IonIcon, IonReorder } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { onIonChangeFloat } from "components/utils";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";

type Props = {
  name: IngredientName;
  value: IngredientValue;
  maxPercentage?: number;
  reordable?: boolean;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete?(name: IngredientName): void;
};

const IngredientsPercentageItem: React.FC<Props> = ({ name, value, maxPercentage, onChange, onDelete }) => {
  if (onDelete) {
    return (
      <IonItem>
        <IonLabel>{name}</IonLabel>
        <IonButton slot="end" onClick={() => onDelete(name)} fill="clear">
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonButton>
        <IonReorder slot="end" className="ion-no-margin" />
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
