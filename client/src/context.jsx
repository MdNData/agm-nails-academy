import { createContext, useContext } from "react";
import useDetectScreenSize from "./assets/hooks/useDetectScreenSize";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const { width, height } = useDetectScreenSize();
  return (
    <Context.Provider value={{ width, height }}>{children}</Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
