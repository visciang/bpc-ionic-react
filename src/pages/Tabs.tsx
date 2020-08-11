import React, { useState, useCallback } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon } from "@ionic/react";
import { calculatorOutline, restaurantOutline, arrowUndoOutline, bookOutline } from "ionicons/icons";
import Tab from "pages/tabs/Tab";
import OverallTab from "pages/tabs/OverallTab";
import PrefermentTab from "pages/tabs/PrefermentTab";
import FinalDoughTab from "pages/tabs/FinalDoughTab";
import RecipesTab from "pages/tabs/RecipesTab";
import { Preferments } from "dataModel/Preferment";
import { Ingredients, IngredientName } from "dataModel/Ingredient";
import { listEquals } from "components/utils";
import { Recipe } from "dataModel/Recipe";
import { useRecipes } from "dataModel/Persistence";

const DEFAULT_EDITABLE = false;
const DEFAULT_NAME = "Untitled";
const DEFAULT_FLOURS: Ingredients = new Map();
const DEFAULT_INGREDIENTS: Ingredients = new Map();
const DEFAULT_PREFERMENTS: Preferments = new Map();
const DEFAULT_AVAILABLE_FLOURS: IngredientName[] = [];
const DEFAULT_AVAILABLE_INGREDIENTS: IngredientName[] = [];

