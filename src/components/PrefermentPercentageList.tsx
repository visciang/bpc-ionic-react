import { useCallback, useMemo } from "react";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import IngredientsTitleToolbar from "./IngredientsTitleToolbar";
import IngredientPercentageItem from "./IngredientPercentageItem";
import IngredientPicker from "./IngredientPicker";
import { Preferment, PrefermentKind } from "../dataModel/Preferment";
import { IngredientName, IngredientValue } from "../dataModel/Ingredient";
import { mapDelete, mapMoveIdx, mapSet } from "./utils";

type Props = {
  name: string;
  availableFlours: IngredientName[];
  availableIngredients: IngredientName[];
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(name: string, preferment: Preferment): void;
  onPrefermentDelete(name: string): void;
};

export default function PrefermentPercentageList(
  {
    name,
    availableFlours,
    availableIngredients,
    preferment,
    editable,
    onPrefermentChange,
    onPrefermentDelete,
  }: Props) {
  const onPrefermentedFlourChange = useCallback(
    (_name: IngredientName, value: IngredientValue) => {
      onPrefermentChange(name, { ...preferment, prefermentedFlour: value })
    },
    [name, preferment, onPrefermentChange]
  );

  const _onPrefermentDelete = useCallback(
    () => onPrefermentDelete(name),
    [name, onPrefermentDelete]
  );

  const onSeedChange = useCallback(
    (_name: IngredientName, value: IngredientValue) => {
      if (preferment.kind === PrefermentKind.SOURDOUGH) onPrefermentChange(name, { ...preferment, seed: value });
    },
    [name, preferment, onPrefermentChange]
  );

  const onFlourChange = useCallback(
    (flour: IngredientName, value: IngredientValue) => {
      onPrefermentChange(name, { ...preferment, flours: mapSet(preferment.flours, flour, value) })
    },
    [name, preferment, onPrefermentChange]
  );

  const onIngredientChange = useCallback(
    (ingredient: IngredientName, value: IngredientValue) => {
      onPrefermentChange(name, { ...preferment, ingredients: mapSet(preferment.ingredients, ingredient, value) })
    },
    [name, preferment, onPrefermentChange]
  );

  const onFlourDelete = useCallback(
    (flour: IngredientName) => {
      onPrefermentChange(name, { ...preferment, flours: mapDelete(preferment.flours, flour) })
    },
    [name, preferment, onPrefermentChange]
  );

  const onIngredientDelete = useCallback(
    (ingredient: IngredientName) => {
      onPrefermentChange(name, { ...preferment, ingredients: mapDelete(preferment.ingredients, ingredient) })
    },
    [name, preferment, onPrefermentChange]
  );

  const onFlourReorder = useCallback(
    (event: CustomEvent<ItemReorderEventDetail>) => {
      onPrefermentChange(name, {
        ...preferment,
        flours: mapMoveIdx(preferment.flours, event.detail.from, event.detail.to),
      });
      event.detail.complete();
    },
    [name, preferment, onPrefermentChange]
  );

  const onIngredientReorder = useCallback(
    (event: CustomEvent<ItemReorderEventDetail>) => {
      onPrefermentChange(name, {
        ...preferment,
        ingredients: mapMoveIdx(preferment.ingredients, event.detail.from, event.detail.to),
      });
      event.detail.complete();
    },
    [name, preferment, onPrefermentChange]
  );

  const onNewFlour = useCallback(
    (flour: IngredientName) => {
      onPrefermentChange(name, { ...preferment, flours: mapSet(preferment.flours, flour, undefined) })
    },
    [name, preferment, onPrefermentChange]
  );

  const onNewIngredient = useCallback(
    (ingredient: IngredientName) => {
      onPrefermentChange(name, { ...preferment, ingredients: mapSet(preferment.ingredients, ingredient, undefined) })
    },
    [name, preferment, onPrefermentChange]
  );

  const selectableFlours = useMemo(
    () => availableFlours.filter((flour) => !preferment.flours.has(flour)),
    [availableFlours, preferment.flours]
  );
  const selectableIngredients = useMemo(
    () => availableIngredients.filter((ingredient) => !preferment.ingredients.has(ingredient)),
    [availableIngredients, preferment.ingredients]
  );

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={name} onDelete={editable ? _onPrefermentDelete : undefined} />
      <IngredientPercentageItem
        name="Prefermented flour"
        value={preferment.prefermentedFlour}
        maxPercentage={100}
        editable={editable}
        onChange={onPrefermentedFlourChange} />
      {preferment.kind === PrefermentKind.SOURDOUGH ? (
        <IngredientPercentageItem
          name="Sourdough starter"
          value={preferment.seed}
          maxPercentage={100}
          editable={editable}
          onChange={onSeedChange} />
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
            onDelete={onFlourDelete} />
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
              onDelete={onIngredientDelete} />
          );
        })}
      </IonReorderGroup>
      <IngredientPicker label="Pick flour" values={selectableFlours} onPick={onNewFlour} />
      <IngredientPicker label="Pick ingredient" values={selectableIngredients} onPick={onNewIngredient} />
    </IonList>
  );
}
