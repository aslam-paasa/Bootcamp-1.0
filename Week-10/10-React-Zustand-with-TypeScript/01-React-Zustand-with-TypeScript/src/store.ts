/**
 * 1. Import the required fn:
*/
import { create } from "zustand";

/**
 * 2. Define what data and actions your store will contain:
 *    a. State (the data): count: number
 *    b. Actions (functions that update state): 
 *       > increment: () => void;
 *       > decrement: () => void;
*/
type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

/**
 * 3. Create your store:
 *    > Use the 'create' fn to build your store.
 *      a. set fn: used to update the state.
 *      b. state : gives you access to current state
 *      c. Return an object with the new state values
*/
export const useCounterStore = create<CounterStore>((set) => ({
  /* 3.a. Initial state */
  count: 0,
  /* 3.b. Actions to update state */
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));