import React from "react";
import { IonTitle, IonToolbar } from "@ionic/react";

type Props = {
  title: string;
};

const IngredientsPercentageToolbar: React.FC<Props> = ({ title }) => {
  return (
    <IonToolbar>
      <IonTitle className="ion-text-center">{title}</IonTitle>
    </IonToolbar>
  );
};

export default IngredientsPercentageToolbar;
