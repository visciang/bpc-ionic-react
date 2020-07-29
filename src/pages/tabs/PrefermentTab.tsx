import React, { useState, useCallback } from "react";
import NewItemInput from "components/NewItemInput";
import PrefermentSelector from "components/PrefermentSelector";
import PrefermentPercentageList from "components/PrefermentPercentageList";
import {
  Preferments,
  PrefermentKind,
  Preferment as PrefermentT,
  PrefermentName,
  Preferment,
} from "dataModel/Preferment";
import { IngredientName } from "dataModel/Ingredient";

type Props = {
  availableFlours: IngredientName[];
  availableIngredients: IngredientName[];
  preferments: Preferments;
  editable: boolean;
  onPrefermentsChange(preferments: Preferments): void;
};

let PrefermentTab: React.FC<Props> = ({
  availableFlours,
  availableIngredients,
  preferments,
  editable,
  onPrefermentsChange,
}) => {
  const [prefermentKind, setPrefermentKind] = useState<PrefermentKind | undefined>(undefined);

  const onNewPreferment = useCallback(
    (name: string) => {
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

      onPrefermentsChange(new Map([...preferments, [name, newPreferment]]));
      setPrefermentKind(undefined);
    },
    [prefermentKind, preferments, onPrefermentsChange, setPrefermentKind]
  );

  const onPrefermentChange = useCallback(
    (name: PrefermentName, preferment: PrefermentT) =>
      onPrefermentsChange(new Map([...preferments, [name, preferment]])),
    [preferments, onPrefermentsChange]
  );

  const onPrefermentDelete = useCallback(
    (name: PrefermentName) => {
      let newPreferments = new Map(preferments);
      newPreferments.delete(name);
      onPrefermentsChange(newPreferments);
    },
    [preferments, onPrefermentsChange]
  );

  return (
    <>
      <div className="ion-padding-bottom">
        <PrefermentSelector value={prefermentKind} onSelect={setPrefermentKind} />
        <NewItemInput onNewItem={prefermentKind ? onNewPreferment : undefined} />
      </div>
      {[...preferments].map(([name, preferment]) => (
        <div key={name} className="border-top ion-padding-vertical">
          <PrefermentPercentageListWrap
            name={name}
            availableFlours={availableFlours}
            availableIngredients={availableIngredients}
            preferment={preferment}
            editable={editable}
            onPrefermentChange={onPrefermentChange}
            onPrefermentDelete={onPrefermentDelete}
          />
        </div>
      ))}
    </>
  );
};

export default PrefermentTab = React.memo(PrefermentTab);

type XProps = {
  name: PrefermentName;
  availableFlours: IngredientName[];
  availableIngredients: IngredientName[];
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(name: PrefermentName, preferment: Preferment): void;
  onPrefermentDelete(name: PrefermentName): void;
};

const PrefermentPercentageListWrap: React.FC<XProps> = React.memo(
  ({ name, availableFlours, availableIngredients, preferment, editable, onPrefermentChange, onPrefermentDelete }) => {
    const _onPrefermentChange = useCallback((preferment: PrefermentT) => onPrefermentChange(name, preferment), [
      name,
      onPrefermentChange,
    ]);

    const _onPrefermentDelete = useCallback(() => onPrefermentDelete(name), [name, onPrefermentDelete]);

    return (
      <PrefermentPercentageList
        title={name}
        availableFlours={availableFlours}
        availableIngredients={availableIngredients}
        preferment={preferment}
        editable={editable}
        onPrefermentChange={_onPrefermentChange}
        onPrefermentDelete={_onPrefermentDelete}
      />
    );
  }
);
