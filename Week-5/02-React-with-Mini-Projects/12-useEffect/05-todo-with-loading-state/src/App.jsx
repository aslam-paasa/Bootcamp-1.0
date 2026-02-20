import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentTab, setCurrentTab] = useState(1); // 1
  const [tabData, setTabData] = useState({}); // 5
  const [isLoading, setIsLoading] = useState(false); // 4

  // 3
  useEffect(function() {
    console.log("Send request to backend to get data for tab " + currentTab);
    setIsLoading(true); // 6
    fetch("https://jsonplaceholder.typicode.com/todos/" + currentTab) // 7
    .then(async res => {
      const json = await res.json();
      setTabData(json); // 8
      setIsLoading(false); // 9
    })
  }, [currentTab]);

  return (
    <div>
      {/* 2 */}
      <button onClick={() => setCurrentTab(1)} style={{color: currentTab == 1 ? "red" : "black"}}>Todo 1</button>
      <button onClick={() => setCurrentTab(2)} style={{color: currentTab == 2 ? "red" : "black"}}>Todo 2</button>
      <button onClick={() => setCurrentTab(3)} style={{color: currentTab == 3 ? "red" : "black"}}>Todo 3</button>
      <button onClick={() => setCurrentTab(4)} style={{color: currentTab == 4 ? "red" : "black"}}>Todo 4</button>
      <br />

      {/* 10 */}
      {isLoading ? "Loading..." : tabData.title}
    </div>
  )
}

export default App
