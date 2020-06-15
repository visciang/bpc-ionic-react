import { InputChangeEventDetail } from "@ionic/core";

type OnIonChange = (value: CustomEvent<InputChangeEventDetail>) => void;
type OnChangeFloat = (value: number | undefined) => void;

export function onIonChangeFloat(onChangeFloat: OnChangeFloat): OnIonChange {
  return (event: CustomEvent<InputChangeEventDetail>): void => {
    if (event.detail.value?.endsWith(",") || event.detail.value?.endsWith(".")) {
      return;
    }

    if (!event.detail.value) {
      return onChangeFloat(undefined);
    } else {
      return onChangeFloat(parseFloat(event.detail.value.replace(",", ".")));
    }
  };
}
