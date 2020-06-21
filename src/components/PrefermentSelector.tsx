import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { PrefermentKind } from "dataModel/Preferment";

type Props = {
  value: PrefermentKind;
  onChange(prefermentType: PrefermentKind): void;
};

const PrefermentSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Kind</IonLabel>
      <IonSelect interface="popover" value={value} onIonChange={(e) => onChange(e.detail.value)}>
        {Object.keys(PrefermentKind).map((value) => (
          <IonSelectOption key={value} value={value}>
            {value}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

export default PrefermentSelector;
