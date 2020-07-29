import { InputChangeEventDetail } from "@ionic/core";
import { IngredientValue } from "dataModel/Ingredient";

type OnIonChange = (value: CustomEvent<InputChangeEventDetail>) => void;
type OnChangeFloat = (value?: number) => void;

export const onIonChangeFloat = (previousValue: number | undefined, onChangeFloat: OnChangeFloat): OnIonChange => {
  return (event: CustomEvent<InputChangeEventDetail>) => {
    if (event.detail.value?.endsWith(",") || event.detail.value?.endsWith(".")) {
      return;
    }

    let newValue: number | undefined = undefined;

    if (!event.detail.value) {
      newValue = undefined;
    } else {
      newValue = parseFloat(event.detail.value.replace(",", "."));
    }

    if (newValue !== previousValue) {
      onChangeFloat(newValue);
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

export const listEquals = <T>(listA: T[], listB: T[]): boolean => {
  if (listA.length !== listB.length) return false;

  for (let idx = 0; idx < listA.length; idx++) {
    for (let jdx = 0; jdx < listB.length; jdx++) {
      if (listA[idx] !== listB[jdx]) return false;
    }
  }

  return true;
};

export const mapDelete = <K, V>(map: Map<K, V>, key: K): Map<K, V> => {
  let newMap = new Map(map);
  newMap.delete(key);
  return newMap;
};

export const mapMove = <K, V>(map: Map<K, V>, keyAtIdx: number, toIdx: number): Map<K, V> => {
  let orderedKVPairs = [...map];
  const movedKVPair = orderedKVPairs[keyAtIdx];

  orderedKVPairs.splice(keyAtIdx, 1);
  orderedKVPairs.splice(toIdx, 0, movedKVPair);

  return new Map(orderedKVPairs);
};
