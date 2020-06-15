import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { ScaleBy } from "./Recipe";

type Props = {
  value: ScaleBy;
  onChange(scaleBy: ScaleBy): void;
};

const ScaleBySelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Scale by</IonLabel>
      <IonSelect interface="popover" value={value} onIonChange={(e) => onChange(e.detail.value)}>
        <IonSelectOption value={ScaleBy.DOUGH}>DOUGH</IonSelectOption>
        <IonSelectOption value={ScaleBy.FLOUR}>FLOUR</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default ScaleBySelector;
