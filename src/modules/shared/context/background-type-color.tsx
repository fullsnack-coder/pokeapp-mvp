import { colorByType } from "@/modules/shared/utils/tools";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type BackgroundTypeColorContextType = {
  backgroundColor: string;
  setTypeColor: (type: string) => void;
};

export const backgroundTypeColorContext =
  createContext<BackgroundTypeColorContextType>(
    {} as BackgroundTypeColorContextType
  );

export const useBackgroundTypeColorContext = () => {
  const context = useContext(backgroundTypeColorContext);
  if (!context) {
    throw new Error(
      "backgroundTypeColorContext must be used within a BackgroundColorProvider"
    );
  }
  return context;
};

type ColorTypes =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dark"
  | "dragon"
  | "steel"
  | "fairy";

export const BackgroundTypeColorProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [typeColor, setTypeColor] = useState<ColorTypes>("normal");

  const backgroundColor = useMemo(() => {
    return colorByType[typeColor] || colorByType["normal"];
  }, [typeColor]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.backgroundColor = `${backgroundColor}10`;
    }
  }, [backgroundColor]);

  return (
    <backgroundTypeColorContext.Provider
      value={{
        backgroundColor,
        setTypeColor: setTypeColor as (type: string) => void,
      }}
    >
      {children}
    </backgroundTypeColorContext.Provider>
  );
};

export default backgroundTypeColorContext;
