import React from "react";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import produce from "immer";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import NewItemInput from "components/NewItemInput";
import IngredientsPercentageItem from "components/IngredientsPercentageItem";
import { IngredientName, Ingredients, IngredientValue } from "dataModel/Ingredient";

type Props = {
  title: string;
  ingredients: Ingredients;
  maxPercentage?: number;
  editable?: boolean;
  onIngredientsChange(ingredients: Ingredients): void;
};

const IngredientsPercentageList: React.FC<Props> = ({
  title,
  ingredients,
  maxPercentage,
  editable,
  onIngredientsChange,
}) => {
  const onIngredientChange = (name: IngredientName, value: IngredientValue) => {
    onIngredientsChange(
      produce(ingredients, (draft) => {
        draft.set(name, value);
      })
    );
  };

  const onIngredientReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedIngredients = [...ingredients];
    const movedIngredient = orderedIngredients[event.detail.from];

    orderedIngredients.splice(event.detail.from, 1);
    orderedIngredients.splice(event.detail.to, 0, movedIngredient);

    onIngredientsChange(new Map(orderedIngredients));

    event.detail.complete();
  };

  const onNewIngredient = (name: IngredientName) => {
    onIngredientsChange(
      produce(ingredients, (draft) => {
        draft.set(name, undefined);
      })
    );
  };

  const onDeleteIngredient = (name: IngredientName) => {
    onIngredientsChange(
      produce(ingredients, (draft) => {
        draft.delete(name);
      })
    );
  };

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} />
      <IonReorderGroup disabled={!editable} onIonItemReorder={onIngredientReorder}>
        {[...ingredients.entries()].map(([name, value]) => (
          <IngredientsPercentageItem
            key={name}
            name={name}
            value={value}
            maxPercentage={maxPercentage}
            reordable={true}
            onChange={onIngredientChange}
            onDelete={editable ? onDeleteIngredient : undefined}
          />
        ))}
      </IonReorderGroup>
      <NewItemInput onNewItem={onNewIngredient} />
    </IonList>
  );
};

export default IngredientsPercentageList;
