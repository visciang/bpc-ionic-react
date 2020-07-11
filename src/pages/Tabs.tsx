import React, { useState, useCallback } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import OverallTab from "pages/tabs/OverallTab";
import PrefermentTab from "pages/tabs/PrefermentTab";
import FinalDoughTab from "pages/tabs/FinalDoughTab";
import { Preferments } from "dataModel/Preferment";
import { Ingredients, IngredientName } from "dataModel/Ingredient";
import { recipe as untitledRecipe } from "dataModel/SampleRecipe";
import { equals } from "components/utils";

const Tabs: React.FC = () => {
  const [editable, setEditable] = useState(false);
  const [name] = useState(untitledRecipe.name);
  const [flours, setFlours] = useState(untitledRecipe.flours);
  const [ingredients, setIngredients] = useState(untitledRecipe.ingredients);
  const [preferments, setPreferments] = useState(untitledRecipe.preferments);
  const [availableFlours, setAvailableFlours] = useState([...untitledRecipe.flours.keys()]);
  const [availableIngredients, setAvailableIngredients] = useState([...untitledRecipe.ingredients.keys()]);

  const onFloursChange = useCallback(
    (currentFlours: Ingredients) => {
      setFlours(currentFlours);

      if (!equals([...currentFlours.keys()], [...flours.keys()])) {
        setAvailableFlours([...currentFlours.keys()]);
      }

      const deletedFlours = [...flours.keys()].filter((i) => !currentFlours.has(i));

      if (deletedFlours.length !== 0) {
        removeDeletedIngredientsFromPreferments("flours", preferments, setPreferments, deletedFlours);
      }
    },
    [setFlours, setPreferments, flours, preferments]
  );

  const onIngredientsChange = useCallback(
    (currentIngredients: Ingredients) => {
      setIngredients(currentIngredients);

      if (!equals([...currentIngredients.keys()], [...ingredients.keys()])) {
        setAvailableIngredients([...currentIngredients.keys()]);
      }

      const deletedIngredients = [...ingredients.keys()].filter((i) => !currentIngredients.has(i));

      if (deletedIngredients.length !== 0) {
        removeDeletedIngredientsFromPreferments("ingredients", preferments, setPreferments, deletedIngredients);
      }
    },
    [setIngredients, setPreferments, ingredients, preferments]
  );

  const onEditToggle = useCallback(() => setEditable(!editable), [setEditable, editable]);

  const resetEditable = useCallback(() => {
    if (editable) setEditable(false);
  }, [editable, setEditable]);

  return (
    <IonTabs onIonTabsDidChange={resetEditable}>
      <IonRouterOutlet id="main">
        <Route
          path="/overallTab"
          render={() => (
            <OverallTab
              title={name}
              flours={flours}
              ingredients={ingredients}
              editable={editable}
              onFloursChange={onFloursChange}
              onIngredientsChange={onIngredientsChange}
              onEditToggle={onEditToggle}
            />
          )}
          exact={true}
        />
        <Route
          path="/prefermentTab"
          render={() => (
            <PrefermentTab
              title={name}
              availableFlours={availableFlours}
              availableIngredients={availableIngredients}
              preferments={preferments}
              editable={editable}
              onPrefermentsChange={setPreferments}
              onEditToggle={onEditToggle}
            />
          )}
          exact={true}
        />
        <Route
          path="/finalDough"
          render={() => (
            <FinalDoughTab title={name} flours={flours} ingredients={ingredients} preferments={preferments} />
          )}
          exact={true}
        />
        {/* TODO check if needs a useCallback */}
        <Route path="/" render={() => <Redirect to="/overallTab" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="overallTab" href="/overallTab">
          <IonIcon icon={restaurantOutline} />
          <IonLabel>OVERALL</IonLabel>
        </IonTabButton>
        <IonTabButton tab="prefermentTab" href="/prefermentTab">
          <IonIcon icon={arrowUndoOutline} />
          <IonLabel>PREFERMENT</IonLabel>
        </IonTabButton>
        <IonTabButton tab="finalDough" href="/finalDough">
          <IonIcon icon={calculatorOutline} />
          <IonLabel>FINAL DOUGH</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;

const removeDeletedIngredientsFromPreferments = (
  kind: "flours" | "ingredients",
  preferments: Preferments,
  setPreferments: React.Dispatch<React.SetStateAction<Preferments>>,
  deletedIngredients: IngredientName[]
) => {
  let updatedPreferments = preferments;

  for (let [prefermentName, preferment] of preferments) {
    const updatedIngredients = new Map([...preferment[kind]].filter(([i, v]) => !deletedIngredients.includes(i)));

    if (updatedIngredients.size !== preferment[kind].size) {
      const updatedPreferment = { ...preferment, [kind]: updatedIngredients };
      updatedPreferments = new Map([...updatedPreferments, [prefermentName, updatedPreferment]]);
    }
  }

  if (updatedPreferments !== preferments) {
    setPreferments(updatedPreferments);
  }
};
