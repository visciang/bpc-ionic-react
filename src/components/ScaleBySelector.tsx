import { SelectChangeEventDetail } from "@ionic/core";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { ScaleBy } from "dataModel/Recipe";
import { useCallback } from "react";

type Props = {
  onSelect(scaleBy: ScaleBy): void;
};

export default function ScaleBySelector({ onSelect }: Props) {
  const onIonChange = useCallback(
    (event: CustomEvent<SelectChangeEventDetail>) => onSelect(event.detail.value),
    [onSelect],
  );

  return (
    <IonItem lines="none">
      <IonLabel>Scale by</IonLabel>
      <IonSelect labelPlacement="end" interface="popover" onIonChange={onIonChange}>
        {Object.keys(ScaleBy).map((value) => (
          <IonSelectOption key={value} value={value}>
            {value}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
}
