import { IonInputCustomEvent } from "@ionic/core";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonButton,
  IonIcon,
  IonReorder,
  InputInputEventDetail,
} from "@ionic/react";
import { onIonChangeFloat } from "components/utils";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";
import { trashOutline } from "ionicons/icons";
import { useCallback } from "react";

type Props = {
  name: IngredientName;
  value: IngredientValue;
  maxPercentage?: number;
  editable: boolean;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete?(name: IngredientName): void;
};

export default function IngredientPercentageItem({ name, value, maxPercentage, editable, onChange, onDelete }: Props) {
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
      <>
        <IonInput
          className="ion-padding-horizontal ion-text-right"
          // Safari does not support `type="number"` (it makes mess with the input value)
          type="text"
          inputMode="decimal"
          min="0"
          max={maxPercentage?.toString()}
          value={value}
          onIonInput={onIonInput}
        />
        <IonText>%</IonText>
      </>
    );
  }

  return (
    <IonItem>
      <IonLabel>{name}</IonLabel>
      {children}
    </IonItem>
  );
}
