import { IonLabel, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { ScaleBy } from "dataModel/Recipe";
import { useCallback } from "react";

type Props = {
  onSelect: (value: ScaleBy) => void;
  value?: ScaleBy;
};

export default function ScaleBySelector({ onSelect, value }: Props) {
  const onChange = useCallback(
    (e: CustomEvent) => {
      onSelect(e.detail.value as ScaleBy);
    },
    [onSelect],
  );

  return (
    <IonItem lines="none">
      <IonLabel>Scale by</IonLabel>
      <IonSelect labelPlacement="end" interface="popover" onIonChange={onChange} value={value}>
        {Object.keys(ScaleBy).map((value) => (
          <IonSelectOption key={value} value={value}>
            {value}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
}
