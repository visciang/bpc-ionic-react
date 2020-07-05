import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Tab from "pages/tabs/Tab";
import IngredientsPercentageList from "components/IngredientsPercentageList";
import * as State from "state/State";
import { Ingredients } from "dataModel/Ingredient";
import { Preferments } from "dataModel/Preferment";

type Props = {};

let OverallTab: React.FC<Props> = () => {
  console.log("OverallTab");

  const editable = useRecoilValue(State.editable);
  const [flours, setFlours] = useRecoilState(State.flours);
  const [ingredients, setIngredients] = useRecoilState(State.ingredients);
  const setPreferments = useSetRecoilState(State.preferments);

  const onFloursChange = useCallback(
    (flours: Ingredients) => {
      const prefermentUpdater = removeDeletedIngredientsFromPreferments("flours", flours);
      setPreferments(prefermentUpdater);
      setFlours(flours);
    },
    [setPreferments, setFlours]
  );

  const onIngredientsChange = useCallback(
    (ingredients: Ingredients) => {
      const prefermentUpdater = removeDeletedIngredientsFromPreferments("ingredients", ingredients);
      setPreferments(prefermentUpdater);
      setIngredients(ingredients);
    },
    [setPreferments, setIngredients]
  );

  return (
    <Tab editVisible={true}>
      <IngredientsPercentageList
        title="FLOURS"
        ingredients={flours}
        maxPercentage={100}
        onIngredientsChange={onFloursChange}
        editable={editable}
      />
      <IngredientsPercentageList
        title="INGREDIENTS"
        ingredients={ingredients}
        maxPercentage={undefined}
        onIngredientsChange={onIngredientsChange}
        editable={editable}
      />
    </Tab>
  );
};

export default OverallTab = React.memo(OverallTab, () => true);

const removeDeletedIngredientsFromPreferments = (kind: "flours" | "ingredients", ingredients: Ingredients) => {
  const prefermentUpdater = (preferments: Preferments) => {
    let updatedPreferments = preferments;

    for (let [prefermentName, preferment] of preferments.entries()) {
      const updatedIngredients = new Map(
        [...preferment[kind].entries()].filter(([ingredientName, ingredientValue]) => ingredients.has(ingredientName))
      );

      if (updatedIngredients.size !== preferment[kind].size) {
        const updatedPreferment = { ...preferment, [kind]: updatedIngredients };
        updatedPreferments = new Map([...updatedPreferments, [prefermentName, updatedPreferment]]);
      }
    }

    return updatedPreferments;
  };

  return prefermentUpdater;
};
