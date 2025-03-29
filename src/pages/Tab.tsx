import React, { useCallback } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { pencilOutline, informationCircleOutline, bookOutline } from "ionicons/icons";
import InfoAlert from "../components/InfoAlert";
import RecipesBookModal, { RecipesBookContextProps } from "../components/RecipesBookModal";

type Props = {
  title: string | undefined;
  recipesBookCtx: RecipesBookContextProps;
  editable?: boolean;
  onEditToggle?(): void;
};

export default function Tab({
  title,
  recipesBookCtx,
  editable,
  onEditToggle,
  children,
}: Props & { children?: React.ReactNode }) {
  const [showInfo, setShowInfo] = React.useState(false);
  const [showRecipes, setShowRecipes] = React.useState(false);

  const onInfo = useCallback(() => setShowInfo(true), [setShowInfo]);
  const onRecipes = useCallback(() => setShowRecipes(true), [setShowRecipes]);

  const editButton = onEditToggle ? (
    <IonButton fill={editable ? "solid" : undefined} onClick={onEditToggle}>
      <IonIcon icon={pencilOutline} />
    </IonButton>
  ) : undefined;

  const hideInfo = useCallback(() => setShowInfo(false), [setShowInfo]);
  const hideRecipes = useCallback(() => setShowRecipes(false), [setShowRecipes]);

  return (
    <IonPage>
      <IonHeader translucent>
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
      <IonContent fullscreen className="ion-padding">
        <InfoAlert isOpen={showInfo} onDidDismiss={hideInfo} />
        <RecipesBookModal
          // Prompt to select a recipe if none is selected (undefined title) or
          // if the user explicitly requested to see the recipes
          isOpen={title === undefined || showRecipes}
          onClose={title === undefined ? undefined : hideRecipes}
          recipesBookCtx={recipesBookCtx}
        />
        {children}
      </IonContent>
    </IonPage>
  );
}
