import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import InfoAlert from "components/InfoAlert";
import RecipesBookModal from "components/RecipesBookModal";
import { useRecipes } from "contexts/RecipesContext";
import { useEditToggle } from "hooks/useEditToggle";
import { pencilOutline, informationCircleOutline, bookOutline } from "ionicons/icons";
import { ReactNode, useCallback, useState } from "react";

type Props = {
  allowEditing?: boolean;
  render: (editable: boolean) => ReactNode;
};

export default function Tab({ render, allowEditing = false }: Props) {
  const recipesBookCtx = useRecipes();
  const [showInfo, setShowInfo] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);

  const editToggle = useEditToggle();

  const onInfo = useCallback(() => setShowInfo(true), [setShowInfo]);
  const onRecipes = useCallback(() => setShowRecipes(true), [setShowRecipes]);

  const editButton = allowEditing ? (
    <IonButton fill={editToggle.editable ? "solid" : undefined} onClick={editToggle.onToggle}>
      <IonIcon icon={pencilOutline} />
    </IonButton>
  ) : undefined;

  const hideInfo = useCallback(() => setShowInfo(false), [setShowInfo]);
  const hideRecipes = useCallback(() => setShowRecipes(false), [setShowRecipes]);

  const title = recipesBookCtx.currentRecipe.name;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onInfo}>
              <IonIcon icon={informationCircleOutline} />
            </IonButton>
            <IonButton onClick={onRecipes}>
              <IonIcon icon={bookOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">{editButton}</IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <InfoAlert isOpen={showInfo} onDidDismiss={hideInfo} />
        <RecipesBookModal
          // Prompt to select a recipe if none is selected (undefined title) or
          // if the user explicitly requested to see the recipes
          isOpen={title === undefined || showRecipes}
          onClose={title === undefined ? undefined : hideRecipes}
          recipesBookCtx={recipesBookCtx}
        />
        {render(editToggle.editable)}
      </IonContent>
    </IonPage>
  );
}
