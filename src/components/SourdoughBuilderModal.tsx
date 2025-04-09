import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import IngredientPercentageItem from "components/IngredientPercentageItem";
import IngredientsTitleToolbar from "components/IngredientsTitleToolbar";
import IngredientsWeightList from "components/IngredientsWeightList";
import { onIonChangeFloat } from "components/utils";
import { IngredientName, Ingredients, IngredientValue } from "dataModel/Ingredient";
import { closeOutline } from "ionicons/icons";
import { useCallback, useState } from "react";

const INPUT_DEBOUNCE_MS = 300;

type SourdoughBuilderModalProps = {
  isOpen: boolean;
  onClose?(): void;
};

export default function SourdoughBuilderModal({ isOpen, onClose }: SourdoughBuilderModalProps) {
  const [starter, setStarter] = useState<number | undefined>(undefined);
  const [hydration, setHydration] = useState<number | undefined>(undefined);
  const [builds, setBuilds] = useState<number | undefined>(1);
  const [total, setTotal] = useState<number | undefined>(undefined);

  const [buildPercentage, buildsWeights] = calculateBuildWeights(starter, hydration, builds, total);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Sourdough Builder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <Total builds={builds} total={total} setBuilds={setBuilds} setTotal={setTotal} />
        </div>
        <FeedRatio starter={starter} hydration={hydration} setStarter={setStarter} setHydration={setHydration} />
        <IonText>
          <h1 className="ion-text-center">BUILDS</h1>
        </IonText>
        {buildsWeights.map((buildWeight, idx) => (
          <IngredientsWeightList
            key={idx}
            title={`# ${idx + 1}`}
            ingredientsPercentage={buildPercentage}
            ingredientsWeight={buildWeight}
          />
        ))}
      </IonContent>
    </IonModal>
  );
}

type TotalProps = {
  builds: number | undefined;
  total: number | undefined;
  setBuilds: (value?: number) => void;
  setTotal: (value?: number) => void;
};

function Total({ builds, total, setBuilds, setTotal }: TotalProps) {
  return (
    <>
      <IonItem lines="none">
        <IonLabel>Builds</IonLabel>
        <IonInput
          className="ion-padding-horizontal ion-text-right"
          type="number"
          inputMode="numeric"
          placeholder="..."
          value={builds}
          onIonInput={onIonChangeFloat(builds, setBuilds)}
          debounce={INPUT_DEBOUNCE_MS}
        />
        <IonText>#</IonText>
      </IonItem>
      <IonItem lines="none">
        <IonLabel>Total</IonLabel>
        <IonInput
          className="ion-padding-horizontal ion-text-right"
          type="number"
          inputMode="numeric"
          placeholder="..."
          value={total}
          onIonInput={onIonChangeFloat(total, setTotal)}
          debounce={INPUT_DEBOUNCE_MS}
        />
        <IonText>g</IonText>
      </IonItem>
    </>
  );
}

type FeedRatioProps = {
  starter: number | undefined;
  hydration: number | undefined;
  setStarter: (value?: number) => void;
  setHydration: (value?: number) => void;
};

function FeedRatio({ starter, hydration, setStarter, setHydration }: FeedRatioProps) {
  const onStarterChange = useCallback(
    (_name: IngredientName, value: IngredientValue) => {
      setStarter(value);
    },
    [setStarter],
  );

  const onHydrationChange = useCallback(
    (_name: IngredientName, value: IngredientValue) => {
      setHydration(value);
    },
    [setHydration],
  );

  return (
    <IonList lines="none" inset={true}>
      <IngredientsTitleToolbar title="FEED RATIO" showPercentageLabel={true} />
      <IngredientPercentageItem
        name="Starter (% of Flour)"
        value={starter}
        editable={false}
        onChange={onStarterChange}
      />
      <IngredientPercentageItem
        name="Hydration (% of Flour)"
        value={hydration}
        editable={false}
        onChange={onHydrationChange}
      />
    </IonList>
  );
}

function calculateBuildWeights(
  starter: number | undefined,
  hydration: number | undefined,
  builds: number | undefined,
  total: number | undefined,
): [Ingredients, Ingredients[]] {
  const ingredientsPercentage = new Map([
    ["starter", starter],
    ["flour", 100],
    ["water", hydration],
  ]);

  if (!starter || !hydration || !builds || !total) {
    return [ingredientsPercentage, []];
  }

  const scaleFactor = 100 + starter + hydration;

  const ingredientsBuilds: Ingredients[] = [];

  for (let idx = 0; idx < builds; idx++) {
    const scaleSourdoughBuildFactor: number = total! / scaleFactor;

    const ingredientsBuild = new Map([
      ["starter", starter * scaleSourdoughBuildFactor],
      ["flour", 100 * scaleSourdoughBuildFactor],
      ["water", hydration * scaleSourdoughBuildFactor],
    ]);

    ingredientsBuilds.push(ingredientsBuild);
    total = ingredientsBuild.get("starter")!;
  }

  return [ingredientsPercentage, ingredientsBuilds.reverse()];
}
