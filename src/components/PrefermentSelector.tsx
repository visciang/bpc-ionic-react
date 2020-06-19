import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { PrefermentKind } from "./dataModel/Preferment";

type Props = {
  value: PrefermentKind;
  onChange(prefermentType: PrefermentKind): void;
};

const PrefermentSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Kind</IonLabel>
      <IonSelect interface="popover" value={value} onIonChange={(e) => onChange(e.detail.value)}>
        <IonSelectOption value={PrefermentKind.PREDOUGH}>{PrefermentKind.PREDOUGH}</IonSelectOption>
        <IonSelectOption value={PrefermentKind.SOURDOUGH}>{PrefermentKind.SOURDOUGH}</IonSelectOption>
      </IonSelect>
    </IonItem>
  );
};

export default PrefermentSelector;
