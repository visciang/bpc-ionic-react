import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import { produce, Draft } from "immer";
import { Overall as OverallTab } from "pages/tabs/Overall";
import { Preferment as PrefermentTab } from "pages/tabs/Preferment";
import { FinalDough as FinalDoughTab } from "pages/tabs/FinalDough";
import { Recipe } from "components/dataModel/Recipe";
import { PrefermentKind, Preferments } from "components/dataModel/Preferment";
import { Ingredients } from "components/dataModel/Ingredient";

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

  const onPrefermentsChange = (preferments: Preferments) => {
    setRecipe(
      produce((draft: Draft<Recipe>) => {
        draft.preferments = preferments;
      })
    );
  };

  const onIngredientsChange = (kind: "flours" | "ingredients", ingredients: Ingredients) => {
    setRecipe(
      produce((draft: Draft<Recipe>) => {
        draft[kind] = ingredients;

        for (let preferment of draft.preferments.values()) {
          const removedIngredients = [...preferment[kind].keys()].filter(
            (prefermentIngredient) => !ingredients.has(prefermentIngredient)
          );

          for (let removedIngredient of removedIngredients) {
            preferment[kind].delete(removedIngredient);
          }
        }
      })
    );
  };

  return (
    <IonTabs>
      <IonRouterOutlet id="main">
        <Route
          path="/overallTab"
          render={() => (
            <OverallTab
              title={recipe.name}
              flours={recipe.flours}
              ingredients={recipe.ingredients}
              onFloursChange={(flours) => onIngredientsChange("flours", flours)}
              onIngredientsChange={(ingredients) => onIngredientsChange("ingredients", ingredients)}
            />
          )}
          exact={true}
        />
        <Route
          path="/prefermentTab"
          render={() => (
            <PrefermentTab
              title={recipe.name}
              preferments={recipe.preferments}
              onPrefermentsChange={onPrefermentsChange}
            />
          )}
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
