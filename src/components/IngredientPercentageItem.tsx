import { ListItem, ListItemText, TextField, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { IngredientName, IngredientValue } from "dataModel/Ingredient";
import { useCallback, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

type Props = {
  name: IngredientName;
  value: IngredientValue;
  editable: boolean;
  onChange(name: IngredientName, value: IngredientValue): void;
  onDelete?(name: IngredientName): void;
  dragHandleProps?: any;
};

export default function IngredientPercentageItem({
  name,
  value,
  editable,
  onChange,
  onDelete,
  dragHandleProps,
}: Props) {
  const [internalValue, setInternalValue] = useState(value);
  const [debouncedValue] = useDebounce(internalValue, 300);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (internalValue === debouncedValue) {
      if (value !== internalValue) {
        onChange(name, internalValue);
      }
    }
  }, [internalValue, debouncedValue, value, onChange, name]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      if (val === "") {
        setInternalValue(undefined);
      } else {
        const num = parseFloat(val);
        if (!isNaN(num)) {
          setInternalValue(num);
        }
      }
    },
    [setInternalValue],
  );

  let children = <></>;

  if (editable) {
    if (onDelete) {
      children = (
        <>
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete && onDelete(name)}>
            <DeleteIcon />
          </IconButton>
          <Box
            {...dragHandleProps}
            sx={{ cursor: "grab", display: "inline-flex", alignItems: "center", p: 1 }}
            data-testid="drag-handle"
          >
            <DragIndicatorIcon />
          </Box>
        </>
      );
    }
  } else {
    children = (
      <TextField
        sx={{ width: "100px" }}
        size="small"
        type="text"
        inputMode="decimal"
        value={internalValue ?? ""}
        placeholder="..."
        onChange={handleChange}
      />
    );
  }

  return (
    <ListItem>
      <ListItemText primary={name} />
      {children}
    </ListItem>
  );
}
