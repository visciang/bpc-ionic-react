import { mapDelete, mapMove, mapSet } from "components/utils";
import { Recipe, newRecipe } from "dataModel/Recipe";
import { useState, useCallback, useMemo, useEffect } from "react";
import { fetchStoredRecipe, getStoredRecipes, store } from "store";

export type RecipesBookContextProps = {
  recipes: string[];
  currentRecipe: Recipe;
  onNew(name: string): void;
  onSelect(name: string): void;
  onRename(name: string, newName: string): void;
  onDelete(name: string): void;
  onEdit(recipe: Recipe): void;
  reload(): void;
};

const UNTITLED_RECIPE: Recipe = newRecipe(undefined);

export function useRecipesBook(): RecipesBookContextProps {
  const [recipes, setRecipes] = useState(getStoredRecipes());
  const [currentRecipe, setCurrentRecipe] = useState(UNTITLED_RECIPE);

  useEffect(() => {
    store(currentRecipe, recipes);
  }, [currentRecipe, recipes]);

  const onNewRecipe = useCallback(
    (name: string) => {
      const recipe = newRecipe(name);
      setRecipes(mapSet(recipes, name, recipe));
      setCurrentRecipe(recipe);
    },
    [recipes],
  );

  const onDeleteRecipe = useCallback(
    (name: string) => {
      setRecipes(mapDelete(recipes, name));
      if (name === currentRecipe.name) {
        setCurrentRecipe(UNTITLED_RECIPE);
      }
    },
    [currentRecipe.name, recipes],
  );

  const onSelectRecipe = useCallback(
    (name: string) => {
      const recipe = fetchStoredRecipe(name);
      setCurrentRecipe(recipe);
    },
    [setCurrentRecipe],
  );

  const onRenameRecipe = useCallback(
    (name: string, newName: string) => {
      const renamedRecipe = fetchStoredRecipe(name);
      renamedRecipe.name = newName;

      setRecipes(mapMove(recipes, name, newName));

      if (name === currentRecipe.name) {
        setCurrentRecipe(renamedRecipe);
      }
    },
    [currentRecipe.name, recipes, setRecipes],
  );

  const onReloadRecipes = useCallback(() => {
    setRecipes(getStoredRecipes());
  }, [setRecipes]);

  const onEditRecipe = useCallback(
    (recipe: Recipe) => {
      setCurrentRecipe(recipe);
    },
    [setCurrentRecipe],
  );

  const recipesList = useMemo(() => [...recipes.keys()], [recipes]);

  const contextValue = useMemo(
    () => ({
      recipes: recipesList,
      currentRecipe,
      onNew: onNewRecipe,
      onSelect: onSelectRecipe,
      onRename: onRenameRecipe,
      onDelete: onDeleteRecipe,
      onEdit: onEditRecipe,
      reload: onReloadRecipes,
    }),
    [
      recipesList,
      currentRecipe,
      onNewRecipe,
      onSelectRecipe,
      onRenameRecipe,
      onDeleteRecipe,
      onEditRecipe,
      onReloadRecipes,
    ],
  );

  return contextValue;
}
