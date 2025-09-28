import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { ScaleBy } from "dataModel/Recipe";
import { useCallback } from "react";

type Props = {
  onSelect: (value: ScaleBy) => void;
  value?: ScaleBy;
};

export default function ScaleBySelector({ onSelect, value }: Props) {
  const handleChange = useCallback(
    (event: SelectChangeEvent<ScaleBy>) => {
      onSelect(event.target.value as ScaleBy);
    },
    [onSelect],
  );

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="scale-by-select-label">Scale by</InputLabel>
      <Select
        labelId="scale-by-select-label"
        id="scale-by-select"
        value={value || ""}
        label="Scale by"
        onChange={handleChange}
      >
        {Object.values(ScaleBy).map((scaleByValue) => (
          <MenuItem key={scaleByValue} value={scaleByValue}>
            {scaleByValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
