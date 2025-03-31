import { useRecipesBook, RecipesBookContextProps } from "hooks/useRecipesBook";
import { createContext, useContext, ReactNode } from "react";

const RecipesContext = createContext<RecipesBookContextProps | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const recipesState = useRecipesBook();

  return <RecipesContext.Provider value={recipesState}>{children}</RecipesContext.Provider>;
}

export function useRecipes() {
  const context = useContext(RecipesContext);

  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }

  return context;
}
