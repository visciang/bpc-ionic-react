import { IonInputCustomEvent, InputInputEventDetail } from "@ionic/core";
import { IngredientValue } from "../dataModel/Ingredient";

type OnIonChange = (event: IonInputCustomEvent<InputInputEventDetail>) => void;
type OnChangeFloat = (value?: number) => void;

export function onIonChangeFloat(previousValue: number | undefined, onChangeFloat: OnChangeFloat): OnIonChange {
  return (event) => {
    // if the value is not a valid float, clear the field (we can rely on <input type="numeric" /> validation)
    if (!event.detail.value || !/^[0-9]*[.,]?[0-9]*$/.test(event.detail.value)) {
      onChangeFloat(undefined);
      return;
    }

    // Normalize the value to a float (using . as the decimal separator)
    const value = parseFloat(event.detail.value!.replace(",", "."));

    if (value === previousValue) {
      return;
    }

    onChangeFloat(value);
  };
}

export function sum(...iterables: Iterable<IngredientValue>[]): NonNullable<IngredientValue> {
  let s = 0;

  for (const iterable of iterables) {
    for (const n of iterable) {
      s += n || 0;
    }
  }

  return s;
}

export function listEquals<T>(listA: T[], listB: T[]): boolean {
  if (listA.length !== listB.length) return false;

  for (let idx = 0; idx < listA.length; idx++) {
    if (listA[idx] !== listB[idx]) return false;
  }

  return true;
}

export function mapSet<K, V>(map: Map<K, V>, key: K, value: V): Map<K, V> {
  const newMap = new Map(map);
  newMap.set(key, value);
  return newMap;
}

export function mapDelete<K, V>(map: Map<K, V>, key: K): Map<K, V> {
  const newMap = new Map(map);
  newMap.delete(key);
  return newMap;
}

export function mapMove<K, V>(map: Map<K, V>, fromKey: K, toKey: K): Map<K, V> {
  const newMap = new Map(map);
  newMap.set(toKey, newMap.get(fromKey)!);
  newMap.delete(fromKey);
  return newMap;
}

export function mapMoveIdx<K, V>(map: Map<K, V>, keyAtIdx: number, toIdx: number): Map<K, V> {
  const orderedKVPairs = [...map];
  const movedKVPair = orderedKVPairs[keyAtIdx];

  orderedKVPairs.splice(keyAtIdx, 1);
  orderedKVPairs.splice(toIdx, 0, movedKVPair);

  return new Map(orderedKVPairs);
}
