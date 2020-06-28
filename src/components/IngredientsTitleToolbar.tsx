import React from "react";
import { IonTitle, IonToolbar, IonButton, IonIcon } from "@ionic/react";
import { useRecoilState } from "recoil";
import { trashOutline } from "ionicons/icons";
import * as State from "state/State";

type Props = {
  title: string;
  onDelete?(): void;
};

const IngredientsTitleToolbar: React.FC<Props> = ({ title, onDelete }) => {
  const [editable] = useRecoilState(State.editable);

  const deleteButton =
    editable && onDelete ? (
      <IonButton size="small" slot="end" onClick={onDelete} fill="clear">
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
    ) : undefined;

  return (
    <IonToolbar>
      <IonTitle className="ion-text-center">{title}</IonTitle>
      {deleteButton}
    </IonToolbar>
  );
};

export default IngredientsTitleToolbar;
