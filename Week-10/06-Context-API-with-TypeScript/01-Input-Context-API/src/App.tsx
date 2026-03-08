import MyComponent from "./components/MyComponent.tsx";
import { MyContextProvider } from "./context/MyContext.tsx";

export default function Home() {
  return (
    <MyContextProvider>
      <MyComponent />
    </MyContextProvider>
  );
}
