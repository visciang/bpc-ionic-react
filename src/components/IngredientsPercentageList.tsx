import { ItemReorderEventDetail } from "@ionic/core";
import { IonList, IonReorderGroup } from "@ionic/react";
import { useCallback } from "react";
import { IngredientName, Ingredients, IngredientValue } from "../dataModel/Ingredient";
import IngredientPercentageItem from "./IngredientPercentageItem";
import IngredientsTitleToolbar from "./IngredientsTitleToolbar";
import NewItemInput from "./NewItemInput";
import { mapMoveIdx, mapDelete, mapSet } from "./utils";

type Props = {
  title: string;
  ingredients: Ingredients;
  maxPercentage?: number;
  editable: boolean;
  onIngredientsChange(ingredients: Ingredients): void;
};

export default function IngredientsPercentageList({
  title,
  ingredients,
  maxPercentage,
  editable,
  onIngredientsChange,
}: Props) {
  const onIngredientChange = useCallback(
    (name: IngredientName, value: IngredientValue) => {
      onIngredientsChange(mapSet(ingredients, name, value));
    },
    [ingredients, onIngredientsChange],
  );

  const onIngredientReorder = useCallback(
    (event: CustomEvent<ItemReorderEventDetail>) => {
      onIngredientsChange(mapMoveIdx(ingredients, event.detail.from, event.detail.to));
      event.detail.complete();
    },
    [ingredients, onIngredientsChange],
  );

  const onNewIngredient = useCallback(
    (name: IngredientName) => {
      onIngredientsChange(mapSet(ingredients, name, undefined));
    },
    [ingredients, onIngredientsChange],
  );

  const onDeleteIngredient = useCallback(
    (name: IngredientName) => {
      onIngredientsChange(mapDelete(ingredients, name));
    },
    [ingredients, onIngredientsChange],
  );

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} />
      <IonReorderGroup disabled={!editable} onIonItemReorder={onIngredientReorder}>
        {[...ingredients].map(([name, value]) => (
          <IngredientPercentageItem
            key={name}
            name={name}
            value={value}
            maxPercentage={maxPercentage}
            editable={editable}
            onChange={onIngredientChange}
            onDelete={onDeleteIngredient}
          />
        ))}
      </IonReorderGroup>
      <NewItemInput onNewItem={onNewIngredient} />
    </IonList>
  );
}
