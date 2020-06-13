import React from "react";
import { IonButton, IonIcon, IonTitle, IonToolbar, IonButtons } from "@ionic/react";
import { pencilOutline } from "ionicons/icons";

type Props = {
  title: string;
  onEditToggle(): void;
};

const IngredientsPercentageToolbar: React.FC<Props> = ({ title, onEditToggle }) => {
  return (
    <IonToolbar>
      <IonTitle>{title}</IonTitle>
      <IonButtons slot="end">
        <IonButton onClick={() => onEditToggle()} fill="clear">
          <IonIcon slot="icon-only" icon={pencilOutline} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default IngredientsPercentageToolbar;
