import React, { useState } from "react";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import { Ingredients, IngredientName, IngredientValue } from "./Recipe";
import IngredientsPercentageToolbar from "./IngredientsPercentageToolbar";
import IngredientsPercentageNewItem from "./IngredientsPercentageNewItem";
import IngredientsPercentageItem from "./IngredientsPercentageItem";

type Props = {
  title: string;
  ingredients: Ingredients;
  maxPercentage?: number;
  onIngredientsChange(ingredients: Ingredients): void;
};

const IngredientsPercentage: React.FC<Props> = ({ title, ingredients, onIngredientsChange }) => {
  const [editable, setEditable] = useState(false);

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
    <IonList lines="none" className="ion-padding-top ion-padding-horizontal">
      <IngredientsPercentageToolbar title={title} onEditToggle={() => setEditable(!editable)} />
      <IonReorderGroup disabled={!editable} onIonItemReorder={onIngredientReorder}>
        {[...ingredients.entries()].map(([name, value]) => {
          return (
            <IngredientsPercentageItem
              key={name}
              name={name}
              value={value}
              editable={editable}
              onChange={onIngredientChange}
              onDelete={onDeleteIngredient}
            />
          );
        })}
      </IonReorderGroup>
      <IngredientsPercentageNewItem onNewIngredient={onNewIngredient} />
    </IonList>
  );
};

export default IngredientsPercentage;
