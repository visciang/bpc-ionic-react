import React from "react";
import { useRecoilState } from "recoil";
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
import { titleState, editableState } from "state/State";

type Props = {
  editVisible: boolean;
};

const Tab: React.FC<Props> = ({ editVisible, children }) => {
  const [title] = useRecoilState(titleState);
  const [editable, setEditable] = useRecoilState(editableState);

  const editButton = editVisible ? (
    <IonButtons slot="end">
      <IonButton fill={editable ? "solid" : undefined} onClick={() => setEditable(!editable)}>
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
          <IonTitle>{title}</IonTitle>
          {editButton}
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
