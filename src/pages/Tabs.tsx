import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import { Recipe, Ingredients, Preferments, PrefermentKind, Preferment as Pref } from "../components/Recipe";
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
        flours: new Map([
          ["Farina 00 W300", 50],
          ["Semola Rimacinata", 50],
        ]),
        ingredients: new Map([["Acqua", 45]]),
      },
    ],
  ]),
};

const Tabs: React.FC = () => {
  const [recipe, setRecipe] = useState(untitledRecipe);

  const onFloursChange = (flours: Ingredients) => {
    let preferments: Preferments = new Map([...recipe.preferments]);

    for (let [prefermentName, preferment] of recipe.preferments) {
      preferments.set(prefermentName, updatePrefermentFlours(preferment, flours));
    }

    setRecipe({ ...recipe, flours: flours, preferments: preferments });
  };

  const onIngredientsChange = (ingredients: Ingredients) => {
    let preferments: Preferments = new Map([...recipe.preferments]);

    for (let [prefermentName, preferment] of recipe.preferments) {
      preferments.set(prefermentName, updatePrefermentIngredients(preferment, ingredients));
    }

    setRecipe({ ...recipe, ingredients: ingredients, preferments: preferments });
  };

  const onPrefermentsChange = (preferments: Preferments) => {
    setRecipe({ ...recipe, preferments: preferments });
  };

  const updatePrefermentFlours = (preferment: Pref, flours: Ingredients): Pref => {
    let result: Pref = { ...preferment, flours: new Map([...preferment.flours]) };

    for (let prefermentFlour of result.flours.keys()) {
      if (!flours.has(prefermentFlour)) {
        result.flours.delete(prefermentFlour);
      }
    }

    return result;
  };

  const updatePrefermentIngredients = (preferment: Pref, ingredients: Ingredients): Pref => {
    let result: Pref = { ...preferment, ingredients: new Map([...preferment.ingredients]) };

    for (let prefermentIngredient of result.ingredients.keys()) {
      if (!ingredients.has(prefermentIngredient)) {
        result.ingredients.delete(prefermentIngredient);
      }
    }

    return result;
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
