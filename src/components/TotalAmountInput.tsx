import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import { onIonChangeFloat } from "./utils";

type Props = {
  value?: number;
  onChange(value?: number): void;
};

export default function TotalAmountInput({ value, onChange }: Props) {
  return (
    <IonItem lines="none">
      <IonLabel>Total amount</IonLabel>
      <IonInput
        className="ion-padding-horizontal ion-text-right"
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onIonInput={onIonChangeFloat(value, onChange)}
      />
      <IonText>g</IonText>
    </IonItem>
  );
}
