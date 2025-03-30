import { IonLabel, IonItem, IonButton, IonIcon, IonAlert } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import { useCallback, useState } from "react";

type Props = {
  name: string;
  onSelect(name: string): void;
  onRename(name: string, newName: string): void;
  onDelete(name: string): void;
};

export default function RecipeItem({ name, onSelect, onRename, onDelete }: Props) {
  const [showRenameAlert, setShowRenameAlert] = useState(false);

  const onSelectClick = useCallback(() => onSelect(name), [name, onSelect]);

  const onRenameClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setShowRenameAlert(true);
    },
    [setShowRenameAlert],
  );

  const handleRename = useCallback(
    (newName: string) => {
      if (newName && newName.trim() !== "") {
        onRename(name, newName.trim());
      }
      setShowRenameAlert(false);
    },
    [name, onRename],
  );

  const onDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onDelete(name);
    },
    [name, onDelete],
  );

  return (
    <>
      <IonItem
        button
        lines="full"
        onClick={onSelectClick}
        routerLink="/ingredients"
        routerDirection="none"
        detail={false}
      >
        <IonLabel slot="start">{name}</IonLabel>
        <IonButton slot="end" onClick={onRenameClick} fill="clear">
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonButton>
        <IonButton slot="end" onClick={onDeleteClick} fill="clear">
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonButton>
      </IonItem>
      <IonAlert
        isOpen={showRenameAlert}
        onDidDismiss={() => setShowRenameAlert(false)}
        header="Rename Recipe"
        inputs={[
          {
            name: "newName",
            type: "text",
            placeholder: "Enter new name",
            value: name,
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setShowRenameAlert(false);
            },
          },
          {
            text: "Rename",
            handler: (data) => {
              handleRename(data.newName);
            },
          },
        ]}
      />
    </>
  );
}
