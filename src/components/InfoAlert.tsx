import React from "react";
import { IonAlert } from "@ionic/react";
import donate from "assets/img/donate.gif";
import { version } from "../../package.json";

type Props = {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

let InfoAlert: React.FC<Props> = ({ showAlert, setShowAlert }) => {
  const message = `
    <div class="ion-text-center">
      <p>
        <a href="mailto:panificazionefavaglie@gmail.com?subject=BakerCalc">
          Info mail
        </a>
      </p>
      <p>
        If you like the App<br/>support me with a beer!<br/>Thank you
      </p>
      <p>
        <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=YWVFRGAC55UX4">
        <img src=${donate}>
        </a>
      </p>
    </div>
  `;

  return <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} header={`Info - v${version}`} message={message} />;
};

export default InfoAlert = React.memo(InfoAlert);
