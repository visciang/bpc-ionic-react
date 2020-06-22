import React from "react";
import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import { onIonChangeFloat } from "components/utils";

type Props = {
  value?: number;
  onChange(value?: number): void;
};

const TotalAmountInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Total amount</IonLabel>
      <IonInput
        className="ion-padding-horizontal ion-text-right"
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onIonChange={onIonChangeFloat(onChange)}
      />
      <IonText>g</IonText>
    </IonItem>
  );
};

export default TotalAmountInput;
