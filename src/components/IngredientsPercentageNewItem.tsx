import React, { useState } from "react";
import { IonItem, IonInput, IonButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { IngredientName } from "./Recipe";

type Props = {
  onNewIngredient(name: IngredientName): void;
};

const IngredientsPercentageNewItem: React.FC<Props> = ({ onNewIngredient }) => {
  const [newIngredientName, setNewIngredientName] = useState<string | undefined>(undefined);

  const onClick = () => {
    onNewIngredient(newIngredientName!);
    setNewIngredientName(undefined);
  };

  return (
    <IonItem key="__new__">
      <IonInput
        required={true}
        type="text"
        placeholder="New ..."
        value={newIngredientName}
        onIonChange={(e) => setNewIngredientName(parseNewIngredientName(e.detail.value))}
      />
      <IonButton onClick={onClick} fill="clear" disabled={!newIngredientName}>
        <IonIcon slot="icon-only" icon={addOutline} />
      </IonButton>
    </IonItem>
  );
};

const parseNewIngredientName = (value: string | undefined | null) => {
  return value?.trim() ? value.trim() : undefined;
};

export default IngredientsPercentageNewItem;
