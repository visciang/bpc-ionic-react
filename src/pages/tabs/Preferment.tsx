import React, { useState } from "react";
import { produce } from "immer";
import Tab from "pages/tabs/Tab";
import NewItemInput from "components/NewItemInput";
import PrefermentSelector from "components/PrefermentSelector";
import PrefermentPercentageList from "components/PrefermentPercentageList";
import { Preferments, PrefermentKind, Preferment as PrefermentT, PrefermentName } from "dataModel/Preferment";
import { IngredientName } from "dataModel/Ingredient";

type Props = {
  title: string;
  flours: Set<IngredientName>;
  ingredients: Set<IngredientName>;
  preferments: Preferments;
  onPrefermentsChange(preferments: Preferments): void;
};

export const Preferment: React.FC<Props> = ({ title, flours, ingredients, preferments, onPrefermentsChange }) => {
  const [editable, setEditable] = useState(false);
  const [prefermentKind, setPrefermentKind] = useState<PrefermentKind | undefined>(undefined);

  const onNewPreferment = (name: string) => {
    let newPreferment: PrefermentT;

    if (prefermentKind === PrefermentKind.PREDOUGH)
      newPreferment = {
        kind: PrefermentKind.PREDOUGH,
        prefermentedFlour: undefined,
        flours: new Map(),
        ingredients: new Map(),
      };
    else
      newPreferment = {
        kind: PrefermentKind.SOURDOUGH,
        prefermentedFlour: undefined,
        flours: new Map(),
        ingredients: new Map(),
        seed: undefined,
      };

    onPrefermentsChange(
      produce(preferments, (draft) => {
        draft.set(name, newPreferment);
      })
    );

    setPrefermentKind(undefined);
  };

  const onPrefermentChange = (name: PrefermentName, preferment: PrefermentT) => {
    onPrefermentsChange(
      produce(preferments, (draft) => {
        draft.set(name, preferment);
      })
    );
  };

  const onPrefermentDelete = (name: PrefermentName) => {
    onPrefermentsChange(
      produce(preferments, (draft) => {
        draft.delete(name);
      })
    );
  };

  return (
    <Tab title={title} editActive={editable} onEditToggle={() => setEditable(!editable)}>
      <div className="ion-padding-bottom">
        <PrefermentSelector value={prefermentKind} onSelect={setPrefermentKind} />
        <NewItemInput onNewItem={prefermentKind ? onNewPreferment : undefined} />
      </div>
      {[...preferments.entries()].map(([name, preferment]) => {
        return (
          <div key={name} className="border-top ion-padding-vertical">
            <PrefermentPercentageList
              title={name}
              flours={flours}
              ingredients={ingredients}
              preferment={preferment}
              editable={editable}
              onPrefermentChange={(preferment) => onPrefermentChange(name, preferment)}
              onPrefermentDelete={() => onPrefermentDelete(name)}
            />
          </div>
        );
      })}
    </Tab>
  );
};