const Tabs: React.FC = () => {
  const [editable, setEditable] = useState(DEFAULT_EDITABLE);

  const [recipes, setRecipes] = useRecipes();
  const [saveAsAlert, setSaveAsAlert] = useState(false);

  const [name, setName] = useState(DEFAULT_NAME);
  const [flours, setFlours] = useState(DEFAULT_FLOURS);
  const [ingredients, setIngredients] = useState(DEFAULT_INGREDIENTS);
  const [preferments, setPreferments] = useState(DEFAULT_PREFERMENTS);

  const [availableFlours, setAvailableFlours] = useState(DEFAULT_AVAILABLE_FLOURS);
  const [availableIngredients, setAvailableIngredients] = useState(DEFAULT_AVAILABLE_INGREDIENTS);

  const onFloursChange = useCallback(
    (currentFlours: Ingredients) => {
      setFlours(currentFlours);

      if (!listEquals([...currentFlours.keys()], [...flours.keys()])) {
        setAvailableFlours([...currentFlours.keys()]);
      }

      const deletedFlours = [...flours.keys()].filter((i) => !currentFlours.has(i));

      if (deletedFlours.length !== 0) {
        removeDeletedIngredientsFromPreferments("flours", preferments, setPreferments, deletedFlours);
      }
    },
    [setFlours, setPreferments, flours, preferments]
  );

  const onIngredientsChange = useCallback(
    (currentIngredients: Ingredients) => {
      setIngredients(currentIngredients);

      if (!listEquals([...currentIngredients.keys()], [...ingredients.keys()])) {
        setAvailableIngredients([...currentIngredients.keys()]);
      }

      const deletedIngredients = [...ingredients.keys()].filter((i) => !currentIngredients.has(i));

      if (deletedIngredients.length !== 0) {
        removeDeletedIngredientsFromPreferments("ingredients", preferments, setPreferments, deletedIngredients);
      }
    },
    [setIngredients, setPreferments, ingredients, preferments]
  );

  const onEditToggle = useCallback(() => setEditable(editable => !editable), [setEditable]);

  const onSaveRecipe = useCallback(
    ({ name }) => {
      const newRecipe: Recipe = {
        name: name,
        flours: flours,
        ingredients: ingredients,
        preferments: preferments,
      };
      saveRecipe(newRecipe, recipes, setRecipes);
      setName(name);
    },
    [recipes, flours, ingredients, preferments, setRecipes, setName]
  );

  const onSave = useCallback(() => {
    setSaveAsAlert(true);
  }, [setSaveAsAlert]);

  const onReset = useCallback(() => {
    setEditable(DEFAULT_EDITABLE);
    setName(DEFAULT_NAME);
    setFlours(DEFAULT_FLOURS);
    setIngredients(DEFAULT_INGREDIENTS);
    setPreferments(DEFAULT_PREFERMENTS);
    setAvailableFlours(DEFAULT_AVAILABLE_FLOURS);
    setAvailableIngredients(DEFAULT_AVAILABLE_INGREDIENTS);
  }, [setEditable, setName, setFlours, setIngredients, setPreferments, setAvailableFlours, setAvailableIngredients]);

  const resetEditable = useCallback(() => {
    if (editable) setEditable(false);
  }, [editable, setEditable]);

  return (
    <IonTabs onIonTabsDidChange={resetEditable}>
      <IonRouterOutlet id="main">
        <Route
          path="/overallTab"
          render={() => (
            <Tab
              title={name}
              editActive={editable}
              onEditToggle={onEditToggle}
              onSave={onSave}
              onReset={onReset}
              showInfo={true}
            >
              <OverallTab
                flours={flours}
                ingredients={ingredients}
                editable={editable}
                onFloursChange={onFloursChange}
                onIngredientsChange={onIngredientsChange}
              />
            </Tab>
          )}
          exact={true}
        />
        <Route
          path="/prefermentTab"
          render={() => (
            <Tab title={name} editActive={editable} onEditToggle={onEditToggle} onSave={onSave} onReset={onReset}>
              <PrefermentTab
                availableFlours={availableFlours}
                availableIngredients={availableIngredients}
                preferments={preferments}
                editable={editable}
                onPrefermentsChange={setPreferments}
              />
            </Tab>
          )}
          exact={true}
        />
        <Route
          path="/finalDough"
          render={() => (
            <Tab title={name} onSave={onSave} onReset={onReset}>
              <FinalDoughTab flours={flours} ingredients={ingredients} preferments={preferments} />
            </Tab>
          )}
          exact={true}
        />
        <Route
          path="/recipes"
          render={() => (
            <Tab title="Recipes" editActive={editable} onEditToggle={onEditToggle}>
              <RecipesTab
                name={name}
                recipes={recipes}
                editable={editable}
                setRecipes={setRecipes}
                setName={setName}
                setFlours={setFlours}
                setIngredients={setIngredients}
                setPreferments={setPreferments}
                setAvailableFlours={setAvailableFlours}
                setAvailableIngredients={setAvailableIngredients}
                showSaveAsAlert={saveAsAlert}
                setShowSaveAsAlert={setSaveAsAlert}
                onSaveRecipe={onSaveRecipe}
              />
            </Tab>
          )}
          exact={true}
        />
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
          <IonLabel>DOUGH</IonLabel>
        </IonTabButton>
        <IonTabButton tab="recipes" href="/recipes">
          <IonIcon icon={bookOutline} />
          <IonLabel>RECIPES</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;

const removeDeletedIngredientsFromPreferments = (
  kind: "flours" | "ingredients",
  preferments: Preferments,
  setPreferments: React.Dispatch<React.SetStateAction<Preferments>>,
  deletedIngredients: IngredientName[]
) => {
  let updatedPreferments = preferments;

  for (let [prefermentName, preferment] of preferments) {
    const updatedIngredients = new Map([...preferment[kind]].filter(([i, v]) => !deletedIngredients.includes(i)));

    if (updatedIngredients.size !== preferment[kind].size) {
      const updatedPreferment = { ...preferment, [kind]: updatedIngredients };
      updatedPreferments = new Map([...updatedPreferments, [prefermentName, updatedPreferment]]);
    }
  }

  if (updatedPreferments !== preferments) {
    setPreferments(updatedPreferments);
  }
};

const saveRecipe = (recipe: Recipe, recipes: Recipe[], setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>) => {
  if (recipes.find((r) => r.name === recipe.name) !== undefined) {
    setRecipes(recipes => recipes.map((r) => (r.name === recipe.name ? recipe : r)));
  } else {
    setRecipes(recipes => [...recipes, recipe]);
  }
};
