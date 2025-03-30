import { IonAlert, IonicSafeString } from "@ionic/react";
import { version } from "../../package.json";
import donate from "../assets/img/donate.gif";

const gitSHA = import.meta.env.VITE_GIT_SHA || "development";

type Props = {
  isOpen: boolean;
  onDidDismiss(): void;
};

export default function InfoAlert({ isOpen, onDidDismiss }: Props) {
  const message = new IonicSafeString(`
    <div class="ion-text-center">
      <p>
        <strong>Version</strong>: ${version} (${gitSHA.substring(0, 7)})
      </p>
      <p>
        <a href="mailto:panificazionefavaglie@gmail.com?subject=BakerCalc">
          Info mail
        </a>
      </p>
      <p>
        If you like the App<br/>support me with a beer!<br/>Thank you
      </p>
      <p>
        <a href="https://www.paypal.com/ncp/payment/MW65J8LXXJ8S4">
        <img src=${donate}>
        </a>
      </p>
    </div>
  `);

  return <IonAlert isOpen={isOpen} onDidDismiss={onDidDismiss} header={"About B%C"} message={message} />;
}
