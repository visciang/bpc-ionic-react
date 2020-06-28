import React from "react";
import { useRecoilState } from "recoil";
import Tab from "pages/tabs/Tab";
import IngredientsPercentageList from "components/IngredientsPercentageList";
import * as State from "state/State";

const OverallTab: React.FC = React.memo(() => {
  const [editable] = useRecoilState(State.editable);
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
});

export default OverallTab;
