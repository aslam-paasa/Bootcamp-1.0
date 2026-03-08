import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const MyComponent: React.FC = () => {
  const context = useContext(MyContext);

  /**
   * Handle the case when context is undefined
   */
  if (!context) {
    throw new Error("MyComponent must be used within a MyProvider");
  }

  const { count, increment, decrement } = context;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>Count: {count}</p>
      <div style={{ marginTop: "10px" }}>
        <button onClick={increment} style={buttonStyle}>Increment</button>
        <button onClick={decrement} style={{ ...buttonStyle, background: "#ef4444" }}>
          Decrement
        </button>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  background: "#3b82f6",
  color: "white",
  border: "none",
  padding: "10px 20px",
  margin: "5px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default MyComponent;
