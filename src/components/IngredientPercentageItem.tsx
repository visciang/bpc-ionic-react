import React, { useCallback } from "react";
import { IonItem, IonLabel, IonInput, IonText, IonButton, IonIcon, IonReorder } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { onIonChangeFloat } from "components/utils";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";

type Props = {
  name: IngredientName;
  value: IngredientValue;
  maxPercentage?: number;
  editable: boolean;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete?(name: IngredientName): void;
};

let IngredientPercentageItem: React.FC<Props> = ({ name, value, maxPercentage, editable, onChange, onDelete }) => {
  const onIonChange = useCallback(
    onIonChangeFloat(value, (v) => onChange(name, v)),
    [name, value, onChange]
  );

  let children: JSX.Element = <></>;

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
          type="number"
          inputMode="decimal"
          min="0"
          max={maxPercentage?.toString()}
          value={value}
          onIonChange={onIonChange}
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
};

export default IngredientPercentageItem = React.memo(IngredientPercentageItem);
