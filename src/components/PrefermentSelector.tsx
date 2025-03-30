import { SelectChangeEventDetail } from "@ionic/core";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { PrefermentKind } from "dataModel/Preferment";
import { useCallback } from "react";

type Props = {
  value?: PrefermentKind;
  onSelect(prefermentType: PrefermentKind): void;
};

export default function PrefermentSelector({ value, onSelect }: Props) {
  const onIonChange = useCallback(
    (event: CustomEvent<SelectChangeEventDetail>) => event.detail.value && onSelect(event.detail.value),
    [onSelect],
  );

  return (
    <IonItem lines="none">
      <IonLabel>Kind</IonLabel>
      <IonSelect labelPlacement="end" interface="popover" value={value} onIonChange={onIonChange}>
        {Object.keys(PrefermentKind).map((value) => (
          <IonSelectOption key={value} value={value}>
            {value}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
}
