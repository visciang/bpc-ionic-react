import { List, Paper } from "@mui/material";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IngredientPercentageItem from "components/IngredientPercentageItem";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import NewItemInput from "components/NewItemInput";
import { mapDelete, mapSet, mapMoveIdx } from "components/utils";
import { IngredientName, Ingredients, IngredientValue } from "dataModel/Ingredient";
import { useCallback, useMemo } from "react";

type SortableItemProps = {
  id: string;
  name: IngredientName;
  value: IngredientValue;
  editable: boolean;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete(name: IngredientName): void;
};

function SortableIngredientItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <IngredientPercentageItem {...props} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}

type Props = {
  title: string;
  ingredients: Ingredients;
  editable: boolean;
  onIngredientsChange(ingredients: Ingredients): void;
};

export default function IngredientsPercentageList({ title, ingredients, editable, onIngredientsChange }: Props) {
  const ingredientIds = useMemo(() => [...ingredients.keys()], [ingredients]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = ingredientIds.indexOf(active.id as string);
        const newIndex = ingredientIds.indexOf(over.id as string);
        onIngredientsChange(mapMoveIdx(ingredients, oldIndex, newIndex));
      }
    },
    [ingredientIds, ingredients, onIngredientsChange],
  );

  const onIngredientChange = useCallback(
    (name: IngredientName, value: IngredientValue) => {
      onIngredientsChange(mapSet(ingredients, name, value));
    },
    [ingredients, onIngredientsChange],
  );

  const onNewIngredient = useCallback(
    (name: IngredientName) => {
      onIngredientsChange(mapSet(ingredients, name, undefined));
    },
    [ingredients, onIngredientsChange],
  );

  const onDeleteIngredient = useCallback(
    (name: IngredientName) => {
      onIngredientsChange(mapDelete(ingredients, name));
    },
    [ingredients, onIngredientsChange],
  );

  return (
    <Paper elevation={2} sx={{ my: 2 }}>
      <IngredientsTitleToolbar title={title} showPercentageLabel={true} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ingredientIds} strategy={verticalListSortingStrategy}>
          <List dense>
            {[...ingredients].map(([name, value]) => (
              <SortableIngredientItem
                key={name}
                id={name}
                name={name}
                value={value}
                editable={editable}
                onChange={onIngredientChange}
                onDelete={onDeleteIngredient}
              />
            ))}
          </List>
        </SortableContext>
      </DndContext>
      {editable && <NewItemInput onNewItem={onNewIngredient} />}
    </Paper>
  );
}
