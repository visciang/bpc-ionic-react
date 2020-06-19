import React, { useState } from "react";
import FormulaTab from "../../components/FormulaTab";
import NewItem from "../../components/NewItem";
import PrefermentSelector from "../../components/PrefermentSelector";
import PrefermentPercentage from "../../components/PrefermentPercentage";
import { Recipe } from "../../components/dataModel/Recipe";
import {
  Preferments,
  PrefermentKind,
  Preferment as PrefermentT,
  makePreferment,
  PrefermentName,
} from "../../components/dataModel/Preferment";

type Props = {
  recipe: Recipe;
  onPrefermentsChange(preferments: Preferments): void;
};

export const Preferment: React.FC<Props> = ({ recipe, onPrefermentsChange }) => {
  const [editable, setEditable] = useState(false);
  const [prefermentKind, setPreferment] = useState<PrefermentKind>(PrefermentKind.PREDOUGH);

  const onNewPreferment = (name: string) => {
    let preferment: PrefermentT;

    if (prefermentKind === PrefermentKind.PREDOUGH) {
      preferment = makePreferment({ kind: PrefermentKind.PREDOUGH });
    } else {
      preferment = makePreferment({ kind: PrefermentKind.SOURDOUGH });
    }

    onPrefermentsChange(recipe.preferments.set(name, preferment));
  };

  const onPrefermentChange = (name: PrefermentName, preferment: PrefermentT) => {
    onPrefermentsChange(recipe.preferments.set(name, preferment));
  };

  return (
    <FormulaTab title={recipe.name} onEditToggle={() => setEditable(!editable)}>
      <NewItem onNewItem={onNewPreferment} />
      <PrefermentSelector value={prefermentKind} onChange={setPreferment} />
      {[...recipe.preferments.entries()].map(([name, preferment]) => {
        return (
          <PrefermentPercentage
            key={name}
            title={name}
            recipe={recipe}
            preferment={preferment}
            editable={editable}
            onPrefermentChange={(preferment) => onPrefermentChange(name, preferment)}
          />
        );
      })}
    </FormulaTab>
  );
};
