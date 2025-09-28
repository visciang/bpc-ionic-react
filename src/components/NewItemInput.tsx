import { TextField, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useCallback } from "react";

type Props = {
  onNewItem?(name: string): void;
};

export default function NewItemInput({ onNewItem }: Props) {
  const [newItem, setNewItem] = useState<string>("");

  const handleClick = useCallback(() => {
    if (onNewItem) {
      const trimmedItem = newItem.trim();
      if (trimmedItem) {
        onNewItem(trimmedItem);
        setNewItem("");
      }
    }
  }, [newItem, onNewItem]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewItem(event.target.value);
    },
    [setNewItem],
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="New ..."
        value={newItem}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      />
      <IconButton onClick={handleClick} disabled={!newItem.trim() || !onNewItem} aria-label="Add item">
        <AddIcon />
      </IconButton>
    </Box>
  );
}
