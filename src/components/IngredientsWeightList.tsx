import { Grid, Paper, Typography } from "@mui/material";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import { sum } from "components/utils";
import { Ingredients } from "dataModel/Ingredient";

export type Props = {
  title: string;
  ingredientsPercentage: Ingredients;
  ingredientsWeight: Ingredients;
};

export default function IngredientsWeightList({ title, ingredientsPercentage, ingredientsWeight }: Props) {
  const totalWeight = sum(ingredientsWeight.values());
  const totalWeightStr = numberToString(totalWeight);

  return (
    <Paper elevation={2} sx={{ my: 2 }}>
      <IngredientsTitleToolbar title={title} showPercentageLabel={false} />
      <Grid container spacing={2} sx={{ p: 2 }}>
        {/* Header */}
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: "bold" }}>INGREDIENT</Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontWeight: "bold" }}>%</Typography>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontWeight: "bold" }}>WEIGHT</Typography>
          </Grid>
        </Grid>

        {/* Data Rows */}
        {[...ingredientsPercentage]
          .filter(([name]) => ingredientsWeight.has(name) && ingredientsWeight.get(name) !== 0)
          .map(([name, percentage], idx) => (
            <Grid
              item
              container
              xs={12}
              key={`${idx}-${name}`}
              sx={{ bgcolor: idx % 2 === 0 ? "action.hover" : "transparent", py: 0.5 }}
            >
              <Grid item xs={6}>
                <Typography>{name}</Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "right" }}>
                <Typography>{numberToString(percentage)}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                {numberToString(ingredientsWeight.get(name)) ? (
                  <Typography>{numberToString(ingredientsWeight.get(name))}</Typography>
                ) : (
                  <Typography color="error">ERROR !</Typography>
                )}
              </Grid>
            </Grid>
          ))}

        {/* Total Row */}
        <Grid item container xs={12} sx={{ mt: 1, borderTop: 1, borderColor: "divider", pt: 1 }}>
          <Grid item xs={8} />
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            {totalWeightStr ? (
              <Typography sx={{ fontWeight: "bold" }}>{totalWeightStr}</Typography>
            ) : (
              <Typography color="error" sx={{ fontWeight: "bold" }}>
                ERROR !
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

function numberToString(value: number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}
