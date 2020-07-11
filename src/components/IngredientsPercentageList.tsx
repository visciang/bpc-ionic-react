import React, { useCallback } from "react";
import { IonList, IonReorderGroup } from "@ionic/react";
import { ItemReorderEventDetail } from "@ionic/core";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import NewItemInput from "components/NewItemInput";
import IngredientPercentageItem from "components/IngredientPercentageItem";
import { mapMove, mapDelete } from "components/utils";
import { IngredientName, Ingredients, IngredientValue } from "dataModel/Ingredient";

type Props = {
  title: string;
  ingredients: Ingredients;
  maxPercentage?: number;
  editable: boolean;
  onIngredientsChange(ingredients: Ingredients): void;
};

let IngredientsPercentageList: React.FC<Props> = ({
  title,
  ingredients,
  maxPercentage,
  editable,
  onIngredientsChange,
}) => {
  const onIngredientChange = useCallback(
    (name: IngredientName, value: IngredientValue) => onIngredientsChange(new Map([...ingredients, [name, value]])),
    [ingredients, onIngredientsChange]
  );

  const onIngredientReorder = useCallback(
    (event: CustomEvent<ItemReorderEventDetail>) => {
      onIngredientsChange(mapMove(ingredients, event.detail.from, event.detail.to));
      event.detail.complete();
    },
    [ingredients, onIngredientsChange]
  );

  const onNewIngredient = useCallback(
    (name: IngredientName) => onIngredientsChange(new Map([...ingredients, [name, undefined]])),
    [ingredients, onIngredientsChange]
  );

  const onDeleteIngredient = useCallback((name: IngredientName) => onIngredientsChange(mapDelete(ingredients, name)), [
    ingredients,
    onIngredientsChange,
  ]);

  return (
    <IonList lines="none">
      <IngredientsTitleToolbar title={title} />
      <IonReorderGroup disabled={!editable} onIonItemReorder={onIngredientReorder}>
        {[...ingredients].map(([name, value]) => (
          <IngredientPercentageItem
            key={name}
            name={name}
            value={value}
            maxPercentage={maxPercentage}
            editable={editable}
            onChange={onIngredientChange}
            onDelete={onDeleteIngredient}
          />
        ))}
      </IonReorderGroup>
      <NewItemInput onNewItem={onNewIngredient} />
    </IonList>
  );
};

export default IngredientsPercentageList = React.memo(IngredientsPercentageList);
