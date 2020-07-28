import React from "react";
import { IonAlert } from "@ionic/react";

type Props = {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

let InfoAlert: React.FC<Props> = ({ showAlert, setShowAlert }) => {
  const message = `
    <p>
      <a href="mailto:panificazionefavaglie@gmail.com?subject=BakerCalc">
        panificazionefavaglie@gmail.com
      </a>
    </p>
    <p style="text-align: center;">
      If you like the App<br/>support me with a beer!<br/>Thank you
    </p>
    <p style="width: auto; text-align: center;">
      <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=YWVFRGAC55UX4">
        <strong>PAYPAL DONATE</strong>
      </a>
    </p>
  `;

  return <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} header={"Info"} message={message} />;
};

export default InfoAlert = React.memo(InfoAlert);
