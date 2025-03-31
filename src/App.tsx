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
import { FinalDoughProvider } from "contexts/FinalDoughContext";
import { RecipesProvider } from "contexts/RecipesContext";
import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";
import FinalDoughView from "pages/FinalDoughView";
import IngredientsView from "pages/IngredientsView";
import PrefermentView from "pages/PrefermentView";
import Tab from "pages/Tab";
/* -- */
import { useCallback } from "react";
import { Redirect, Route } from "react-router-dom";

setupIonicReact({
  innerHTMLTemplatesEnabled: true,
});

const basename = import.meta.env.BASE_URL || "/";

export default function App() {
  const renderIngredientsView = useCallback((editable: boolean) => <IngredientsView editable={editable} />, []);
  const renderPrefermentView = useCallback((editable: boolean) => <PrefermentView editable={editable} />, []);
  const renderFinalDoughView = useCallback(() => <FinalDoughView />, []);

  return (
    <IonApp>
      <IonReactRouter basename={basename}>
        <IonTabs>
          <IonRouterOutlet>
            <RecipesProvider>
              <FinalDoughProvider>
                <Route exact path="/ingredients">
                  <Tab allowEditing={true} render={renderIngredientsView} />
                </Route>
                <Route exact path="/prefermentTab">
                  <Tab allowEditing={true} render={renderPrefermentView} />
                </Route>
                <Route exact path="/finalDough">
                  <Tab allowEditing={false} render={renderFinalDoughView} />
                </Route>
                <Route exact path="/">
                  <Redirect to="/ingredients" />
                </Route>
              </FinalDoughProvider>
            </RecipesProvider>
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
