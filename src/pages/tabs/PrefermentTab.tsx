import React, { useState } from "react";
import Tab from "pages/tabs/Tab";
import NewItemInput from "components/NewItemInput";
import PrefermentSelector from "components/PrefermentSelector";
import PrefermentPercentageList from "components/PrefermentPercentageList";
import { Preferments, PrefermentKind, Preferment as PrefermentT, PrefermentName } from "dataModel/Preferment";
import { Ingredients } from "dataModel/Ingredient";

type Props = {
  title: string;
  flours: Ingredients;
  ingredients: Ingredients;
  preferments: Preferments;
  editable: boolean;
  onPrefermentsChange(preferments: Preferments): void;
  onEditToggle(): void;
};

const PrefermentTab: React.FC<Props> = ({
  title,
  flours,
  ingredients,
  preferments,
  editable,
  onPrefermentsChange,
  onEditToggle,
}) => {
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

    onPrefermentsChange(new Map([...preferments, [name, newPreferment]]));
    setPrefermentKind(undefined);
  };

  const onPrefermentChange = (name: PrefermentName, preferment: PrefermentT) =>
    onPrefermentsChange(new Map([...preferments, [name, preferment]]));

  const onPrefermentDelete = (name: PrefermentName) => {
    let newPreferments = new Map(preferments);
    newPreferments.delete(name);
    onPrefermentsChange(newPreferments);
  };

  return (
    <Tab title={title} editActive={editable} onEditToggle={onEditToggle}>
      <div className="ion-padding-bottom">
        <PrefermentSelector value={prefermentKind} onSelect={setPrefermentKind} />
        <NewItemInput onNewItem={prefermentKind ? onNewPreferment : undefined} />
      </div>
      {[...preferments].map(([name, preferment]) => (
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
      ))}
    </Tab>
  );
};

export default PrefermentTab;
