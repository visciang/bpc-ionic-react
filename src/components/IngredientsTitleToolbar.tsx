import { IonTitle, IonToolbar, IonButton, IonIcon, IonText } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

type Props = {
  title: string;
  showPercentageLabel: boolean;
  onDelete?(): void;
};

export default function IngredientsTitleToolbar({ title, showPercentageLabel, onDelete }: Props) {
  const deleteButton = onDelete ? (
    <IonButton size="small" slot="end" onClick={onDelete} fill="clear">
      <IonIcon slot="icon-only" icon={trashOutline} />
    </IonButton>
  ) : showPercentageLabel ? (
    <IonText className="ion-padding-horizontal" slot="end">
      %
    </IonText>
  ) : undefined;

  return (
    <IonToolbar>
      <IonTitle>{title}</IonTitle>
      {deleteButton}
    </IonToolbar>
  );
}
