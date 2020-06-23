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
  editActive?: boolean;
  onEditToggle?(): void;
};

const Tab: React.FC<Props> = ({ title, editActive, onEditToggle, children }) => {
  const editButton = onEditToggle ? (
    <IonButtons slot="end">
      <IonButton fill={editActive ? "solid" : undefined} onClick={onEditToggle}>
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

export default Tab;
