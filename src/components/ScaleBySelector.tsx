import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { ScaleBy } from "./dataModel/Recipe";

type Props = {
  value: ScaleBy;
  onChange(scaleBy: ScaleBy): void;
};

const ScaleBySelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Scale by</IonLabel>
      <IonSelect interface="popover" value={value} onIonChange={(e) => onChange(e.detail.value)}>
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
