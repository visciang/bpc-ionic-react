import React from "react";
import { IonList, IonReorderGroup, IonReorder } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import { OrderedMap, List } from "immutable";
import IngredientsTitleToolbar from "./IngredientsTitleToolbar";
import NewItem from "./NewItem";
import IngredientsPercentageItem from "./IngredientsPercentageItem";
import { IngredientName, Ingredients, IngredientValue } from "./dataModel/Ingredient";

type Props = {
  title: string;
  ingredients: Ingredients;
  maxPercentage?: number;
  editable: boolean;
  onIngredientsChange(ingredients: Ingredients): void;
};

const IngredientsPercentage: React.FC<Props> = ({
  title,
  ingredients,
  maxPercentage,
  editable,
  onIngredientsChange,
}) => {
  const onIngredientChange = (name: IngredientName, value: IngredientValue) => {
    onIngredientsChange(ingredients.set(name, value));
  };

  const onIngredientReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedIngredients = List(ingredients);
    const movedIngredient = orderedIngredients.get(event.detail.from)!;
    orderedIngredients = orderedIngredients.remove(event.detail.from).insert(event.detail.to, movedIngredient);
    onIngredientsChange(OrderedMap(orderedIngredients));

    event.detail.complete();
  };

  const onNewIngredient = (name: IngredientName) => {
    onIngredientsChange(ingredients.set(name, undefined));
  };

  const onDeleteIngredient = (name: IngredientName) => {
    onIngredientsChange(ingredients.delete(name));
  };

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} />
      <IonReorderGroup disabled={!editable} onIonItemReorder={onIngredientReorder}>
        {[...ingredients.entries()].map(([name, value]) => {
          return (
            <IngredientsPercentageItem
              key={name}
              name={name}
              value={value}
              maxPercentage={maxPercentage}
              onChange={onIngredientChange}
              onDelete={editable ? onDeleteIngredient : undefined}
            >
              <IonReorder slot="end" />
            </IngredientsPercentageItem>
          );
        })}
      </IonReorderGroup>
      <NewItem onNewItem={onNewIngredient} />
    </IonList>
  );
};

export default IngredientsPercentage;
