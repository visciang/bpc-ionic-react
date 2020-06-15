import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { pencil } from "ionicons/icons";

type Props = {
  title: string;
  onEditToggle?(): void;
};

const FormulaTab: React.FC<Props> = ({ title, onEditToggle, children }) => {
  const editButton = onEditToggle ? (
    <IonButtons slot="end">
      <IonButton onClick={() => onEditToggle()}>
        <IonIcon icon={pencil} />
      </IonButton>
    </IonButtons>
  ) : undefined;

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">{title}</IonTitle>
          {editButton}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense" className="ion-padding-bottom">
          <IonToolbar>
            <IonTitle className="ion-text-center" size="large">
              {title}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default FormulaTab;
