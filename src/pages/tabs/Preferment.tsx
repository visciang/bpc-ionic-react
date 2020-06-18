import React, { useState } from "react";
import FormulaTab from "../../components/FormulaTab";
import { Recipe, Preferment as Pref, Preferments, PrefermentKind, PrefermentName } from "../../components/Recipe";
import NewItem from "../../components/NewItem";
import PrefermentSelector from "../../components/PrefermentSelector";
import PrefermentPercentage from "../../components/PrefermentPercentage";

type Props = {
  recipe: Recipe;
  onPrefermentsChange(preferments: Preferments): void;
};

const Preferment: React.FC<Props> = ({ recipe, onPrefermentsChange }) => {
  const [editable, setEditable] = useState(false);
  const [prefermentKind, setPreferment] = useState<PrefermentKind>(PrefermentKind.PREDOUGH);

  const onNewPreferment = (name: string) => {
    let preferment: Pref;

    if (prefermentKind === PrefermentKind.PREDOUGH)
      preferment = {
        kind: PrefermentKind.PREDOUGH,
        prefermentedFlour: undefined,
        flours: new Map(),
        ingredients: new Map(),
      };
    else
      preferment = {
        kind: PrefermentKind.SOURDOUGH,
        prefermentedFlour: undefined,
        flours: new Map(),
        ingredients: new Map(),
        seed: undefined,
      };

    onPrefermentsChange(new Map([...recipe.preferments, [name, preferment]]));
  };

  const onPrefermentChange = (name: PrefermentName, preferment: Pref) => {
    onPrefermentsChange(new Map([...recipe.preferments, [name, preferment]]));
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

export default Preferment;
