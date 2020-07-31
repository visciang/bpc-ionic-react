import React, { useState, useCallback } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { saveOutline, pencilOutline, informationCircleOutline, refreshOutline } from "ionicons/icons";
import InfoAlert from "components/InfoAlert";

type Props = {
  title: string;
  editActive?: boolean;
  showInfo?: boolean;
  onEditToggle?(): void;
  onSave?(): void;
  onReset?(): void;
};

const Tab: React.FC<Props> = ({ title, editActive, onEditToggle, onSave, onReset, showInfo, children }) => {
  const [showInfoAlert, setShowInfoAlert] = useState(false);

  const onInfo = useCallback(() => setShowInfoAlert(true), [setShowInfoAlert]);

  const editButton = onEditToggle ? (
    <IonButton color="dark" fill={editActive ? "solid" : undefined} onClick={onEditToggle}>
      <IonIcon icon={pencilOutline} />
    </IonButton>
  ) : undefined;

  const saveButton = onSave ? (
    <IonButton color="dark" routerLink="/recipes" onClick={onSave}>
      <IonIcon icon={saveOutline} />
    </IonButton>
  ) : undefined;

  const infoButton = showInfo ? (
    <IonButton color="dark" onClick={onInfo}>
      <IonIcon icon={informationCircleOutline} />
    </IonButton>
  ) : undefined;

  const resetButton = onReset ? (
    <IonButton color="dark" onClick={onReset}>
      <IonIcon icon={refreshOutline} />
    </IonButton>
  ) : undefined;

  const infoAlert = showInfo ? <InfoAlert showAlert={showInfoAlert} setShowAlert={setShowInfoAlert} /> : undefined;

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color="toolbar">
          <IonButtons slot="start">
            {infoButton}
            {resetButton}
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
        {infoAlert}
        {children}
      </IonContent>
    </IonPage>
  );
};

export default Tab;
