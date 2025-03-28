import React from "react";
import { IonAlert, IonicSafeString } from "@ionic/react";
import donate from "../assets/img/donate.gif";
import { version } from "../../package.json";

type Props = {
  isOpen: boolean;
  onDidDismiss(): void;
};

export default function InfoAlert({ isOpen, onDidDismiss }: Props) {
  const message = new IonicSafeString(`
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
  `);

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      header={`Info - v${version}`}
      message={message}
    />
  );
};
