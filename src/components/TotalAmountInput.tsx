import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import { onIonChangeFloat } from "components/utils";

const INPUT_DEBOUNCE_MS = 300;

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
        debounce={INPUT_DEBOUNCE_MS}
      />
      <IonText>g</IonText>
    </IonItem>
  );
}
