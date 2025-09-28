import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { PrefermentKind } from "dataModel/Preferment";
import { useCallback } from "react";

type Props = {
  value?: PrefermentKind;
  onSelect(prefermentType: PrefermentKind): void;
};

export default function PrefermentSelector({ value, onSelect }: Props) {
  const handleChange = useCallback(
    (event: SelectChangeEvent<PrefermentKind>) => {
      onSelect(event.target.value as PrefermentKind);
    },
    [onSelect],
  );

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="preferment-kind-select-label">Kind</InputLabel>
      <Select
        labelId="preferment-kind-select-label"
        id="preferment-kind-select"
        value={value || ""}
        label="Kind"
        onChange={handleChange}
      >
        {Object.keys(PrefermentKind).map((kind) => (
          <MenuItem key={kind} value={kind}>
            {kind}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
