import { IonInputCustomEvent, InputInputEventDetail } from "@ionic/core";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonReorder } from "@ionic/react";
import { onIonChangeFloat } from "components/utils";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";
import { trashOutline } from "ionicons/icons";
import { useCallback } from "react";

const PERCENTAGE_INPUT_DEBOUNCE_MS = 300;

type Props = {
  name: IngredientName;
  value: IngredientValue;
  editable: boolean;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete?(name: IngredientName): void;
};

export default function IngredientPercentageItem({ name, value, editable, onChange, onDelete }: Props) {
  const onIonInput = useCallback(
    (e: IonInputCustomEvent<InputInputEventDetail>) => onIonChangeFloat(value, (v) => onChange(name, v))(e),
    [name, value, onChange],
  );

  let children = <></>;

  if (editable) {
    if (onDelete) {
      children = (
        <>
          <IonButton slot="end" onClick={() => onDelete(name)} fill="clear">
            <IonIcon slot="icon-only" icon={trashOutline} />
          </IonButton>
          <IonReorder slot="end" className="ion-no-margin" />
        </>
      );
    }
  } else {
    children = (
      <IonInput
        slot="end"
        className="ion-text-right"
        // Safari does not support `type="number"` (it makes mess with the input value)
        type="text"
        inputMode="decimal"
        value={value}
        placeholder="..."
        onIonInput={onIonInput}
        debounce={PERCENTAGE_INPUT_DEBOUNCE_MS}
      />
    );
  }

  return (
    <IonItem lines="none">
      <IonLabel slot="start">{name}</IonLabel>
      {children}
    </IonItem>
  );
}
