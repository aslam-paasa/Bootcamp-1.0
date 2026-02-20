import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentTab, setCurrentTab] = useState("feed");

  useEffect(function() {
    console.log("Send request to backend to get data for tab " + currentTab);
  }, [currentTab]);

  return (
    <div>
      <button onClick={() => setCurrentTab("feed")} style={{color: currentTab == "feed" ? "red" : "black"}}>Feed</button>
      <button onClick={() => setCurrentTab("notifications")} style={{color: currentTab == "notifications" ? "red" : "black"}}>Notifications</button>
      <button onClick={() => setCurrentTab("messages")} style={{color: currentTab == "messages" ? "red" : "black"}}>Messages</button>
      <button onClick={() => setCurrentTab("jobs")} style={{color: currentTab == "jobs" ? "red" : "black"}}>Jobs</button>
    </div>
  )
}

export default App
