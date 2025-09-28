import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { List, Paper, Box } from "@mui/material";
import IngredientPercentageItem from "components/IngredientPercentageItem";
import IngredientPicker from "components/IngredientPicker";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import { mapDelete, mapSet, mapMoveIdx } from "components/utils";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";
import { Preferment, PrefermentKind } from "dataModel/Preferment";
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
  name: string;
  availableFlours: IngredientName[];
  availableIngredients: IngredientName[];
  preferment: Preferment;
  editable: boolean;
  onPrefermentChange(name: string, preferment: Preferment): void;
  onPrefermentDelete(name: string): void;
};

export default function PrefermentPercentageList({
  name,
  availableFlours,
  availableIngredients,
  preferment,
  editable,
  onPrefermentChange,
  onPrefermentDelete,
}: Props) {
  const flourIds = useMemo(() => [...preferment.flours.keys()], [preferment.flours]);
  const ingredientIds = useMemo(() => [...preferment.ingredients.keys()], [preferment.ingredients]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleFlourDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = flourIds.indexOf(active.id as string);
        const newIndex = flourIds.indexOf(over.id as string);
        onPrefermentChange(name, { ...preferment, flours: mapMoveIdx(preferment.flours, oldIndex, newIndex) });
      }
    },
    [flourIds, name, preferment, onPrefermentChange],
  );

  const handleIngredientDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = ingredientIds.indexOf(active.id as string);
        const newIndex = ingredientIds.indexOf(over.id as string);
        onPrefermentChange(name, {
          ...preferment,
          ingredients: mapMoveIdx(preferment.ingredients, oldIndex, newIndex),
        });
      }
    },
    [ingredientIds, name, preferment, onPrefermentChange],
  );

  const onPrefermentedFlourChange = useCallback(
    (_name: IngredientName, value: IngredientValue) => {
      onPrefermentChange(name, { ...preferment, prefermentedFlour: value });
    },
    [name, preferment, onPrefermentChange],
  );

  const _onPrefermentDelete = useCallback(() => onPrefermentDelete(name), [name, onPrefermentDelete]);

  const onSeedChange = useCallback(
    (_name: IngredientName, value: IngredientValue) => {
      if (preferment.kind === PrefermentKind.SOURDOUGH) {
        onPrefermentChange(name, { ...preferment, seed: value });
      }
    },
    [name, preferment, onPrefermentChange],
  );

  const onFlourChange = useCallback(
    (flour: IngredientName, value: IngredientValue) => {
      onPrefermentChange(name, {
        ...preferment,
        flours: mapSet(preferment.flours, flour, value),
      });
    },
    [name, preferment, onPrefermentChange],
  );

  const onIngredientChange = useCallback(
    (ingredient: IngredientName, value: IngredientValue) => {
      onPrefermentChange(name, {
        ...preferment,
        ingredients: mapSet(preferment.ingredients, ingredient, value),
      });
    },
    [name, preferment, onPrefermentChange],
  );

  const onFlourDelete = useCallback(
    (flour: IngredientName) => {
      onPrefermentChange(name, {
        ...preferment,
        flours: mapDelete(preferment.flours, flour),
      });
    },
    [name, preferment, onPrefermentChange],
  );

  const onIngredientDelete = useCallback(
    (ingredient: IngredientName) => {
      onPrefermentChange(name, {
        ...preferment,
        ingredients: mapDelete(preferment.ingredients, ingredient),
      });
    },
    [name, preferment, onPrefermentChange],
  );

  const onNewFlour = useCallback(
    (flour: IngredientName) => {
      onPrefermentChange(name, {
        ...preferment,
        flours: mapSet(preferment.flours, flour, undefined),
      });
    },
    [name, preferment, onPrefermentChange],
  );

  const onNewIngredient = useCallback(
    (ingredient: IngredientName) => {
      onPrefermentChange(name, {
        ...preferment,
        ingredients: mapSet(preferment.ingredients, ingredient, undefined),
      });
    },
    [name, preferment, onPrefermentChange],
  );

  const selectableFlours = useMemo(
    () => availableFlours.filter((flour) => !preferment.flours.has(flour)),
    [availableFlours, preferment.flours],
  );
  const selectableIngredients = useMemo(
    () => availableIngredients.filter((ingredient) => !preferment.ingredients.has(ingredient)),
    [availableIngredients, preferment.ingredients],
  );

  return (
    <Paper elevation={2} sx={{ my: 2 }}>
      <IngredientsTitleToolbar
        title={name}
        onDelete={editable ? _onPrefermentDelete : undefined}
        showPercentageLabel={true}
      />
      <List dense>
        <IngredientPercentageItem
          name="Prefermented flour"
          value={preferment.prefermentedFlour}
          editable={editable}
          onChange={onPrefermentedFlourChange}
        />
        {preferment.kind === PrefermentKind.SOURDOUGH ? (
          <IngredientPercentageItem
            name="Sourdough starter"
            value={preferment.seed}
            editable={editable}
            onChange={onSeedChange}
          />
        ) : undefined}
      </List>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleFlourDragEnd}>
        <SortableContext items={flourIds} strategy={verticalListSortingStrategy}>
          <List dense>
            {[...preferment.flours].map(([name, value]) => (
              <SortableIngredientItem
                key={name}
                id={name}
                name={name}
                value={value}
                editable={editable}
                onChange={onFlourChange}
                onDelete={onFlourDelete}
              />
            ))}
          </List>
        </SortableContext>
      </DndContext>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleIngredientDragEnd}>
        <SortableContext items={ingredientIds} strategy={verticalListSortingStrategy}>
          <List dense>
            {[...preferment.ingredients].map(([name, value]) => (
              <SortableIngredientItem
                key={name}
                id={name}
                name={name}
                value={value}
                editable={editable}
                onChange={onIngredientChange}
                onDelete={onIngredientDelete}
              />
            ))}
          </List>
        </SortableContext>
      </DndContext>
      {editable && (
        <Box sx={{ p: 2 }}>
          <IngredientPicker label="Pick flour" values={selectableFlours} onPick={onNewFlour} />
          <IngredientPicker label="Pick ingredient" values={selectableIngredients} onPick={onNewIngredient} />
        </Box>
      )}
    </Paper>
  );
}
