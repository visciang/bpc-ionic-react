import React from "react";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import IngredientsPercentageItem from "components/IngredientsPercentageItem";
import { Preferment, PrefermentKind } from "dataModel/Preferment";
import { IngredientName, IngredientValue, Ingredients } from "dataModel/Ingredient";
import IngredientPicker from "components/IngredientPicker";

type Props = {
  title: string;
  flours: Ingredients;
  ingredients: Ingredients;
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(preferment: Preferment): void;
  onPrefermentDelete(): void;
};

const PrefermentPercentageList: React.FC<Props> = ({
  title,
  flours,
  ingredients,
  preferment,
  editable,
  onPrefermentChange,
  onPrefermentDelete,
}) => {
  const onPrefermentedFlourChange = (name: IngredientName, value: IngredientValue) =>
    onPrefermentChange({ ...preferment, prefermentedFlour: value });

  const onSeedChange = (name: IngredientName, value: IngredientValue) => {
    if (preferment.kind === PrefermentKind.SOURDOUGH) onPrefermentChange({ ...preferment, seed: value });
  };

  const onIngredientChange = (kind: "flours" | "ingredients", name: IngredientName, value: IngredientValue) =>
    onPrefermentChange({ ...preferment, [kind]: new Map([...preferment[kind], [name, value]]) });

  const onIngredientDelete = (kind: "flours" | "ingredients", name: IngredientName) => {
    let newIngredients = new Map(preferment[kind]);
    newIngredients.delete(name);
    onPrefermentChange({ ...preferment, [kind]: newIngredients });
  };

  const onIngredientReorder = (kind: "flours" | "ingredients", event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedIngredients = [...preferment[kind]];
    const movedIngredient = orderedIngredients[event.detail.from];

    orderedIngredients.splice(event.detail.from, 1);
    orderedIngredients.splice(event.detail.to, 0, movedIngredient);

    onPrefermentChange({ ...preferment, [kind]: new Map(orderedIngredients) });

    event.detail.complete();
  };

  const onNewIngredient = (kind: "flours" | "ingredients", name: IngredientName) => {
    onPrefermentChange({ ...preferment, [kind]: new Map([...preferment[kind], [name, undefined]]) });
  };

  const selectableFlours = [...flours.keys()].filter((flour) => !preferment.flours.has(flour));
  const selectableIngredients = [...ingredients.keys()].filter((ingredient) => !preferment.ingredients.has(ingredient));

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} onDelete={editable ? onPrefermentDelete : undefined} />
      <IngredientsPercentageItem
        name="Prefermented flour"
        value={preferment.prefermentedFlour}
        maxPercentage={100}
        editable={editable}
        onChange={onPrefermentedFlourChange}
      />
      {preferment.kind === PrefermentKind.SOURDOUGH ? (
        <IngredientsPercentageItem
          name="Sourdough starter"
          value={preferment.seed}
          maxPercentage={100}
          editable={editable}
          onChange={onSeedChange}
        />
      ) : undefined}
      <IonReorderGroup disabled={!editable} onIonItemReorder={(e) => onIngredientReorder("flours", e)}>
        {[...preferment.flours].map(([name, value]) => (
          <IngredientsPercentageItem
            key={name}
            name={name}
            value={value}
            maxPercentage={100}
            editable={editable}
            onChange={(name, value) => onIngredientChange("flours", name, value)}
            onDelete={(name) => onIngredientDelete("flours", name)}
          />
        ))}
      </IonReorderGroup>
      <IonReorderGroup disabled={!editable} onIonItemReorder={(e) => onIngredientReorder("ingredients", e)}>
        {[...preferment.ingredients].map(([name, value]) => {
          return (
            <IngredientsPercentageItem
              key={name}
              name={name}
              value={value}
              maxPercentage={100}
              editable={editable}
              onChange={(name, value) => onIngredientChange("ingredients", name, value)}
              onDelete={(name) => onIngredientDelete("ingredients", name)}
            />
          );
        })}
      </IonReorderGroup>
      <IngredientPicker
        label="Pick flour"
        values={selectableFlours}
        onPick={(name) => onNewIngredient("flours", name)}
      />
      <IngredientPicker
        label="Pick ingredient"
        values={selectableIngredients}
        onPick={(name) => onNewIngredient("ingredients", name)}
      />
    </IonList>
  );
};

export default PrefermentPercentageList;
