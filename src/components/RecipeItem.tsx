import React from "react";
import { IonLabel, IonItem, IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

type Props = {
  name: string;
  editable: boolean;
  onLoad(): void;
  onDelete(): void;
};

let RecipeItem: React.FC<Props> = ({ name, editable, onLoad, onDelete }) => {
  if (editable) {
    return (
      <IonItem>
        <IonLabel>{name}</IonLabel>
        <IonButton slot="end" onClick={onDelete} fill="clear">
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonButton>
      </IonItem>
    );
  } else {
    return (
      <IonItem button onClick={onLoad} routerLink="/overallTab" routerDirection="none" detail={false}>
        <IonLabel>{name}</IonLabel>
      </IonItem>
    );
  }
};

export default RecipeItem = React.memo(RecipeItem);
