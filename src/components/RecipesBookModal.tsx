import { useCallback, useRef } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonToast,
  UseIonToastResult,
} from "@ionic/react";
import { closeOutline, downloadOutline, pushOutline } from "ionicons/icons";
import RecipeItem from "./RecipeItem";
import NewItemInput from "./NewItemInput";
import { exportRecipes, importRecipes } from "../dataModel/Persistence";

export type RecipesBookContextProps = {
  recipes: string[];
  onNew(name: string): void;
  onSelect(name: string): void;
  onRename(name: string, newName: string): void;
  onDelete(name: string): void;
  reload(): void;
};

type Props = {
  recipesBookCtx: RecipesBookContextProps;
  isOpen: boolean;
  onClose?(): void;
};

export default function RecipesBookModal({ recipesBookCtx, isOpen, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useIonToast();

  const onSelect = useCallback(
    (name: string) => {
      recipesBookCtx.onSelect(name);
      onClose?.();
    },
    [recipesBookCtx, onClose],
  );

  const onRename = useCallback(
    (name: string, newName: string) => {
      recipesBookCtx.onRename(name, newName);
    },
    [recipesBookCtx],
  );

  const onDelete = useCallback(
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
      handleImport(event, toast, () => {
        recipesBookCtx.reload();
      });
    },
    [toast, recipesBookCtx],
  );

  return (
    <IonModal isOpen={isOpen} backdropDismiss={false}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {onClose && (
              <IonButton onClick={onClose}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow class="ion-justify-content-center ion-margin-bottom">
          <IonCol size="auto">
            <IonButton fill="outline" onClick={handleImportClick}>
              <IonIcon icon={downloadOutline}></IonIcon>
              Import
            </IonButton>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".json"
              onChange={handleImportFile}
            />
          </IonCol>
          <IonCol size="auto">
            <IonButton fill="outline" onClick={handleExport}>
              <IonIcon icon={pushOutline}></IonIcon>
              Export
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow class="ion-justify-content-center ion-margin-bottom">Pick or create a new recipe</IonRow>
        <IonList>
          {recipesBookCtx.recipes.toSorted().map((name) => (
            <RecipeItem key={name} name={name} onSelect={onSelect} onRename={onRename} onDelete={onDelete} />
          ))}
          <NewItemInput onNewItem={recipesBookCtx.onNew} />
        </IonList>
      </IonContent>
    </IonModal>
  );
}

function handleExport() {
  const recipesJson = exportRecipes();

  // Create a blob and download link
  const blob = new Blob([recipesJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element to trigger download
  const a = document.createElement("a");
  a.href = url;
  a.download = "bread-recipes.json";
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleImport(
  event: React.ChangeEvent<HTMLInputElement>,
  [present]: UseIonToastResult,
  onComplete?: () => void,
) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const recipesJson = e.target?.result as string;
      const recipesCount = importRecipes(recipesJson);

      present({
        message: `Successfully imported ${recipesCount} recipes`,
        duration: 3000,
        color: "success",
      });

      onComplete?.();
    } catch {
      present({
        message: "Failed to import recipes. Please check the file format.",
        duration: 3000,
        color: "danger",
      });
    }

    // Reset the file input
    if (event.target) {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}
