import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import InfoAlert from "components/InfoAlert";
import RecipesBookModal from "components/RecipesBookModal";
import SourdoughBuilderModal from "components/SourdoughBuilderModal";
import { useEditToggle } from "hooks/useEditToggle";
import { useRecipesBook } from "hooks/useRecipesBook";
import {
  arrowUndoOutline,
  bookOutline,
  calculatorOutline,
  infiniteOutline,
  informationCircleOutline,
  pencilOutline,
  restaurantOutline,
} from "ionicons/icons";
import FinalDoughView from "pages/FinalDoughView";
import IngredientsView from "pages/IngredientsView";
import PrefermentsView from "pages/PrefermentsView";
import { useState, useCallback } from "react";

export default function Main() {
  const recipesBookCtx = useRecipesBook();

  const [showInfo, setShowInfo] = useState(false);
  const [showRecipes, setShowRecipes] = useState(false);
  const [showSourdoughBuilder, setShowSourdoughBuilder] = useState(false);

  const editToggle = useEditToggle();

  const onInfo = useCallback(() => setShowInfo(true), [setShowInfo]);
  const onRecipes = useCallback(() => setShowRecipes(true), [setShowRecipes]);
  const onSourdoughBulder = useCallback(() => setShowSourdoughBuilder(true), [setShowSourdoughBuilder]);

  const hideInfo = useCallback(() => setShowInfo(false), [setShowInfo]);
  const hideRecipes = useCallback(() => setShowRecipes(false), [setShowRecipes]);
  const hideSourdoughBuilder = useCallback(() => setShowSourdoughBuilder(false), [setShowSourdoughBuilder]);

  const [title, setTitle] = useState<string | undefined>(undefined);

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
            <IonButton onClick={onSourdoughBulder}>
              <IonIcon icon={infiniteOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill={editToggle.editable ? "solid" : undefined} onClick={editToggle.onToggle}>
              <IonIcon icon={pencilOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegmentView>
          <IonSegmentContent id="ingredients">
            <IngredientsView editable={editToggle.editable} recipesBookCtx={recipesBookCtx} />
          </IonSegmentContent>
          <IonSegmentContent id="preferments">
            <PrefermentsView editable={editToggle.editable} recipesBookCtx={recipesBookCtx} />
          </IonSegmentContent>
          <IonSegmentContent id="finalDough">
            <FinalDoughView recipesBookCtx={recipesBookCtx} />
          </IonSegmentContent>
        </IonSegmentView>
        <InfoAlert isOpen={showInfo} onDidDismiss={hideInfo} />
        <RecipesBookModal
          // Prompt to select a recipe if none is selected (undefined title) or
          // if the user explicitly requested to see the recipes
          isOpen={title === undefined || showRecipes}
          onSelect={setTitle}
          onClose={title === undefined ? undefined : hideRecipes}
          recipesBookCtx={recipesBookCtx}
        />
        <SourdoughBuilderModal isOpen={showSourdoughBuilder} onClose={hideSourdoughBuilder} />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonSegment>
            <IonSegmentButton contentId="ingredients">
              <IonIcon icon={restaurantOutline} />
              <IonLabel>INGREDIENTS</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton contentId="preferments">
              <IonIcon icon={arrowUndoOutline} />
              <IonLabel>PREFERMENTS</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton contentId="finalDough">
              <IonIcon icon={calculatorOutline} />
              <IonLabel>FINAL DOUGH</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
