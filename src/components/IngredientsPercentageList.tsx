import React from "react";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import NewItemInput from "components/NewItemInput";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import IngredientsPercentageItem from "components/IngredientsPercentageItem";
import { propsShallowCompare } from "components/utils";
import { IngredientName, Ingredients, IngredientValue } from "dataModel/Ingredient";

type Props = {
  title: string;
  ingredients: Ingredients;
  maxPercentage?: number;
  editable?: boolean;
  onIngredientsChange(ingredients: Ingredients): void;
};

const Component: React.FC<Props> = ({ title, ingredients, maxPercentage, editable, onIngredientsChange }) => {
  console.log(`IngredientsPercentageList ${title}`);

  const onIngredientChange = (name: IngredientName, value: IngredientValue) => {
    if (!(ingredients.has(name) && ingredients.get(name) === value))
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
    if (ingredients.has(name)) return;
    onIngredientsChange(new Map([...ingredients, [name, undefined]]));
  };

  const onDeleteIngredient = (name: IngredientName) => {
    if (!ingredients.has(name)) return;

    let res = new Map([...ingredients]);
    res.delete(name);
    onIngredientsChange(res);
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
            onChange={onIngredientChange}
            onDelete={onDeleteIngredient}
          />
        ))}
      </IonReorderGroup>
      <NewItemInput onNewItem={onNewIngredient} />
    </IonList>
  );
};

const IngredientsPercentageList = React.memo(Component, (p: Props, n: Props) =>
  propsShallowCompare(p, n, ["title", "ingredients", "maxPercentage", "editable"])
);
export default IngredientsPercentageList;
