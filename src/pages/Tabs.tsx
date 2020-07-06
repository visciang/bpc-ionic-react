import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import OverallTab from "pages/tabs/OverallTab";
import PrefermentTab from "pages/tabs/PrefermentTab";
import FinalDoughTab from "pages/tabs/FinalDoughTab";
import { Preferments } from "dataModel/Preferment";
import { Ingredients } from "dataModel/Ingredient";
import { recipe } from "dataModel/SampleRecipe";

const untitledRecipe = recipe;

const Tabs: React.FC = () => {
  const [recipe, setRecipe] = useState(untitledRecipe);
  const [editable, setEditable] = useState(false);

  const onPrefermentsChange = (preferments: Preferments) => setRecipe({ ...recipe, preferments: preferments });

  const onIngredientsChange = (kind: "flours" | "ingredients", ingredients: Ingredients) => {
    const preferments = removeDeletedIngredientsFromPreferments(recipe.preferments, kind, ingredients);
    setRecipe({ ...recipe, [kind]: ingredients, preferments: preferments });
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
              title={recipe.name}
              flours={recipe.flours}
              ingredients={recipe.ingredients}
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
              title={recipe.name}
              flours={recipe.flours}
              ingredients={recipe.ingredients}
              preferments={recipe.preferments}
              editable={editable}
              onPrefermentsChange={onPrefermentsChange}
              onEditToggle={onEditToggle}
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

const removeDeletedIngredientsFromPreferments = (
  preferments: Preferments,
  kind: "flours" | "ingredients",
  ingredients: Ingredients
) => {
  let updatedPreferments = preferments;

  for (let [prefermentName, preferment] of preferments.entries()) {
    const updatedIngredients = new Map(
      [...preferment[kind].entries()].filter(([ingredientName, ingredientValue]) => ingredients.has(ingredientName))
    );

    const updatedPreferment = { ...preferment, [kind]: updatedIngredients };
    updatedPreferments = new Map([...updatedPreferments, [prefermentName, updatedPreferment]]);
  }

  return updatedPreferments;
};
