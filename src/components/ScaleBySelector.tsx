import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
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
    <IonSegment value={value} onIonChange={onChange}>
      <IonSegmentButton value={ScaleBy.DOUGH}>
        <IonLabel>Dough</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={ScaleBy.FLOUR}>
        <IonLabel>Flour</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
}
