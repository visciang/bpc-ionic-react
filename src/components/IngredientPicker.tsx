import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { IngredientName } from "dataModel/Ingredient";
import { useState } from "react";

type Props = {
  label: string;
  values: IngredientName[];
  onPick(value: IngredientName): void;
};

export default function IngredientPicker({ label, values, onPick }: Props) {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <IonItem lines="none">
      <IonLabel>{label}</IonLabel>
      <IonSelect
        labelPlacement="end"
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
}
