import NewItemInput from "components/NewItemInput";
import PrefermentPercentageList from "components/PrefermentPercentageList";
import PrefermentSelector from "components/PrefermentSelector";
import { mapDelete, mapSet } from "components/utils";
import { PrefermentKind, Preferment as PrefermentT, PrefermentName } from "dataModel/Preferment";
import { RecipesBookContextProps } from "hooks/useRecipesBook";
import { useState, useCallback, useMemo } from "react";

type Props = {
  editable: boolean;
  recipesBookCtx: RecipesBookContextProps;
};

export default function PrefermentsView({ editable, recipesBookCtx }: Props) {
  const [prefermentKind, setPrefermentKind] = useState<PrefermentKind | undefined>(undefined);

  const recipe = recipesBookCtx.currentRecipe;
  const onEditRecipe = recipesBookCtx.onEdit;

  const onNewPreferment = useCallback(
    (name: string) => {
      let newPreferment: PrefermentT;

      if (prefermentKind === PrefermentKind.PREDOUGH)
        newPreferment = {
          kind: PrefermentKind.PREDOUGH,
          prefermentedFlour: undefined,
          flours: new Map(),
          ingredients: new Map(),
        };
      else
        newPreferment = {
          kind: PrefermentKind.SOURDOUGH,
          prefermentedFlour: undefined,
          flours: new Map(),
          ingredients: new Map(),
          seed: undefined,
        };

      onEditRecipe({
        ...recipe,
        preferments: mapSet(recipe.preferments, name, newPreferment),
      });
      setPrefermentKind(undefined);
    },
    [prefermentKind, recipe, onEditRecipe, setPrefermentKind],
  );

  const onPrefermentChange = useCallback(
    (name: PrefermentName, preferment: PrefermentT) => {
      onEditRecipe({
        ...recipe,
        preferments: mapSet(recipe.preferments, name, preferment),
      });
    },
    [recipe, onEditRecipe],
  );

  const onPrefermentDelete = useCallback(
    (name: PrefermentName) => {
      onEditRecipe({
        ...recipe,
        preferments: mapDelete(recipe.preferments, name),
      });
    },
    [recipe, onEditRecipe],
  );

  const availableFlours = useMemo(() => [...recipe.flours.keys()], [recipe.flours]);
  const availableIngredients = useMemo(() => [...recipe.ingredients.keys()], [recipe.ingredients]);

  return (
    <>
      <div className="ion-padding-bottom">
        <PrefermentSelector value={prefermentKind} onSelect={setPrefermentKind} />
        <NewItemInput onNewItem={prefermentKind ? onNewPreferment : undefined} />
      </div>
      {[...recipe.preferments].map(([name, preferment]) => (
        <div key={name} className="border-top ion-padding-vertical">
          <PrefermentPercentageList
            name={name}
            availableFlours={availableFlours}
            availableIngredients={availableIngredients}
            preferment={preferment}
            editable={editable}
            onPrefermentChange={onPrefermentChange}
            onPrefermentDelete={onPrefermentDelete}
          />
        </div>
      ))}
    </>
  );
}
