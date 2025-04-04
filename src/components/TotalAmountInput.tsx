import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import { onIonChangeFloat } from "components/utils";

const INPUT_DEBOUNCE_MS = 300;

type Props = {
  items?: number;
  amount?: number;
  onChangeAmount(value?: number): void;
  onChangeItems(value?: number): void;
};

export default function TotalAmountInput({ items, amount, onChangeAmount, onChangeItems }: Props) {
  return (
    <IonItem lines="none">
      <IonLabel>Total amount</IonLabel>
      <IonInput
        className="ion-padding-horizontal ion-text-right"
        type="number"
        inputMode="numeric"
        min="1"
        placeholder="1"
        value={items}
        onIonInput={onIonChangeFloat(items, onChangeItems)}
        debounce={INPUT_DEBOUNCE_MS}
      />
      <IonText>x</IonText>
      <IonInput
        className="ion-padding-horizontal ion-text-right"
        type="number"
        inputMode="decimal"
        min="0"
        placeholder="..."
        value={amount}
        onIonInput={onIonChangeFloat(amount, onChangeAmount)}
        debounce={INPUT_DEBOUNCE_MS}
      />
      <IonText>g</IonText>
    </IonItem>
  );
}
