import { InputChangeEventDetail } from "@ionic/core";
import { IngredientValue, IngredientName, Ingredients } from "dataModel/Ingredient";

type OnIonChange = (value: CustomEvent<InputChangeEventDetail>) => void;
type OnChangeFloat = (value?: number) => void;

export const onIonChangeFloat = (previousValue: number | undefined, onChangeFloat: OnChangeFloat): OnIonChange => {
  return (event: CustomEvent<InputChangeEventDetail>): void => {
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

export const equals = (ingredientsA: IngredientName[], ingredientsB: IngredientName[]): boolean => {
  return ingredientsA.length === ingredientsB.length && ingredientsA.every((elm) => ingredientsB.includes(elm));
};

// TODO difference(ingredientsA: IngredientName[], ingredientsB: IngredientName[]): void

export const deleteIngredient = (ingredients: Ingredients, name: IngredientName) => {
  let newIngredients = new Map(ingredients);
  newIngredients.delete(name);
  return newIngredients;
};

export const reorderIngredients = (ingredients: Ingredients, fromIdx: number, toIdx: number) => {
  let orderedIngredients = [...ingredients];
  const movedIngredient = orderedIngredients[fromIdx];

  orderedIngredients.splice(fromIdx, 1);
  orderedIngredients.splice(toIdx, 0, movedIngredient);

  return new Map(orderedIngredients);
};
