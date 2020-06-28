import React from "react";
import { IonItem, IonLabel, IonInput, IonText, IonButton, IonIcon, IonReorder } from "@ionic/react";
import { useRecoilState } from "recoil";
import { trashOutline } from "ionicons/icons";
import { onIonChangeFloat } from "components/utils";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";
import * as State from "state/State";

type Props = {
  name: IngredientName;
  value: IngredientValue;
  maxPercentage?: number;
  reordable?: boolean;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete?(name: IngredientName): void;
};

const IngredientsPercentageItem: React.FC<Props> = ({ name, value, maxPercentage, onChange, onDelete }) => {
  const [editable] = useRecoilState(State.editable);

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
          onIonChange={onIonChangeFloat((v) => onChange(name, v))}
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

export default IngredientsPercentageItem;
