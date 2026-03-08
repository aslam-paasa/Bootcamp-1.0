import { useCounterStore } from "./store";
    
const OtherComponent = () => {
  /* 1. Get the actions from the store */
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      {/* 2. Use the actions */}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default OtherComponent;