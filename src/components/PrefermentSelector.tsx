import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { PrefermentKind } from "./Recipe";

type Props = {
  value: PrefermentKind;
  onChange(prefermentType: PrefermentKind): void;
};

const PrefermentSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Type of preferment</IonLabel>
      <IonSelect interface="popover" value={value} onIonChange={(e) => onChange(e.detail.value)}>
        <IonSelectOption value={PrefermentKind.YEAST}>{PrefermentKind.YEAST}</IonSelectOption>
        <IonSelectOption value={PrefermentKind.SOURDOUGH}>{PrefermentKind.SOURDOUGH}</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default PrefermentSelector;
