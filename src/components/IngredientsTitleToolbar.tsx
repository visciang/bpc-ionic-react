import React from "react";
import { useRecoilValue } from "recoil";
import { IonTitle, IonToolbar, IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import * as State from "state/State";
import { propsShallowCompare } from "components/utils";

type Props = {
  title: string;
  onDelete?(): void;
};

const Component: React.FC<Props> = ({ title, onDelete }) => {
  const editable = useRecoilValue(State.editable);

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

const IngredientsTitleToolbar = React.memo(Component, (p: Props, n: Props) => propsShallowCompare(p, n, []));
export default IngredientsTitleToolbar;
