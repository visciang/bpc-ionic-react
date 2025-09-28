import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  List,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IngredientPercentageItem from "components/IngredientPercentageItem";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import IngredientsWeightList from "components/IngredientsWeightList";
import { IngredientName, Ingredients, IngredientValue } from "dataModel/Ingredient";
import { useCallback, useState } from "react";

type SourdoughBuilderModalProps = {
  isOpen: boolean;
  onClose?(): void;
};

export default function SourdoughBuilderModal({ isOpen, onClose }: SourdoughBuilderModalProps) {
  const [starter, setStarter] = useState<number | undefined>(undefined);
  const [hydration, setHydration] = useState<number | undefined>(undefined);
  const [builds, setBuilds] = useState<number | undefined>(1);
  const [total, setTotal] = useState<number | undefined>(undefined);

  const [buildPercentage, buildsWeights] = calculateBuildWeights(starter, hydration, builds, total);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Sourdough Builder
        {onClose && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Total builds={builds} total={total} setBuilds={setBuilds} setTotal={setTotal} />
        </Box>
        <FeedRatio starter={starter} hydration={hydration} setStarter={setStarter} setHydration={setHydration} />
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          BUILDS
        </Typography>
        {buildsWeights.map((buildWeight, idx) => (
          <IngredientsWeightList
            key={idx}
            title={`# ${idx + 1}`}
            ingredientsPercentage={buildPercentage}
            ingredientsWeight={buildWeight}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}

type TotalProps = {
  builds: number | undefined;
  total: number | undefined;
  setBuilds: (value?: number) => void;
  setTotal: (value?: number) => void;
};

function Total({ builds, total, setBuilds, setTotal }: TotalProps) {
  const handleFloatChange =
    (setter: (value?: number) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value === "") {
        setter(undefined);
      } else {
        setter(parseFloat(value));
      }
    };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Builds"
        type="number"
        inputProps={{ inputMode: "numeric" }}
        value={builds ?? ""}
        onChange={handleFloatChange(setBuilds)}
        InputProps={{ endAdornment: <Typography>#</Typography> }}
        fullWidth
      />
      <TextField
        label="Total"
        type="number"
        inputProps={{ inputMode: "numeric" }}
        value={total ?? ""}
        onChange={handleFloatChange(setTotal)}
        InputProps={{ endAdornment: <Typography>g</Typography> }}
        fullWidth
      />
    </Box>
  );
}

type FeedRatioProps = {
  starter: number | undefined;
  hydration: number | undefined;
  setStarter: (value?: number) => void;
  setHydration: (value?: number) => void;
};

function FeedRatio({ starter, hydration, setStarter, setHydration }: FeedRatioProps) {
  const onStarterChange = useCallback(
    (_name: IngredientName, value: IngredientValue) => {
      setStarter(value);
    },
    [setStarter],
  );

  const onHydrationChange = useCallback(
    (_name: IngredientName, value: IngredientValue) => {
      setHydration(value);
    },
    [setHydration],
  );

  return (
    <List dense>
      <IngredientsTitleToolbar title="FEED RATIO" showPercentageLabel={true} />
      <IngredientPercentageItem name="Starter (% of Flour)" value={starter} editable={false} onChange={onStarterChange} />
      <IngredientPercentageItem
        name="Hydration (% of Flour)"
        value={hydration}
        editable={false}
        onChange={onHydrationChange}
      />
    </List>
  );
}

function calculateBuildWeights(
  starter: number | undefined,
  hydration: number | undefined,
  builds: number | undefined,
  total: number | undefined,
): [Ingredients, Ingredients[]] {
  const ingredientsPercentage = new Map([
    ["starter", starter],
    ["flour", 100],
    ["water", hydration],
  ]);

  if (!starter || !hydration || !builds || !total) {
    return [ingredientsPercentage, []];
  }

  const scaleFactor = 100 + starter + hydration;

  const ingredientsBuilds: Ingredients[] = [];

  for (let idx = 0; idx < builds; idx++) {
    const scaleSourdoughBuildFactor: number = total! / scaleFactor;

    const ingredientsBuild = new Map([
      ["starter", starter * scaleSourdoughBuildFactor],
      ["flour", 100 * scaleSourdoughBuildFactor],
      ["water", hydration * scaleSourdoughBuildFactor],
    ]);

    ingredientsBuilds.push(ingredientsBuild);
    total = ingredientsBuild.get("starter")!;
  }

  return [ingredientsPercentage, ingredientsBuilds.reverse()];
}
