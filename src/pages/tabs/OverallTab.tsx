import React from "react";
import { useRecoilState } from "recoil";
import Tab from "pages/tabs/Tab";
import IngredientsPercentageList from "components/IngredientsPercentageList";
import { floursState, ingredientsState, editableState } from "state/State";

const OverallTab: React.FC = React.memo(() => {
  const [editable] = useRecoilState(editableState);
  const [flours, setFlours] = useRecoilState(floursState);
  const [ingredients, setIngredients] = useRecoilState(ingredientsState);

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
