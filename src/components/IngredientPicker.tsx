import React, { useState } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { IngredientName } from "dataModel/Ingredient";

type Props = {
  label: string;
  values: IngredientName[];
  onPick(value: IngredientName): void;
};

let IngredientPicker: React.FC<Props> = ({ label, values, onPick }) => {
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

export default IngredientPicker = React.memo(IngredientPicker);
