import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Tab from "pages/tabs/Tab";
import NewItemInput from "components/NewItemInput";
import PrefermentSelector from "components/PrefermentSelector";
import PrefermentPercentageList from "components/PrefermentPercentageList";
import { propsShallowCompare } from "components/utils";
import { PrefermentKind, Preferment as PrefermentT } from "dataModel/Preferment";
import * as State from "state/State";

type Props = {};

const Component: React.FC<Props> = () => {
  const [prefermentKind, setPrefermentKind] = useState<PrefermentKind | undefined>(undefined);
  const [preferments, setPreferments] = useRecoilState(State.preferments);

  const onNewPreferment = (name: string) => {
    if (preferments.has(name)) return;

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

    setPreferments(new Map([...preferments, [name, newPreferment]]));

    setPrefermentKind(undefined);
  };

  return (
    <Tab editVisible={true}>
      <div className="ion-padding-bottom">
        <PrefermentSelector value={prefermentKind} onSelect={setPrefermentKind} />
        <NewItemInput onNewItem={prefermentKind ? onNewPreferment : undefined} />
      </div>
      {[...preferments.keys()].map((name) => (
        <div key={name} className="border-top ion-padding-vertical">
          <PrefermentPercentageList prefermentName={name} />
        </div>
      ))}
    </Tab>
  );
};

const PrefermentTab = React.memo(Component, (p: Props, n: Props) => propsShallowCompare(p, n, []));
export default PrefermentTab;
