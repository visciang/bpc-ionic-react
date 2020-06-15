import React from "react";
import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import { onIonChangeFloat } from "./utils";

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
        inputMode="decimal"
        min="0"
        value={value}
        onIonChange={onIonChangeFloat((v) => onChange(v))}
      />
      <IonText>g</IonText>
    </IonItem>
  );
};

export default TotalAmount;
