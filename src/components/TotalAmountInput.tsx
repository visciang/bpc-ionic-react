import { Box, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

type Props = {
  items?: number;
  amount?: number;
  onChangeAmount(value?: number): void;
  onChangeItems(value?: number): void;
};

export default function TotalAmountInput({ items, amount, onChangeAmount, onChangeItems }: Props) {
  const [internalItems, setInternalItems] = useState(items);
  const [internalAmount, setInternalAmount] = useState(amount);

  const [debouncedItems] = useDebounce(internalItems, 300);
  const [debouncedAmount] = useDebounce(internalAmount, 300);

  useEffect(() => {
    setInternalItems(items);
  }, [items]);

  useEffect(() => {
    setInternalAmount(amount);
  }, [amount]);

  useEffect(() => {
    if (debouncedItems !== items) {
      onChangeItems(debouncedItems);
    }
  }, [debouncedItems, items, onChangeItems]);

  useEffect(() => {
    if (debouncedAmount !== amount) {
      onChangeAmount(debouncedAmount);
    }
  }, [debouncedAmount, amount, onChangeAmount]);

  const handleFloatChange =
    (setter: (value?: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === "") {
        setter(undefined);
      } else {
        const num = parseFloat(value);
        if (!isNaN(num)) {
          setter(num);
        }
      }
    };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}>
      <Typography>Total amount</Typography>
      <TextField
        sx={{ width: "80px" }}
        type="number"
        inputMode="numeric"
        placeholder="1"
        value={internalItems ?? ""}
        onChange={handleFloatChange(setInternalItems)}
        size="small"
      />
      <Typography>x</Typography>
      <TextField
        sx={{ width: "100px" }}
        type="number"
        inputMode="decimal"
        placeholder="..."
        value={internalAmount ?? ""}
        onChange={handleFloatChange(setInternalAmount)}
        size="small"
      />
      <Typography>g</Typography>
    </Box>
  );
}
