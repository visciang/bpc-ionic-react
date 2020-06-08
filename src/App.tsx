import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calculatorOutline, restaurantOutline } from 'ionicons/icons';
import Overall from './pages/Overall';
import Preferment from './pages/Preferment';
import FinalDough from './pages/FinalDough';
import { Recipe } from './components/Recipe';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

interface Props {
  title: string;
}

const App: React.FC = () => {
  const untitledRecipe: Recipe = {
    name: "Untitled",
    flours: [
      { name: "Farina 00 W300", value: 80 },
      { name: "Semola Rimacinata", value: 20 },
    ],
    ingredients: [
      { name: "Acqua", value: 73 },
      { name: "Lievito", value: 0.8 },
      { name: "Sale", value: 2.5 },
    ],
  };
  const [recipe,] = useState(untitledRecipe);

  return (<IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/overallTab" render={() => <Overall recipe={recipe} />} exact={true} />
          <Route path="/prefermentTab" render={() => <Preferment recipe={recipe} />} exact={true} />
          <Route path="/finalDough" render={() => <FinalDough recipe={recipe} />} />
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
    </IonReactRouter>
  </IonApp>);
};

export default App;
