import MyProvider from "./context/MyContext";
import MyComponent from "./components/MyComponent";

export default function Home() {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
}
