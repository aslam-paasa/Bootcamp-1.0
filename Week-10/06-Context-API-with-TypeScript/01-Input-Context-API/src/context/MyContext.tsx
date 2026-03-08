import { createContext, type ReactNode, useState } from "react";
import type { FC } from "react";

type MyContextData = {
  value: string;
  setValue: (newValue: string) => void;
};

const MyContext = createContext<MyContextData | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
};

export const MyContextProvider: FC<MyContextProviderProps> = ({ children }) => {
  const [value, setValue] = useState<string>("");

  const contextValue: MyContextData = {
    value,
    setValue,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyContext;
