import React from "react";
import { IonList, IonReorderGroup, IonReorder } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import { Ingredients, IngredientName, IngredientValue } from "./Recipe";
import IngredientsTitleToolbar from "./IngredientsTitleToolbar";
import NewItem from "./NewItem";
import IngredientsPercentageItem from "./IngredientsPercentageItem";

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
    onIngredientsChange(new Map([...ingredients, [name, value]]));
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
    onIngredientsChange(new Map([...ingredients, [name, undefined]]));
  };

  const onDeleteIngredient = (name: IngredientName) => {
    let newIngredients = new Map(ingredients);
    newIngredients.delete(name);
    onIngredientsChange(newIngredients);
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
