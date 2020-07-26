import React, { useState, useCallback } from "react";
import { IonItem, IonInput, IonButton, IonIcon } from "@ionic/react";
import { InputChangeEventDetail } from "@ionic/core";
import { addOutline } from "ionicons/icons";

type Props = {
  onNewItem?(name: string): void;
};

let NewItemInput: React.FC<Props> = ({ onNewItem }) => {
  const [newItem, setNewItem] = useState<string | undefined>(undefined);

  const onClick = useCallback(() => {
    onNewItem!(newItem!);
    setNewItem(undefined);
  }, [newItem, onNewItem, setNewItem]);

  const onIonChange = useCallback(
    (event: CustomEvent<InputChangeEventDetail>) => {
      setNewItem(parseNewItem(event.detail.value));
    },
    [setNewItem]
  );

  return (
    <IonItem lines="none">
      <IonInput required={true} type="text" placeholder="New ..." value={newItem} onIonChange={onIonChange} />
      <IonButton
        className="ion-no-padding"
        onClick={onClick}
        fill="clear"
        disabled={!(newItem && onNewItem !== undefined)}
      >
        <IonIcon slot="icon-only" icon={addOutline} />
      </IonButton>
    </IonItem>
  );
};

const parseNewItem = (value: string | undefined | null) => {
  return value?.trim() ? value.trim() : undefined;
};

export default NewItemInput = React.memo(NewItemInput);
