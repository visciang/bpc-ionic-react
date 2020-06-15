import React from "react";
import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";

type Props = {
  value: number | undefined;
  onChange(value: number | undefined): void;
};

const TotalAmount: React.FC<Props> = ({ value, onChange }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Total amount</IonLabel>
      <IonInput
        className="ion-padding-horizontal ion-text-right"
        type="number"
        min="0"
        value={value}
        onIonChange={(e) => onChange(parseTotalAmount(e.detail.value))}
      />
      <IonText>g</IonText>
    </IonItem>
  );
};

const parseTotalAmount = (value: string | undefined | null) => {
  return value ? parseFloat(value) : undefined;
};

export default TotalAmount;
