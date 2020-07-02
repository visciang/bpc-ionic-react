import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import IngredientsPercentageItem from "components/IngredientsPercentageItem";
import IngredientPicker from "components/IngredientPicker";
import { propsShallowCompare } from "components/utils";
import { PrefermentKind } from "dataModel/Preferment";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";
import * as State from "state/State";

type Props = {
  prefermentName: string;
};

const Component: React.FC<Props> = ({ prefermentName }) => {
  const editable = useRecoilValue(State.editable);
  const flours = useRecoilValue(State.flours);
  const ingredients = useRecoilValue(State.ingredients);
  const [preferments, setPreferments] = useRecoilState(State.preferments);

  console.log(prefermentName);
  console.log(preferments);
  const preferment = preferments.get(prefermentName)!;

  const onPrefermentedFlourChange = (name: IngredientName, value: IngredientValue) => {
    if (preferment.prefermentedFlour === value) return;

    setPreferments(new Map([...preferments, [prefermentName, { ...preferment, prefermentedFlour: value }]]));
  };

  const onSeedChange = (name: IngredientName, value: IngredientValue) => {
    if (preferment.kind === PrefermentKind.SOURDOUGH) {
      if (preferment.seed === value) return;

      setPreferments(new Map([...preferments, [prefermentName, { ...preferment, seed: value }]]));
    }
  };

  const onIngredientChange = (kind: "flours" | "ingredients", name: IngredientName, value: IngredientValue) => {
    if (preferment[kind].has(name) && preferment[kind].get(name) === value) return;

    const newIngredients = new Map([...preferment[kind], [name, value]]);
    setPreferments(new Map([...preferments, [prefermentName, { ...preferment, [kind]: newIngredients }]]));
  };

  const onIngredientDelete = (kind: "flours" | "ingredients", name: IngredientName) => {
    if (!preferment[kind].has(name)) return;

    const newIngredients = new Map([...preferment[kind]]);
    newIngredients.delete(name);
    setPreferments(new Map([...preferments, [prefermentName, { ...preferment, [kind]: newIngredients }]]));
  };

  const onIngredientReorder = (kind: "flours" | "ingredients", event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedIngredients = [...preferment[kind]];
    const movedIngredient = orderedIngredients[event.detail.from];

    orderedIngredients.splice(event.detail.from, 1);
    orderedIngredients.splice(event.detail.to, 0, movedIngredient);

    setPreferments(new Map([...preferments, [prefermentName, { ...preferment, [kind]: orderedIngredients }]]));

    event.detail.complete();
  };

  const onPrefermentDelete = () => {
    if (!preferments.has(prefermentName)) return;

    const newPreferments = new Map([...preferments]);
    newPreferments.delete(prefermentName);
    setPreferments(newPreferments);
  };

  const onNewIngredient = (kind: "flours" | "ingredients", name: IngredientName) => {
    if (preferment[kind].has(name)) return;

    const newIngredients = new Map([...preferment[kind], [name, undefined]]);
    setPreferments(new Map([...preferments, [prefermentName, { ...preferment, [kind]: newIngredients }]]));
  };

  // TODO recoil derived state?
  const selectableFlours = [...flours.keys()].filter((flour) => !preferment.flours.has(flour));
  const selectableIngredients = [...ingredients.keys()].filter((ingredient) => !preferment.ingredients.has(ingredient));

  // TODO update preferments on flours change (ex. flour deleted)

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={prefermentName} onDelete={onPrefermentDelete} />
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
        {[...preferment.flours.entries()].map(([name, value]) => (
          <IngredientsPercentageItem
            key={name}
            name={name}
            value={value}
            maxPercentage={100}
            onChange={(name, value) => onIngredientChange("flours", name, value)}
            onDelete={(name) => onIngredientDelete("flours", name)}
          />
        ))}
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

const PrefermentPercentageList = React.memo(Component, (p: Props, n: Props) =>
  propsShallowCompare(p, n, ["prefermentName"])
);
export default PrefermentPercentageList;
