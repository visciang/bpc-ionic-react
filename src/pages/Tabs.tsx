import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import OverallTab from "pages/tabs/OverallTab";
import PrefermentTab from "pages/tabs/PrefermentTab";
import FinalDoughTab from "pages/tabs/FinalDoughTab";
import { Preferments } from "dataModel/Preferment";
import { Ingredients } from "dataModel/Ingredient";
import { recipe as untitledRecipe } from "dataModel/SampleRecipe";

const Tabs: React.FC = () => {
  const [editable, setEditable] = useState(false);
  const [name] = useState(untitledRecipe.name);
  const [flours, setFlours] = useState(untitledRecipe.flours);
  const [ingredients, setIngredients] = useState(untitledRecipe.ingredients);
  const [preferments, setPreferments] = useState(untitledRecipe.preferments);

  const onIngredientsChange = (kind: "flours" | "ingredients", ingredients: Ingredients) => {
    const _preferments = removeDeletedIngredientsFromPreferments(preferments, kind, ingredients);
    (kind === "flours" ? setFlours : setIngredients)(ingredients);
    setPreferments(_preferments);
  };

  const onEditToggle = () => setEditable(!editable);

  const resetEditable = () => {
    if (editable) setEditable(false);
  };

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
              onFloursChange={(flours) => onIngredientsChange("flours", flours)}
              onIngredientsChange={(ingredients) => onIngredientsChange("ingredients", ingredients)}
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
              flours={flours}
              ingredients={ingredients}
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
  preferments: Preferments,
  kind: "flours" | "ingredients",
  ingredients: Ingredients
) => {
  let updatedPreferments = preferments;

  for (let [prefermentName, preferment] of preferments) {
    const updatedIngredients = new Map(
      [...preferment[kind]].filter(([ingredientName, ingredientValue]) => ingredients.has(ingredientName))
    );

    const updatedPreferment = { ...preferment, [kind]: updatedIngredients };
    updatedPreferments = new Map([...updatedPreferments, [prefermentName, updatedPreferment]]);
  }

  return updatedPreferments;
};
