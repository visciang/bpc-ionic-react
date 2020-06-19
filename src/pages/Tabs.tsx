import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import { OrderedMap, Set } from "immutable";
import { Overall as OverallTab } from "./tabs/Overall";
import { Preferment as PrefermentTab } from "./tabs/Preferment";
import { FinalDough as FinalDoughTab } from "./tabs/FinalDough";
import { makeRecipe, Recipe } from "../components/dataModel/Recipe";
import { PrefermentKind, Preferments, makePreferment } from "../components/dataModel/Preferment";
import { Ingredients } from "../components/dataModel/Ingredient";

const untitledRecipe: Recipe = makeRecipe({
  name: "Untitled",
  flours: OrderedMap([
    ["Farina 00 W300", 80],
    ["Semola Rimacinata", 20],
  ]),
  ingredients: OrderedMap([
    ["Acqua", 73],
    ["Lievito", 0.8],
    ["Sale", 2.5],
  ]),
  preferments: OrderedMap([
    [
      "Biga",
      makePreferment({
        kind: PrefermentKind.PREDOUGH,
        prefermentedFlour: 80,
        flours: OrderedMap([
          ["Farina 00 W300", 50],
          ["Semola Rimacinata", 50],
        ]),
        ingredients: OrderedMap([["Acqua", 45]]),
      }),
    ],
  ]),
});

const Tabs: React.FC = () => {
  const [recipe, setRecipe] = useState(untitledRecipe);

  const onPrefermentsChange = (preferments: Preferments) => {
    setRecipe(recipe.set("preferments", preferments));
  };

  const onIngredientsChange = (kind: "flours" | "ingredients", ingredients: Ingredients) => {
    let preferments: Preferments = recipe.preferments;

    for (let [prefermentName, preferment] of recipe.preferments) {
      preferments = preferments.setIn(
        [prefermentName, kind],
        updatePrefermentIngredients(preferment[kind], ingredients)
      );
    }

    setRecipe(recipe.set(kind, ingredients).set("preferments", preferments));
  };

  const updatePrefermentIngredients = (prefermentFlours: Ingredients, flours: Ingredients): Ingredients => {
    const removedFlours = Set(prefermentFlours.keys()).subtract(flours.keys());
    return prefermentFlours.deleteAll(removedFlours);
  };

  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route
          path="/overallTab"
          render={() => (
            <OverallTab
              recipe={recipe}
              onFloursChange={(flours) => onIngredientsChange("flours", flours)}
              onIngredientsChange={(ingredients) => onIngredientsChange("ingredients", ingredients)}
            />
          )}
          exact={true}
        />
        <Route
          path="/prefermentTab"
          render={() => <PrefermentTab recipe={recipe} onPrefermentsChange={onPrefermentsChange} />}
          exact={true}
        />
        <Route path="/finalDough" render={() => <FinalDoughTab recipe={recipe} />} exact={true} />
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
