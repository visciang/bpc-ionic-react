import React from "react";
import { IonButton } from "@ionic/react";

type Prop = {
  onClick(): void;
};

const Calculate: React.FC<Prop> = ({ onClick }) => {
  return (
    <IonButton size="large" expand="full" onClick={onClick}>
      Calculate
    </IonButton>
  );
};

export default Calculate;
