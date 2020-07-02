import React from "react";
import { IonItem, IonLabel, IonInput, IonText, IonButton, IonIcon, IonReorder } from "@ionic/react";
import { useRecoilValue } from "recoil";
import { trashOutline } from "ionicons/icons";
import { onIonChangeFloat, propsShallowCompare } from "components/utils";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";
import * as State from "state/State";

type Props = {
  name: IngredientName;
  value: IngredientValue;
  maxPercentage?: number;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete?(name: IngredientName): void;
};

const Component: React.FC<Props> = ({ name, value, maxPercentage, onChange, onDelete }) => {
  console.log(`IngredientsPercentageItem ${name}`);

  const editable = useRecoilValue(State.editable);

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

const IngredientsPercentageItem = React.memo(Component, (p: Props, n: Props) =>
  propsShallowCompare(p, n, ["name", "value", "maxPercentage"])
);
export default IngredientsPercentageItem;
