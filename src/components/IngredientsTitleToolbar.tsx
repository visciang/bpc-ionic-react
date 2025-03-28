import { IonTitle, IonToolbar, IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

type Props = {
  title: string;
  onDelete?(): void;
};

export default function IngredientsTitleToolbar({ title, onDelete }: Props) {
  const deleteButton = onDelete ? (
    <IonButton size="small" slot="end" onClick={onDelete} fill="clear">
      <IonIcon slot="icon-only" icon={trashOutline} />
    </IonButton>
  ) : undefined;

  return (
    <IonToolbar>
      <IonTitle className="ion-text-center">{title}</IonTitle>
      {deleteButton}
    </IonToolbar>
  );
}
