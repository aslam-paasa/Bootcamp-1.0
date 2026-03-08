/**
 * Zustand:
 * > Zustand is a lightweight state management library for React apps.
 * > It helps you manage and share state across different parts of your
 *   app without needing to pass props through many layers or use complex
 *   solutions.
*/

import OtherComponent from "./OtherComponent";
import { useCounterStore } from "./store";

const App = () => {
  /* 1. Get the data from the store */
  const count = useCounterStore((state) => state.count);

  return (
    <div>
      {/* 2. Display the data */}
      <h1>Count: {count}</h1>
      <OtherComponent />
    </div>
  );
};

export default App;