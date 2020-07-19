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
import { saveOutline, pencilOutline } from "ionicons/icons";

type Props = {
  title: string;
  editActive?: boolean;
  onEditToggle?(): void;
  onSave?(): void;
};

const Tab: React.FC<Props> = ({ title, editActive, onEditToggle, onSave, children }) => {
  const editButton = onEditToggle ? (
    <IonButton fill={editActive ? "solid" : undefined} onClick={onEditToggle}>
      <IonIcon icon={pencilOutline} />
    </IonButton>
  ) : undefined;

  const saveButton = onSave ? (
    <IonButton onClick={onSave}>
      <IonIcon icon={saveOutline} />
    </IonButton>
  ) : undefined;

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            {saveButton}
            {editButton}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense" className="ion-padding-bottom">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default Tab;
