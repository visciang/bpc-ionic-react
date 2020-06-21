import React from "react";
import { IonList, IonReorderGroup, IonReorder } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import { produce } from "immer";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import IngredientsPercentageItem from "components/IngredientsPercentageItem";
import { Preferment, PrefermentKind } from "dataModel/Preferment";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";

type Props = {
  title: string;
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(preferment: Preferment): void;
};

const PrefermentPercentage: React.FC<Props> = ({ title, preferment, editable, onPrefermentChange }) => {
  const onPrefermentedFlourChange = (name: IngredientName, value: IngredientValue) => {
    onPrefermentChange(
      produce(preferment, (draft) => {
        draft.prefermentedFlour = value;
      })
    );
  };

  const onSeedChange = (name: IngredientName, value: IngredientValue) => {
    if (preferment.kind === PrefermentKind.SOURDOUGH) {
      onPrefermentChange(
        produce(preferment, (draft) => {
          draft.seed = value;
        })
      );
    }
  };

  const onIngredientChange = (kind: "flours" | "ingredients", name: IngredientName, value: IngredientValue) => {
    onPrefermentChange(
      produce(preferment, (draft) => {
        draft[kind].set(name, value);
      })
    );
  };

  const onIngredientDelete = (kind: "flours" | "ingredients", name: IngredientName) => {
    onPrefermentChange(
      produce(preferment, (draft) => {
        draft[kind].delete(name);
      })
    );
  };

  const onIngredientReorder = (kind: "flours" | "ingredients", event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedIngredients = [...preferment[kind]];
    const movedIngredient = orderedIngredients[event.detail.from];

    orderedIngredients.splice(event.detail.from, 1);
    orderedIngredients.splice(event.detail.to, 0, movedIngredient);

    onPrefermentChange(
      produce(preferment, (draft) => {
        draft[kind] = new Map(orderedIngredients);
      })
    );

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
              onChange={(name, value) => onIngredientChange("flours", name, value)}
              onDelete={editable ? (name) => onIngredientDelete("flours", name) : undefined}
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
              onChange={(name, value) => onIngredientChange("ingredients", name, value)}
              onDelete={editable ? (name) => onIngredientDelete("ingredients", name) : undefined}
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
