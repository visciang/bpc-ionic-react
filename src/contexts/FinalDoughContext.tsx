import { ScaleBy } from "dataModel/Recipe";
import { createContext, useContext, useState, ReactNode } from "react";

type FinalDoughContextType = {
  scaleBy: ScaleBy;
  setScaleBy: (scaleBy: ScaleBy) => void;
  totalAmount: number | undefined;
  setTotalAmount: (totalAmount: number | undefined) => void;
};

const FinalDoughContext = createContext<FinalDoughContextType | undefined>(undefined);

export function useFinalDough() {
  const context = useContext(FinalDoughContext);

  if (context === undefined) {
    throw new Error("useFinalDough must be used within a FinalDoughProvider");
  }

  return context;
}

type FinalDoughProviderProps = {
  children: ReactNode;
};

export function FinalDoughProvider({ children }: FinalDoughProviderProps) {
  const [scaleBy, setScaleBy] = useState<ScaleBy>(ScaleBy.DOUGH);
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  const value = {
    scaleBy,
    setScaleBy,
    totalAmount,
    setTotalAmount,
  };

  return <FinalDoughContext.Provider value={value}>{children}</FinalDoughContext.Provider>;
}
