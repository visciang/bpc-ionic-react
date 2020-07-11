import React, { useCallback } from "react";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import IngredientPercentageItem from "components/IngredientPercentageItem";
import IngredientPicker from "components/IngredientPicker";
import { deleteIngredient, reorderIngredients } from "components/utils";
import { Preferment, PrefermentKind } from "dataModel/Preferment";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";

type Props = {
  title: string;
  availableFlours: IngredientName[];
  availableIngredients: IngredientName[];
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(preferment: Preferment): void;
  onPrefermentDelete(): void;
};

let PrefermentPercentageList: React.FC<Props> = ({
  title,
  availableFlours,
  availableIngredients,
  preferment,
  editable,
  onPrefermentChange,
  onPrefermentDelete,
}) => {
  const onPrefermentedFlourChange = useCallback(
    (name: IngredientName, value: IngredientValue) => onPrefermentChange({ ...preferment, prefermentedFlour: value }),
    [preferment, onPrefermentChange]
  );

  const onSeedChange = useCallback(
    (name: IngredientName, value: IngredientValue) => {
      if (preferment.kind === PrefermentKind.SOURDOUGH) onPrefermentChange({ ...preferment, seed: value });
    },
    [preferment, onPrefermentChange]
  );

  const onFlourChange = useCallback(
    (name: IngredientName, value: IngredientValue) =>
      onPrefermentChange({ ...preferment, flours: new Map([...preferment.flours, [name, value]]) }),
    [preferment, onPrefermentChange]
  );

  const onIngredientChange = useCallback(
    (name: IngredientName, value: IngredientValue) =>
      onPrefermentChange({ ...preferment, ingredients: new Map([...preferment.ingredients, [name, value]]) }),
    [preferment, onPrefermentChange]
  );

  const onFlourDelete = useCallback(
    (name: IngredientName) => onPrefermentChange({ ...preferment, flours: deleteIngredient(preferment.flours, name) }),
    [preferment, onPrefermentChange]
  );

  const onIngredientDelete = useCallback(
    (name: IngredientName) =>
      onPrefermentChange({ ...preferment, ingredients: deleteIngredient(preferment.ingredients, name) }),
    [preferment, onPrefermentChange]
  );

  const onFlourReorder = useCallback(
    (event: CustomEvent<ItemReorderEventDetail>) => {
      onPrefermentChange({
        ...preferment,
        flours: reorderIngredients(preferment.flours, event.detail.from, event.detail.to),
      });
      event.detail.complete();
    },
    [preferment, onPrefermentChange]
  );

  const onIngredientReorder = useCallback(
    (event: CustomEvent<ItemReorderEventDetail>) => {
      onPrefermentChange({
        ...preferment,
        ingredients: reorderIngredients(preferment.ingredients, event.detail.from, event.detail.to),
      });
      event.detail.complete();
    },
    [preferment, onPrefermentChange]
  );

  const onNewFlour = useCallback(
    (name: IngredientName) => {
      onPrefermentChange({ ...preferment, flours: new Map([...preferment.flours, [name, undefined]]) });
    },
    [preferment, onPrefermentChange]
  );

  const onNewIngredient = useCallback(
    (name: IngredientName) => {
      onPrefermentChange({ ...preferment, ingredients: new Map([...preferment.ingredients, [name, undefined]]) });
    },
    [preferment, onPrefermentChange]
  );

  const selectableFlours = availableFlours.filter((flour) => !preferment.flours.has(flour));
  const selectableIngredients = availableIngredients.filter((ingredient) => !preferment.ingredients.has(ingredient));

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} onDelete={editable ? onPrefermentDelete : undefined} />
      <IngredientPercentageItem
        name="Prefermented flour"
        value={preferment.prefermentedFlour}
        maxPercentage={100}
        editable={editable}
        onChange={onPrefermentedFlourChange}
      />
      {preferment.kind === PrefermentKind.SOURDOUGH ? (
        <IngredientPercentageItem
          name="Sourdough starter"
          value={preferment.seed}
          maxPercentage={100}
          editable={editable}
          onChange={onSeedChange}
        />
      ) : undefined}
      <IonReorderGroup disabled={!editable} onIonItemReorder={onFlourReorder}>
        {[...preferment.flours].map(([name, value]) => (
          <IngredientPercentageItem
            key={name}
            name={name}
            value={value}
            maxPercentage={100}
            editable={editable}
            onChange={onFlourChange}
            onDelete={onFlourDelete}
          />
        ))}
      </IonReorderGroup>
      <IonReorderGroup disabled={!editable} onIonItemReorder={onIngredientReorder}>
        {[...preferment.ingredients].map(([name, value]) => {
          return (
            <IngredientPercentageItem
              key={name}
              name={name}
              value={value}
              maxPercentage={100}
              editable={editable}
              onChange={onIngredientChange}
              onDelete={onIngredientDelete}
            />
          );
        })}
      </IonReorderGroup>
      <IngredientPicker label="Pick flour" values={selectableFlours} onPick={onNewFlour} />
      <IngredientPicker label="Pick ingredient" values={selectableIngredients} onPick={onNewIngredient} />
    </IonList>
  );
};

export default PrefermentPercentageList = React.memo(PrefermentPercentageList);
