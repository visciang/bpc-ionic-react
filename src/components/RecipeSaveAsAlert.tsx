import React from "react";
import { IonAlert } from "@ionic/react";

type Props = {
  name: string;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  onSave(name: string): void;
};

let RecipeSaveAsAlert: React.FC<Props> = ({ name, showAlert, setShowAlert, onSave }) => {
  return (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      header={"Save recipe"}
      inputs={[
        {
          name: "name",
          type: "text",
          value: name,
        },
      ]}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Ok",
          handler: onSave,
        },
      ]}
    />
  );
};

export default RecipeSaveAsAlert = React.memo(RecipeSaveAsAlert);
