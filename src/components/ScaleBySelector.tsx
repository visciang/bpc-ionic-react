import React, { useCallback } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { SelectChangeEventDetail } from "@ionic/core";
import { ScaleBy } from "dataModel/Recipe";

type Props = {
  onSelect(scaleBy: ScaleBy): void;
};

let ScaleBySelector: React.FC<Props> = ({ onSelect }) => {
  const onIonChange = useCallback((event: CustomEvent<SelectChangeEventDetail>) => onSelect(event.detail.value), [
    onSelect,
  ]);

  return (
    <IonItem lines="none" color="light">
      <IonLabel>Scale by</IonLabel>
      <IonSelect interface="popover" onIonChange={onIonChange}>
        {Object.keys(ScaleBy).map((value) => (
          <IonSelectOption key={value} value={value}>
            {value}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

export default ScaleBySelector = React.memo(ScaleBySelector);
