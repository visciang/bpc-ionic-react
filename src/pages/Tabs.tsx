import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import { Recipe, Ingredients, Preferments, PrefermentKind } from "../components/Recipe";
import Overall from "./tabs/Overall";
import Preferment from "./tabs/Preferment";
import FinalDough from "./tabs/FinalDough";

const untitledRecipe: Recipe = {
  name: "Untitled",
  flours: new Map([
    ["Farina 00 W300", 80],
    ["Semola Rimacinata", 20],
  ]),
  ingredients: new Map([
    ["Acqua", 73],
    ["Lievito", 0.8],
    ["Sale", 2.5],
  ]),
  preferments: new Map([
    [
      "Biga",
      {
        kind: PrefermentKind.PREDOUGH,
        prefermentedFlour: 80,
        flours: new Map([["Farina 00 W300", 100]]),
        ingredients: new Map([["Acqua", 45]]),
      },
    ],
  ]),
};

const Tabs: React.FC = () => {
  const [recipe, setRecipe] = useState(untitledRecipe);

  const onFloursChange = (flours: Ingredients) => {
    setRecipe({ ...recipe, flours: flours });
  };

  const onIngredientsChange = (ingredients: Ingredients) => {
    setRecipe({ ...recipe, ingredients: ingredients });
  };

  const onPrefermentsChange = (preferments: Preferments) => {
    setRecipe({ ...recipe, preferments: preferments });
  };

  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route
          path="/overallTab"
          render={() => (
            <Overall recipe={recipe} onFloursChange={onFloursChange} onIngredientsChange={onIngredientsChange} />
          )}
          exact={true}
        />
        <Route
          path="/prefermentTab"
          render={() => <Preferment recipe={recipe} onPrefermentsChange={onPrefermentsChange} />}
          exact={true}
        />
        <Route path="/finalDough" render={() => <FinalDough recipe={recipe} />} exact={true} />
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
