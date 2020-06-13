import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";

type Props = {
  title: string;
};

const FormulaTab: React.FC<Props> = ({ title, children }) => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
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
