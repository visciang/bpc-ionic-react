import { useState, useCallback } from "react";
import { IonItem, IonInput, IonButton, IonIcon } from "@ionic/react";
import { IonInputCustomEvent, InputInputEventDetail } from "@ionic/core";
import { addOutline } from "ionicons/icons";

type Props = {
  onNewItem?(name: string): void;
};

export default function NewItemInput({ onNewItem }: Props) {
  const [newItem, setNewItem] = useState<string | undefined>(undefined);

  const onClick = useCallback(() => {
    onNewItem!(newItem!);
    setNewItem(undefined);
  }, [newItem, onNewItem, setNewItem]);

  const onIonInput = useCallback((event: IonInputCustomEvent<InputInputEventDetail>) => {
    setNewItem(parseNewItem(event.detail.value));
  }, [setNewItem]);

  return (
    <IonItem lines="none">
      <IonInput required type="text" placeholder="New ..." value={newItem} onIonInput={onIonInput} />
      <IonButton
        className="ion-no-padding"
        onClick={onClick}
        fill="clear"
        disabled={!(newItem && onNewItem)}>
        <IonIcon slot="icon-only" icon={addOutline} />
      </IonButton>
    </IonItem>
  );
}

function parseNewItem(value: string | undefined | null) {
  return value?.trim() ? value.trim() : undefined;
}

