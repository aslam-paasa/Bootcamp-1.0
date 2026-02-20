/**
 * Assignment: Auto-Scrolling Chat Box
 * 
 * Create a chat application component that automatically scrolls to the bottom 
 * whenever a new message is added. This demonstrates a practical use case of 
 * useRef for DOM manipulation in a real-world scenario like chat applications.
 * 
 * Key concepts:
 * - Using useRef to reference a DOM element (chat box container)
 * - Auto-scrolling using scrollTop and scrollHeight properties
 * - State management for messages
 * - useEffect for handling side effects after message updates
 */

import { useEffect } from "react";
import { useRef, useState } from "react";

function App() {
  return (
    <div>
      <Chat />
    </div>
  )
}

function Chat() {
  const [messages, setMessages] = useState(["Hello!", "How are you?"]);
  const chatBoxRef = useRef(null);

  /**
   * Function to simulate adding new messages:
  */
 const addMessage = () => {
  setMessages((prevMessages) => [...prevMessages, "New Message"]);
 };

 /**
  * Scroll to the bottom whenever a new message is added:
 */
useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div>
      <div 
        ref={chatBoxRef}
        style={{ height: "200px", overflow: "scroll", border: "1px solid black", padding: "10px" }}
      >
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <button onClick={addMessage}>Add Message</button> 
    </div>
  )
}

export default App
