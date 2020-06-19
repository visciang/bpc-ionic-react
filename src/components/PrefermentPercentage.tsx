import React from "react";
import { IonList, IonReorderGroup, IonReorder } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import { List, OrderedMap } from "immutable";
import IngredientsTitleToolbar from "./IngredientsTitleToolbar";
import IngredientsPercentageItem from "./IngredientsPercentageItem";
import { Recipe } from "./dataModel/Recipe";
import { Preferment, PrefermentKind } from "./dataModel/Preferment";
import { IngredientName, IngredientValue } from "./dataModel/Ingredient";

type Props = {
  title: string;
  recipe: Recipe;
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(preferment: Preferment): void;
};

const PrefermentPercentage: React.FC<Props> = ({ title, preferment, editable, onPrefermentChange }) => {
  const onPrefermentedFlourChange = (name: IngredientName, value: IngredientValue) => {
    onPrefermentChange(preferment.setIn(["prefermentedFlour"], value));
  };

  const onSeedChange = (name: IngredientName, value: IngredientValue) => {
    if (preferment.kind === PrefermentKind.SOURDOUGH) {
      preferment.has("seed");
      onPrefermentChange(preferment.setIn(["seed"], value));
    }
  };

  const onFlourChange = (name: IngredientName, value: IngredientValue) => {
    onPrefermentChange(preferment.setIn(["flours", name], value));
  };

  const onFlourDelete = (name: IngredientName) => {
    onPrefermentChange(preferment.deleteIn(["flours", name]));
  };

  const onIngredientChange = (name: IngredientName, value: IngredientValue) => {
    onPrefermentChange(preferment.setIn(["ingredients", name], value));
  };

  const onIngredientDelete = (name: IngredientName) => {
    onPrefermentChange(preferment.deleteIn(["ingredients", name]));
  };

  const onIngredientReorder = (kind: "flours" | "ingredients", event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedIngredients = List(preferment.get(kind));
    const movedIngredient = orderedIngredients.get(event.detail.from)!;
    orderedIngredients = orderedIngredients.remove(event.detail.from).insert(event.detail.to, movedIngredient);
    onPrefermentChange(preferment.setIn(["kind"], OrderedMap(orderedIngredients)));

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
      {preferment.kind === PrefermentKind.SOURDOUGH ? (
        <IngredientsPercentageItem
          name="Sourdough starter"
          value={preferment.seed}
          maxPercentage={100}
          onChange={onSeedChange}
        />
      ) : undefined}
      <IonReorderGroup disabled={!editable} onIonItemReorder={(e) => onIngredientReorder("flours", e)}>
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
      <IonReorderGroup disabled={!editable} onIonItemReorder={(e) => onIngredientReorder("ingredients", e)}>
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
