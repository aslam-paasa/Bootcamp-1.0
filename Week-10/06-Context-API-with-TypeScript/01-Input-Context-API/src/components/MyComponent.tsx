import { useContext } from "react";
import MyContext from "../context/MyContext";

const MyComponent = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("MyComponent must be used within a MyContextProvider");
  }

  const { value, setValue } = context;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <p>Value: {value}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
};

export default MyComponent;
