import React from "react";
import { IonList, IonReorderGroup, IonReorder } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import { Preferment, Recipe, IngredientName, IngredientValue } from "./Recipe";
import IngredientsTitleToolbar from "./IngredientsTitleToolbar";
import IngredientsPercentageItem from "./IngredientsPercentageItem";

type Props = {
  title: string;
  recipe: Recipe;
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(preferment: Preferment): void;
};

const PrefermentPercentage: React.FC<Props> = ({ title, preferment, editable, onPrefermentChange }) => {
  const onPrefermentedFlourChange = (name: IngredientName, value: IngredientValue) => {
    onPrefermentChange({ ...preferment, prefermentedFlour: value });
  };

  const onFlourChange = (name: IngredientName, value: IngredientValue) => {
    const flours = new Map([...preferment.flours, [name, value]]);
    onPrefermentChange({ ...preferment, flours: flours });
  };

  const onFlourDelete = (name: IngredientName) => {
    let flours = new Map(preferment.flours);
    flours.delete(name);
    onPrefermentChange({ ...preferment, flours: flours });
  };

  const onFlourReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedFlours = [...preferment.flours];

    const movedFlour = orderedFlours[event.detail.from];
    orderedFlours.splice(event.detail.from, 1);
    orderedFlours.splice(event.detail.to, 0, movedFlour);

    onPrefermentChange({ ...preferment, flours: new Map(orderedFlours) });
    event.detail.complete();
  };

  const onIngredientChange = (name: IngredientName, value: IngredientValue) => {
    const ingredients = new Map([...preferment.ingredients, [name, value]]);
    onPrefermentChange({ ...preferment, ingredients: ingredients });
  };

  const onIngredientDelete = (name: IngredientName) => {
    let ingredients = new Map(preferment.ingredients);
    ingredients.delete(name);
    onPrefermentChange({ ...preferment, ingredients: ingredients });
  };

  const onIngredientReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedIngredients = [...preferment.ingredients];

    const movedFlour = orderedIngredients[event.detail.from];
    orderedIngredients.splice(event.detail.from, 1);
    orderedIngredients.splice(event.detail.to, 0, movedFlour);

    onPrefermentChange({ ...preferment, ingredients: new Map(orderedIngredients) });
    event.detail.complete();
  };

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} />
      <IngredientsPercentageItem
        name="Prefermented flour"
        value={preferment.prefermentedFlour}
        maxPercentage={100}
        onChange={onPrefermentedFlourChange}
      />
      <IonReorderGroup disabled={!editable} onIonItemReorder={onFlourReorder}>
        {[...preferment.flours.entries()].map(([name, value]) => {
          return (
            <IngredientsPercentageItem
              key={name}
              name={name}
              value={value}
              maxPercentage={100}
              onChange={onFlourChange}
              onDelete={editable ? onFlourDelete : undefined}
            >
              <IonReorder slot="end" />
            </IngredientsPercentageItem>
          );
        })}
      </IonReorderGroup>
      <IonReorderGroup disabled={!editable} onIonItemReorder={onIngredientReorder}>
        {[...preferment.ingredients.entries()].map(([name, value]) => {
          return (
            <IngredientsPercentageItem
              key={name}
              name={name}
              value={value}
              maxPercentage={100}
              onChange={onIngredientChange}
              onDelete={editable ? onIngredientDelete : undefined}
            >
              <IonReorder slot="end" />
            </IngredientsPercentageItem>
          );
        })}
      </IonReorderGroup>
    </IonList>
  );
};

export default PrefermentPercentage;
