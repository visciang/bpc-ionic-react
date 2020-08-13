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
  const [recipeEdited, setRecipeEdited] = useState(false);
  const [saveAsAlert, setSaveAsAlert] = useState(false);

  const [name, setName] = useState(DEFAULT_NAME);
  const [flours, setFlours] = useState(DEFAULT_FLOURS);
  const [ingredients, setIngredients] = useState(DEFAULT_INGREDIENTS);
  const [preferments, setPreferments] = useState(DEFAULT_PREFERMENTS);

  const [availableFlours, setAvailableFlours] = useState(DEFAULT_AVAILABLE_FLOURS);
  const [availableIngredients, setAvailableIngredients] = useState(DEFAULT_AVAILABLE_INGREDIENTS);

  const setWithRecipeEditedNotification = useCallback(
    <Something,>(setSomething: React.Dispatch<React.SetStateAction<Something>>) => {
      return (something: Something) => {
        setSomething(something);
        setRecipeEdited(true);
      };
    },
    [setRecipeEdited]
  );

  const setFloursWithRecipeEditedNotification = useCallback(setWithRecipeEditedNotification(setFlours), [
    setWithRecipeEditedNotification,
    setFlours,
  ]);
  const setIngredientsWithRecipeEditedNotification = useCallback(setWithRecipeEditedNotification(setIngredients), [
    setWithRecipeEditedNotification,
    setIngredients,
  ]);
  const setPrefermentsWithRecipeEditedNotification = useCallback(setWithRecipeEditedNotification(setPreferments), [
    setWithRecipeEditedNotification,
    setPreferments,
  ]);

  const removeDeletedIngredientsFromPreferments = useCallback(
    (kind: "flours" | "ingredients", deletedIngredients: IngredientName[]) => {
      let updatedPreferments = preferments;

      for (let [prefermentName, preferment] of preferments) {
        const updatedIngredients = new Map([...preferment[kind]].filter(([i, v]) => !deletedIngredients.includes(i)));

        if (updatedIngredients.size !== preferment[kind].size) {
          const updatedPreferment = { ...preferment, [kind]: updatedIngredients };
          updatedPreferments = new Map([...updatedPreferments, [prefermentName, updatedPreferment]]);
        }
      }

      if (updatedPreferments !== preferments) {
        setPrefermentsWithRecipeEditedNotification(updatedPreferments);
      }
    },
    [preferments, setPrefermentsWithRecipeEditedNotification]
  );

  const onFloursChange = useCallback(
    (currentFlours: Ingredients) => {
      setFloursWithRecipeEditedNotification(currentFlours);

      if (!listEquals([...currentFlours.keys()], [...flours.keys()])) {
        setAvailableFlours([...currentFlours.keys()]);
      }

      const deletedFlours = [...flours.keys()].filter((i) => !currentFlours.has(i));

      if (deletedFlours.length !== 0) {
        removeDeletedIngredientsFromPreferments("flours", deletedFlours);
      }
    },
    [setFloursWithRecipeEditedNotification, removeDeletedIngredientsFromPreferments, flours]
  );

  const onIngredientsChange = useCallback(
    (currentIngredients: Ingredients) => {
      setIngredientsWithRecipeEditedNotification(currentIngredients);

      if (!listEquals([...currentIngredients.keys()], [...ingredients.keys()])) {
        setAvailableIngredients([...currentIngredients.keys()]);
      }

      const deletedIngredients = [...ingredients.keys()].filter((i) => !currentIngredients.has(i));

      if (deletedIngredients.length !== 0) {
        removeDeletedIngredientsFromPreferments("ingredients", deletedIngredients);
      }
    },
    [setIngredientsWithRecipeEditedNotification, removeDeletedIngredientsFromPreferments, ingredients]
  );

  const onEditToggle = useCallback(() => setEditable((editable) => !editable), [setEditable]);

  const onSaveRecipe = useCallback(
    ({ name }) => {
      const newRecipe: Recipe = {
        name: name,
        flours: flours,
        ingredients: ingredients,
        preferments: preferments,
      };

      if (recipes.find((r) => r.name === newRecipe.name) !== undefined) {
        setRecipes((recipes) => recipes.map((r) => (r.name === newRecipe.name ? newRecipe : r)));
      } else {
        setRecipes((recipes) => [...recipes, newRecipe]);
      }

      setName(name);
      setRecipeEdited(false);
    },
    [recipes, flours, ingredients, preferments, setRecipes, setRecipeEdited, setName]
  );

  const onSave = useCallback(() => {
    setSaveAsAlert(true);
  }, [setSaveAsAlert]);

  const onLoadRecipe = useCallback(
    (recipe: Recipe) => {
      setName(recipe.name);
      setFlours(recipe.flours);
      setIngredients(recipe.ingredients);
      setPreferments(recipe.preferments);
      setAvailableFlours([...recipe.flours.keys()]);
      setAvailableIngredients([...recipe.ingredients.keys()]);
      setRecipeEdited(false);
    },
    [setName, setFlours, setIngredients, setPreferments, setAvailableFlours, setAvailableIngredients]
  );

  const onDeleteRecipe = useCallback(
    (recipe: Recipe): void => setRecipes((recipes) => recipes.filter((x) => x !== recipe)),
    [setRecipes]
  );

  const onReset = useCallback(() => {
    setEditable(DEFAULT_EDITABLE);
    setName(DEFAULT_NAME);
    setFlours(DEFAULT_FLOURS);
    setIngredients(DEFAULT_INGREDIENTS);
    setPreferments(DEFAULT_PREFERMENTS);
    setAvailableFlours(DEFAULT_AVAILABLE_FLOURS);
    setAvailableIngredients(DEFAULT_AVAILABLE_INGREDIENTS);
    setRecipeEdited(false);
  }, [
    setEditable,
    setName,
    setFlours,
    setIngredients,
    setPreferments,
    setAvailableFlours,
    setAvailableIngredients,
    setRecipeEdited,
  ]);

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
              recipeEdited={recipeEdited}
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
            <Tab
              title={name}
              editActive={editable}
              recipeEdited={recipeEdited}
              onEditToggle={onEditToggle}
              onSave={onSave}
              onReset={onReset}
            >
              <PrefermentTab
                availableFlours={availableFlours}
                availableIngredients={availableIngredients}
                preferments={preferments}
                editable={editable}
                onPrefermentsChange={setPrefermentsWithRecipeEditedNotification}
              />
            </Tab>
          )}
          exact={true}
        />
        <Route
          path="/finalDough"
          render={() => (
            <Tab title={name} recipeEdited={recipeEdited} onSave={onSave} onReset={onReset}>
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
                editable={editable}
                name={name}
                recipes={recipes}
                showSaveAsAlert={saveAsAlert}
                setShowSaveAsAlert={setSaveAsAlert}
                onSaveRecipe={onSaveRecipe}
                onLoadRecipe={onLoadRecipe}
                onDeleteRecipe={onDeleteRecipe}
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
