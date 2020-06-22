import React, { useState } from "react";
import { produce } from "immer";
import FormulaTab from "pages/tabs/FormulaTab";
import NewItem from "components/NewItem";
import PrefermentSelector from "components/PrefermentSelector";
import PrefermentPercentage from "components/PrefermentPercentage";
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

  return (
    <FormulaTab title={title} onEditToggle={() => setEditable(!editable)}>
      <NewItem onNewItem={prefermentKind ? onNewPreferment : undefined} />
      <PrefermentSelector value={prefermentKind} onSelect={setPrefermentKind} />
      {[...preferments.entries()].map(([name, preferment]) => {
        return (
          <PrefermentPercentage
            key={name}
            title={name}
            flours={flours}
            ingredients={ingredients}
            preferment={preferment}
            editable={editable}
            onPrefermentChange={(preferment) => onPrefermentChange(name, preferment)}
          />
        );
      })}
    </FormulaTab>
  );
};
