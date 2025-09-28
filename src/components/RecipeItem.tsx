import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  DialogContentText,
} from "@mui/material";
import { useCallback, useState } from "react";

type Props = {
  name: string;
  onSelect(name: string): void;
  onRename(name: string, newName: string): void;
  onDelete(name: string): void;
};

export default function RecipeItem({ name, onSelect, onRename, onDelete }: Props) {
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newName, setNewName] = useState(name);

  const onSelectClick = useCallback(() => onSelect(name), [name, onSelect]);

  const onRenameClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRenameDialog(true);
  }, []);

  const onRenameClose = useCallback(() => {
    setShowRenameDialog(false);
    setNewName(name);
  }, [name]);

  const handleRename = useCallback(() => {
    if (newName && newName.trim() !== "") {
      onRename(name, newName.trim());
    }
    onRenameClose();
  }, [name, newName, onRename, onRenameClose]);

  const onDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  }, []);

  const onDeleteClose = useCallback(() => {
    setShowDeleteDialog(false);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(name);
    onDeleteClose();
  }, [name, onDelete, onDeleteClose]);

  return (
    <>
      <ListItem button onClick={onSelectClick}>
        <ListItemText primary={name} />
        <IconButton edge="end" aria-label="rename" onClick={onRenameClick}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      {/* Rename Dialog */}
      <Dialog open={showRenameDialog} onClose={onRenameClose}>
        <DialogTitle>Rename Recipe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Recipe Name"
            type="text"
            fullWidth
            variant="standard"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onRenameClose}>Cancel</Button>
          <Button onClick={handleRename}>Rename</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onClose={onDeleteClose}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete "{name}"?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
