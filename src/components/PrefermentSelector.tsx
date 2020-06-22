import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { PrefermentKind } from "dataModel/Preferment";

type Props = {
  value?: PrefermentKind;
  onSelect(prefermentType: PrefermentKind): void;
};

const PrefermentSelector: React.FC<Props> = ({ value, onSelect: onChange }) => {
  return (
    <IonItem lines="none">
      <IonLabel>Kind</IonLabel>
      <IonSelect
        interface="popover"
        value={value}
        onIonChange={(e) => {
          if (e.detail.value) onChange(e.detail.value);
        }}
      >
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
