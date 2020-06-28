import React from "react";
import { useRecoilState } from "recoil";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import { produce } from "immer";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import IngredientsPercentageItem from "components/IngredientsPercentageItem";
import { PrefermentKind, PrefermentName } from "dataModel/Preferment";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";
import IngredientPicker from "components/IngredientPicker";
import * as State from "state/State";

type Props = {
  prefermentName: string;
};

const PrefermentPercentageList: React.FC<Props> = ({ prefermentName }) => {
  const [editable] = useRecoilState(State.editable);
  const [flours] = useRecoilState(State.flours);
  const [ingredients] = useRecoilState(State.ingredients);
  const [preferments, setPreferments] = useRecoilState(State.preferments);

  const preferment = preferments.get(prefermentName)!;

  const onPrefermentedFlourChange = (name: IngredientName, value: IngredientValue) => {
    setPreferments(
      produce(preferments, (draft) => {
        draft.get(prefermentName)!.prefermentedFlour = value;
      })
    );
  };

  const onSeedChange = (name: IngredientName, value: IngredientValue) => {
    setPreferments(
      produce(preferments, (draft) => {
        const preferment = draft.get(prefermentName)!;

        if (preferment.kind === PrefermentKind.SOURDOUGH) {
          preferment.seed = value;
        }
      })
    );
  };

  const onIngredientChange = (kind: "flours" | "ingredients", name: IngredientName, value: IngredientValue) => {
    setPreferments(
      produce(preferments, (draft) => {
        draft.get(prefermentName)![kind].set(name, value);
      })
    );
  };

  const onIngredientDelete = (kind: "flours" | "ingredients", name: IngredientName) => {
    setPreferments(
      produce(preferments, (draft) => {
        draft.get(prefermentName)![kind].delete(name);
      })
    );
  };

  const onIngredientReorder = (kind: "flours" | "ingredients", event: CustomEvent<ItemReorderEventDetail>) => {
    let orderedIngredients = [...preferment[kind]];
    const movedIngredient = orderedIngredients[event.detail.from];

    orderedIngredients.splice(event.detail.from, 1);
    orderedIngredients.splice(event.detail.to, 0, movedIngredient);

    setPreferments(
      produce(preferments, (draft) => {
        draft.get(prefermentName)![kind] = new Map(orderedIngredients);
      })
    );

    event.detail.complete();
  };

  const onPrefermentDelete = (name: PrefermentName) => {
    setPreferments(
      produce(preferments, (draft) => {
        draft.delete(name);
      })
    );
  };

  const onNewIngredient = (kind: "flours" | "ingredients", name: IngredientName) => {
    setPreferments(
      produce(preferments, (draft) => {
        draft.get(prefermentName)![kind].set(name, undefined);
      })
    );
  };

  const selectableFlours = [...flours.keys()].filter((flour) => !preferment.flours.has(flour));
  const selectableIngredients = [...ingredients.keys()].filter((ingredient) => !preferment.ingredients.has(ingredient));

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar
        title={prefermentName}
        onDelete={editable ? () => onPrefermentDelete(prefermentName) : undefined}
      />
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
            reordable={true}
            onChange={(name, value) => onIngredientChange("flours", name, value)}
            onDelete={editable ? (name) => onIngredientDelete("flours", name) : undefined}
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
              reordable={true}
              onChange={(name, value) => onIngredientChange("ingredients", name, value)}
              onDelete={editable ? (name) => onIngredientDelete("ingredients", name) : undefined}
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
