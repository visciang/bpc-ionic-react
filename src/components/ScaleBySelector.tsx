import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { ScaleBy } from "dataModel/Recipe";

type Props = {
  onSelect(scaleBy: ScaleBy): void;
};

const ScaleBySelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Scale by</IonLabel>
      <IonSelect interface="popover" onIonChange={(e) => onSelect(e.detail.value)}>
        {Object.keys(ScaleBy).map((value) => (
          <IonSelectOption key={value} value={value}>
            {value}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

export default ScaleBySelector;
