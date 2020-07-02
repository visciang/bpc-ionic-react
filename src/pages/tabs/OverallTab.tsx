import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Tab from "pages/tabs/Tab";
import IngredientsPercentageList from "components/IngredientsPercentageList";
import * as State from "state/State";
import { propsShallowCompare } from "components/utils";

type Props = {};

const Component: React.FC<Props> = () => {
  console.log("OverallTab");

  const editable = useRecoilValue(State.editable);
  const [flours, setFlours] = useRecoilState(State.flours);
  const [ingredients, setIngredients] = useRecoilState(State.ingredients);

  return (
    <Tab editVisible={true}>
      <IngredientsPercentageList
        title="FLOURS"
        ingredients={flours}
        maxPercentage={100}
        onIngredientsChange={setFlours}
        editable={editable}
      />
      <IngredientsPercentageList
        title="INGREDIENTS"
        ingredients={ingredients}
        maxPercentage={undefined}
        onIngredientsChange={setIngredients}
        editable={editable}
      />
    </Tab>
  );
};

const OverallTab = React.memo(Component, (p: Props, n: Props) => propsShallowCompare(p, n, []));
export default OverallTab;
