import { createContext, useState } from "react";
import type { FC, ReactNode } from "react";

/**
 * Step 1: Define the shape of context data
 * - count: number
 * - increment: () => void
 * - decrement: () => void
 */
interface MyContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

/**
 * Step 2: Create the context (with undefined default for safety)
 */
export const MyContext = createContext<MyContextProps | undefined>(undefined);

/**
 * Step 3: Create the Provider component
 * - children: ReactNode
 */
interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: FC<MyProviderProps> = ({ children }: MyProviderProps) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev: number) => prev + 1);
  const decrement = () => setCount((prev: number) => prev - 1);

  return (
    <MyContext.Provider value={{ count, increment, decrement }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
