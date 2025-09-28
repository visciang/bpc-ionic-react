import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  List,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import NewItemInput from "components/NewItemInput";
import RecipeItem from "components/RecipeItem";
import { RecipesBookContextProps } from "hooks/useRecipesBook";
import { useCallback, useRef, useState } from "react";
import { exportStoredRecipes, importStoredRecipes } from "store";

type Props = {
  isOpen: boolean;
  recipesBookCtx: RecipesBookContextProps;
  onSelect(name: string): void;
  onClose?(): void;
};

type ToastMessage = {
  message: string;
  severity: "success" | "error";
};

export default function RecipesBookModal({ isOpen, recipesBookCtx, onSelect, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const onSelectItem = useCallback(
    (name: string) => {
      recipesBookCtx.onSelect(name);
      onSelect(name);
      onClose?.();
    },
    [recipesBookCtx, onSelect, onClose],
  );

  const onRenameItem = useCallback(
    (name: string, newName: string) => {
      recipesBookCtx.onRename(name, newName);
    },
    [recipesBookCtx],
  );

  const onDeleteItem = useCallback(
    (name: string) => {
      recipesBookCtx.onDelete(name);
    },
    [recipesBookCtx],
  );

  const handleImportClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  const handleImportFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleImport(event, setToast, () => {
        recipesBookCtx.reload();
      });
    },
    [setToast, recipesBookCtx],
  );

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Recipes
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
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 2 }}>
            <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={handleImportClick}>
              Import
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".json"
              onChange={handleImportFile}
            />
            <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
              Export
            </Button>
          </Box>
          <Typography align="center" sx={{ my: 2 }}>
            Pick or create a new recipe
          </Typography>
          <List>
            {recipesBookCtx.recipes.toSorted().map((name) => (
              <RecipeItem
                key={name}
                name={name}
                onSelect={onSelectItem}
                onRename={onRenameItem}
                onDelete={onDeleteItem}
              />
            ))}
            <NewItemInput onNewItem={recipesBookCtx.onNew} />
          </List>
        </DialogContent>
      </Dialog>
      <Snackbar open={!!toast} autoHideDuration={3000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={toast?.severity} sx={{ width: "100%" }}>
          {toast?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

function handleExport() {
  const recipesJson = exportStoredRecipes();

  const blob = new Blob([recipesJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "bread-recipes.json";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleImport(
  event: React.ChangeEvent<HTMLInputElement>,
  setToast: (toast: ToastMessage) => void,
  onComplete?: () => void,
) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const recipesJson = e.target?.result as string;
      const recipesCount = importStoredRecipes(recipesJson);

      setToast({
        message: `Successfully imported ${recipesCount} recipes`,
        severity: "success",
      });

      onComplete?.();
    } catch {
      setToast({
        message: "Failed to import recipes. Please check the file format.",
        severity: "error",
      });
    }

    if (event.target) {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}
