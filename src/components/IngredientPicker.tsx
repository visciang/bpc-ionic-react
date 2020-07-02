import React, { useState } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { IngredientName } from "dataModel/Ingredient";
import { propsShallowCompare } from "components/utils";

type Props = {
  label: string;
  values: IngredientName[];
  onPick(value: IngredientName): void;
};

const Component: React.FC<Props> = ({ label, values, onPick }) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <IonItem lines="none" color="light">
      <IonLabel>{label}</IonLabel>
      <IonSelect
        disabled={values.length === 0}
        interface="popover"
        value={value}
        onIonChange={(e) => {
          if (!e.detail.value) return;

          onPick(e.detail.value);
          setValue(undefined);
        }}
      >
        {[...values].map((value) => (
          <IonSelectOption key={value} value={value}>
            {value}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

const IngredientPicker = React.memo(Component, (p: Props, n: Props) => propsShallowCompare(p, n, ["label", "values"]));
export default IngredientPicker;
