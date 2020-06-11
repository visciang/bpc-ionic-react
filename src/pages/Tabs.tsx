import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline } from "ionicons/icons";
import { Recipe } from "../components/Recipe";
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
};

const Tabs: React.FC = () => {
  const [recipe, setRecipe] = useState(untitledRecipe);

  const onRecipeChange = (recipe: Recipe) => {
    setRecipe(recipe);
  };
  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route
          path="/overallTab"
          render={() => <Overall recipe={recipe} onRecipeChange={onRecipeChange} />}
          exact={true}
        />
        <Route path="/prefermentTab" render={() => <Preferment recipe={recipe} />} exact={true} />
        <Route path="/finalDough" render={() => <FinalDough recipe={recipe} />} exact={true} />
        <Route path="/" render={() => <Redirect to="/overallTab" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="overallTab" href="/overallTab">
          <IonIcon icon={restaurantOutline} />
          <IonLabel>OVERALL</IonLabel>
        </IonTabButton>
        <IonTabButton tab="prefermentTab" href="/prefermentTab">
          <IonIcon icon={restaurantOutline} />
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
