import { useState } from "react";
import Home from "./components/Home.tsx";
import Posts from "./components/Posts.tsx";
import Contact from "./components/Contact.tsx";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "contact":
        return <Contact />;
      case "posts":
        return <Posts />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button className="border-2 p-4" onClick={() => setActiveTab("home")}>
          Home
        </button>
        <button
          className="border-2 p-4"
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </button>
        <button className="border-2 p-4" onClick={() => setActiveTab("posts")}>
          Posts
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default App;
