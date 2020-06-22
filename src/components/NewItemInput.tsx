import React, { useState } from "react";
import { IonItem, IonInput, IonButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";

type Props = {
  onNewItem?(name: string): void;
};

const NewItemInput: React.FC<Props> = ({ onNewItem }) => {
  const [newItem, setNewItem] = useState<string | undefined>(undefined);

  const onClick = () => {
    onNewItem!(newItem!);
    setNewItem(undefined);
  };

  return (
    <IonItem lines="none">
      <IonInput
        required={true}
        type="text"
        placeholder="New ..."
        value={newItem}
        onIonChange={(e) => setNewItem(parseNewItem(e.detail.value))}
      />
      <IonButton onClick={onClick} fill="clear" disabled={!(newItem && onNewItem !== undefined)}>
        <IonIcon slot="icon-only" icon={addOutline} />
      </IonButton>
    </IonItem>
  );
};

const parseNewItem = (value: string | undefined | null) => {
  return value?.trim() ? value.trim() : undefined;
};

export default NewItemInput;
