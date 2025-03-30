import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "theme/variables.css";
import "theme/custom.css";
/* -- */
import { useEditToggle } from "hooks/useEditToggle";
import { useRecipesBook } from "hooks/useRecipesBook";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import FinalDoughView from "pages/FinalDoughView";
import IngredientsView from "pages/IngredientsView";
import PrefermentView from "pages/PrefermentView";
import Tab from "pages/Tab";
/* -- */
import { Redirect, Route } from "react-router-dom";

setupIonicReact({
  innerHTMLTemplatesEnabled: true,
});

const basename = import.meta.env.BASE_URL || "/";

export default function App() {
  const recipesBookCtx = useRecipesBook();
  const editToggle = useEditToggle();

  return (
    <IonApp>
      <IonReactRouter basename={basename}>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/ingredients">
              <Tab editToggle={editToggle} recipesBookCtx={recipesBookCtx}>
                <IngredientsView
                  recipe={recipesBookCtx.currentRecipe}
                  onEditRecipe={recipesBookCtx.onEdit}
                  editable={editToggle.editable}
                />
              </Tab>
            </Route>
            <Route exact path="/prefermentTab">
              <Tab editToggle={editToggle} recipesBookCtx={recipesBookCtx}>
                <PrefermentView
                  recipe={recipesBookCtx.currentRecipe}
                  onEditRecipe={recipesBookCtx.onEdit}
                  editable={editToggle.editable}
                />
              </Tab>
            </Route>
            <Route exact path="/finalDough">
              <Tab recipesBookCtx={recipesBookCtx}>
                <FinalDoughView recipe={recipesBookCtx.currentRecipe} />
              </Tab>
            </Route>
            <Route exact path="/">
              <Redirect to="/ingredients" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="ingredientsTab" href="/ingredients">
              <IonIcon aria-hidden="true" icon={restaurantOutline} />
              <IonLabel>INGREDIENTS</IonLabel>
            </IonTabButton>
            <IonTabButton tab="prefermentTab" href="/prefermentTab">
              <IonIcon aria-hidden="true" icon={arrowUndoOutline} />
              <IonLabel>PREFERMENTS</IonLabel>
            </IonTabButton>
            <IonTabButton tab="finalDough" href="/finalDough">
              <IonIcon aria-hidden="true" icon={calculatorOutline} />
              <IonLabel>FINAL DOUGH</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}
