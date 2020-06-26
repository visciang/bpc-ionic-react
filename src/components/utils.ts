import { InputChangeEventDetail } from "@ionic/core";
import { IngredientValue } from "dataModel/Ingredient";

type OnIonChange = (value: CustomEvent<InputChangeEventDetail>) => void;
type OnChangeFloat = (value?: number) => void;

export const onIonChangeFloat = (onChangeFloat: OnChangeFloat): OnIonChange => {
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
};

export const sum = (...iterables: Iterable<IngredientValue>[]): NonNullable<IngredientValue> => {
  let s = 0;

  for (let iterable of iterables) {
    for (let n of iterable) {
      s += n || 0;
    }
  }

  return s;
};

export const propsShallowCompare = <T, K extends keyof T>(prevProps: T, nextProps: T, props: K[]): boolean => {
  for (let prop of props) {
    if (prevProps[prop] !== nextProps[prop]) {
      return false;
    }
  }
  return true;
};
