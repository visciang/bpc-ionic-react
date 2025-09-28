import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { IngredientName } from "dataModel/Ingredient";

type Props = {
  label: string;
  values: IngredientName[];
  onPick(value: IngredientName): void;
};

export default function IngredientPicker({ label, values, onPick }: Props) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value) {
      onPick(value);
    }
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value=""
        label={label}
        onChange={handleChange}
        disabled={values.length === 0}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
