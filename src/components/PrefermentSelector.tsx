import React, { useCallback } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { SelectChangeEventDetail } from "@ionic/core";
import { PrefermentKind } from "dataModel/Preferment";

type Props = {
  value?: PrefermentKind;
  onSelect(prefermentType: PrefermentKind): void;
};

let PrefermentSelector: React.FC<Props> = ({ value, onSelect }) => {
  const onIonChange = useCallback(
    (event: CustomEvent<SelectChangeEventDetail>) => event.detail.value && onSelect(event.detail.value),
    [onSelect]
  );

  return (
    <IonItem lines="none" color="light">
      <IonLabel>Kind</IonLabel>
      <IonSelect interface="popover" value={value} onIonChange={onIonChange}>
        {Object.keys(PrefermentKind).map((value) => (
          <IonSelectOption key={value} value={value}>
            {value}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

export default PrefermentSelector = React.memo(PrefermentSelector);
