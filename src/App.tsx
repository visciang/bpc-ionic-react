import { useState, useCallback, useMemo } from "react";
import { Redirect, Route } from "react-router-dom";
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

import { calculatorOutline, restaurantOutline, arrowUndoOutline } from "ionicons/icons";

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
import "./theme/variables.css";
import "./theme/custom.css";

import Tab from "./pages/Tab";
import IngredientsView from "./pages/IngredientsView";
import PrefermentView from "./pages/PrefermentView";
import FinalDoughView from "./pages/FinalDoughView";
import { newRecipe, Recipe } from "./dataModel/Recipe";
import { fetchStoredRecipe, getStoredRecipes, removeStoreRecipe, setStoredRecipe } from "./dataModel/Persistence";
import { mapDelete, mapMove, mapSet } from "./components/utils";
import { RecipesBookContextProps } from "./components/RecipesBookModal";

setupIonicReact({
  innerHTMLTemplatesEnabled: true,
});

const basename = import.meta.env.BASE_URL || "/";
const UNTITLED_RECIPE: Recipe = newRecipe(undefined);

export default function App() {
  const [editable, setEditable] = useState(false);
  const [recipes, setRecipes] = useState(getStoredRecipes());
  const [recipe, setRecipe] = useState(UNTITLED_RECIPE);

  // TODO useEffect to save recipes to local storage

  const onNewRecipe = useCallback(
    (name: string) => {
      const recipe = newRecipe(name);
      setStoredRecipe(recipe);
      setRecipes(mapSet(recipes, name, recipe));
      setRecipe(recipe);
    },
    [recipes, setRecipes, setRecipe],
  );

  const onDeleteRecipe = useCallback(
    (name: string) => {
      removeStoreRecipe(name);
      setRecipes(mapDelete(recipes, name));

      if (name === recipe.name) {
        setRecipe(UNTITLED_RECIPE);
      }
    },
    [recipe.name, recipes, setRecipes, setRecipe],
  );

  const onSelectRecipe = useCallback(
    (name: string) => {
      const recipe = fetchStoredRecipe(name);
      setRecipe(recipe);
    },
    [setRecipe],
  );

  const onRenameRecipe = useCallback(
    (name: string, newName: string) => {
      const renamedRecipe = fetchStoredRecipe(name);
      renamedRecipe.name = newName;
      setStoredRecipe(renamedRecipe);
      removeStoreRecipe(name);

      setRecipes(mapMove(recipes, name, newName));

      if (name === recipe.name) {
        setRecipe(renamedRecipe);
      }
    },
    [recipe.name, recipes, setRecipe, setRecipes],
  );

  const onReloadRecipes = useCallback(() => {
    setRecipes(getStoredRecipes());
  }, [setRecipes]);

  const onEditRecipe = useCallback(
    (recipe: Recipe) => {
      setStoredRecipe(recipe);
      setRecipe(recipe);
    },
    [setRecipe],
  );

  const onEditToggle = useCallback(() => {
    setEditable((prevEditable) => !prevEditable);
  }, [setEditable]);

  const recipesBookCtx = useMemo<RecipesBookContextProps>(
    () => ({
      recipes: [...recipes.keys()],
      onNew: onNewRecipe,
      onSelect: onSelectRecipe,
      onRename: onRenameRecipe,
      onDelete: onDeleteRecipe,
      reload: onReloadRecipes,
    }),
    [recipes, onNewRecipe, onSelectRecipe, onRenameRecipe, onDeleteRecipe, onReloadRecipes],
  );

  return (
    <IonApp>
      <IonReactRouter basename={basename}>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/ingredients">
              <Tab title={recipe.name} editable={editable} onEditToggle={onEditToggle} recipesBookCtx={recipesBookCtx}>
                <IngredientsView recipe={recipe} onEditRecipe={onEditRecipe} editable={editable} />
              </Tab>
            </Route>
            <Route exact path="/prefermentTab">
              <Tab title={recipe.name} editable={editable} onEditToggle={onEditToggle} recipesBookCtx={recipesBookCtx}>
                <PrefermentView recipe={recipe} onEditRecipe={onEditRecipe} editable={editable} />
              </Tab>
            </Route>
            <Route exact path="/finalDough">
              <Tab title={recipe.name} recipesBookCtx={recipesBookCtx}>
                <FinalDoughView recipe={recipe} />
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
