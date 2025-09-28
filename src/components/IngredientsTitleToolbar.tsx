import { Toolbar, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  title: string;
  showPercentageLabel: boolean;
  onDelete?(): void;
};

export default function IngredientsTitleToolbar({ title, showPercentageLabel, onDelete }: Props) {
  let buttons = <></>;

  if (onDelete) {
    buttons = (
      <IconButton size="small" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    );
  } else if (showPercentageLabel) {
    buttons = <Typography sx={{ px: 2 }}>%</Typography>;
  }

  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      {buttons}
    </Toolbar>
  );
}
