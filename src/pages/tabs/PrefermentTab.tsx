import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";
import Tab from "pages/tabs/Tab";
import NewItemInput from "components/NewItemInput";
import PrefermentSelector from "components/PrefermentSelector";
import PrefermentPercentageList from "components/PrefermentPercentageList";
import { PrefermentKind, Preferment as PrefermentT } from "dataModel/Preferment";
import { prefermentsState } from "state/State";

const PrefermentTab: React.FC = React.memo(() => {
  const [prefermentKind, setPrefermentKind] = useState<PrefermentKind | undefined>(undefined);
  const [preferments, setPreferments] = useRecoilState(prefermentsState);

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

    setPreferments(
      produce(preferments, (draft) => {
        draft.set(name, newPreferment);
      })
    );

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
});

export default PrefermentTab;
