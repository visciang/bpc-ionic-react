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
import { recipes as sampleRecipes } from "dataModel/SampleRecipes";
import { listEquals } from "components/utils";
import { Recipe } from "dataModel/Recipe";

const Tabs: React.FC = () => {
  const [editable, setEditable] = useState(false);

  const [recipes, setRecipes] = useState(sampleRecipes);
  const [saveAsAlert, setSaveAsAlert] = useState(false);

  const [name, setName] = useState("Untitled");
  const [flours, setFlours] = useState<Ingredients>(new Map());
  const [ingredients, setIngredients] = useState<Ingredients>(new Map());
  const [preferments, setPreferments] = useState<Preferments>(new Map());

  const [availableFlours, setAvailableFlours] = useState<IngredientName[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<IngredientName[]>([]);

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

  const onEditToggle = useCallback(() => setEditable(!editable), [setEditable, editable]);

  const onSaveRecipe = useCallback(
    ({ name }) => {
      const newRecipe: Recipe = {
        name: name,
        flours: flours,
        ingredients: ingredients,
        preferments: preferments,
      };
      saveRecipe(newRecipe, recipes, setRecipes);
    },
    [recipes, flours, ingredients, preferments, setRecipes]
  );

  const onSave = useCallback(() => {
    setSaveAsAlert(true);
  }, [setSaveAsAlert]);

  const resetEditable = useCallback(() => {
    if (editable) setEditable(false);
  }, [editable, setEditable]);

  return (
    <IonTabs onIonTabsDidChange={resetEditable}>
      <IonRouterOutlet id="main">
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
        <Route
          path="/overallTab"
          render={() => (
            <Tab title={name} editActive={editable} onEditToggle={onEditToggle} onSave={onSave}>
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
            <Tab title={name} editActive={editable} onEditToggle={onEditToggle} onSave={onSave}>
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
            <Tab title={name} onSave={onSave}>
              <FinalDoughTab flours={flours} ingredients={ingredients} preferments={preferments} />
            </Tab>
          )}
          exact={true}
        />
        <Route path="/" render={() => <Redirect to="/overallTab" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="recipes" href="/recipes">
          <IonIcon icon={bookOutline} />
          <IonLabel>RECIPES</IonLabel>
        </IonTabButton>
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
    setRecipes(recipes.map((r) => (r.name === recipe.name ? recipe : r)));
  } else {
    setRecipes([...recipes, recipe]);
  }
};
