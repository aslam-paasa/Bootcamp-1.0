/**
 * Assignment: Real-Time Chat Frontend using WebSocket
 * Build a real-time chat interface in React that:
 * a. Connects to a WebSocket backend
 * b. Joins a specific room
 * c. Sends and receives live chat messages instantly
 * 
 * Background:
 * > In the previous project, you built a WebSocket server that:
 *   a. Lets users join rooms (like "red", "blue", etc.)
 *   b. Broadcasts messages to everyone in the same server.
 * > Now, we'll build the frontend (client) side that:
 *   a. Connects to that server
 *   b. Joins the "red" chat room automatically
 *   c. Display messages from other users in real-time
 *   d. Send new messages when you click "Send"
 * 
 * What you'll learn:
 * a. How to connect React to a WebSocket backend
 * b. How useEffect() handles WebSocket setup and cleanup
 * c. How useState() stores live chat messages
 * d. How useRef() helps you keep a persistent WebSocket connection
 * e. What onmessage, onopen and event.data actually mean in WebSocket
*/

/**
 * Set-by-Step Instructions:
 * 1. Setting up the WebSocket Connection:
 *    > When the React component loads, we create a WebSocket connection:
 *      - const ws = new WebSocket("ws://localhost:8080");
 *    > This line opens a live connection between your browser and the 
 *      WebSocket server running at localhost:8080
 * 
 * 2. Listening for Messages (onmessage):
 * 
 *    ws.onmessage = (event) => {
 *      setMessages(prev => [...prev, event.data]);
 *    };
 *    
 *    a. ws.onmessage: A built-in WebSocket event that triggers whenever a
 *       new message arrives from the server
 *    b. event: A JS event object containing message data
 *    c. event.data: The actual message sent by the server (usually a string
 *       or JSON)
 *    So, everytime a message comes from the server, it gets added to our
 *    messages state - instantly showing on the UI!
 * 
 * 3. Joining a Room: (onopen)
 * 
 *    ws.onopen = () => {
 *      ws.send(JSON.stringify({
 *        type: "join",
 *        payload: { roomId: "red" }
 *      }));
 *    };
 *    
 *    a. ws.onopen: Runs when the WebSocket connection is successfully opened
 *    b. ws.send(): Sends data (as text) to the WebSocket server
 *    c. JSON.stringify(): Converts JS Object - string so it can be sent
 *       over WebSocket
 *    When the connection opens, the client tells the server:
 *    "Hey, I'm joining the 'red' room!"
 * 
 * 4. Sending Messages: (send())'
 * 
 *    wsRef.current.send(JSON.stringify({
 *      type: "chat",
 *      payload: { message }
 *    }));
 *    
 *    > When the user types a message and clicks Send, we take the value
 *      from the input box.
 *    > Then we send it to the server through the WebSocket connection.
 *    > The server will broadcast it to everyone in the "red" room!
 * 
 * 5. Cleanup: (onclose)
 *    > return () => ws.close();
 *    > When the react component unmounts (like when user leaves the page),
 *      we close the WebSocket connection to prevent memory leaks or server
 *      overload.
*/

/**
 * Understand useRef in this code:
 * > useRef() is used as a storage to store a value in it, and React will
 *   not erase it even when your component re-renders.
 * > You used two refs:
 *   - const wsRef = useRef(null);
 *   - const inputRef = useRef(null);
 * a. wsRef is used to store the WebSocket connection:
 *    > const ws = new WebSocket("ws://localhost:8080");
 *    > This creates a connection to the WebSocket server
 *    > Now, if you try to store this ws connection in state using useState
 *      React would re-render the component everytime you update it. That's
 *      bad for performance and can even break your live connection.
 *    > So, instead, we use:
 *      wsRef.current = ws;
 *    > This means: "Hey React, we keep this WebSocket connection safe for
 *      me - but please don't re-render the component because of it!"
 *      Later, when you want to send a message, you can still access it
 *      easily:
 * 
 *      wsRef.current.send(JSON.stringify({
 *        type: "chat",
 *        payload: { message }
 *      }));
 * 
 *    > Even if React re-renders 100 times, the same WebSocket connection
 *      remains available - safe inside wsRef.
 * 
 * b. inputRef is used to access the text input box
 *    > Normally, React uses state to manage input fields.
 *    > But for something as simple as grabbing the input on button click,
 *      useRef is easier.
 *      - const inputRef = useRef(null);
 *    > Then you connected it to your input:
 *      - <input ref={inputRef} placeholder="Type a message..." />
 *    > Now you can grab the value directly anytime:
 *      - const message = inputRef.current?.value;
 *    > This is why useRef is useful - it's like a simple storage where
 *      you can keep values without re-rendering the component.
*/

import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  /**
   * 1. State for chat messages
   */
  const [messages, setMessages] = useState(["Hello from server!"])

  /**
   * 2. Refs for WebSocket connection and input box
   */
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * 3. Setup WebSocket when component mounts
   */
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    /**
     * When a new message arrives from server
     */
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    /**
     * Store ws reference for future use
     */
    wsRef.current = ws;

    /**
     * When connection opens, join the "red" room
     */
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: { roomId: "red" }
      }));
    };

    /**
     * Cleanup: close WebSocket when component unmounts
     */
    return () => ws.close();
  }, []);

  /**
   * 4. Render chat UI
   */
  return (
    <div className="h-screen bg-black flex flex-col">
      <h2 className="text-white text-center mt-4 text-xl">💬 Real-Time Chat Room</h2>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto mt-4">
        {messages.map((msg, i) => (
          <div key={i} className="m-4">
            <span className="bg-white text-black rounded p-3 inline-block">
              {msg}
            </span>
          </div>
        ))}
      </div>

      {/* Input box and send button */}
      <div className="bg-white flex p-2">
        <input
          ref={inputRef}
          className="flex-1 p-3 border-none outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={() => {
            const message = inputRef.current?.value;
            if (message) {
              wsRef.current.send(JSON.stringify({
                type: "chat",
                payload: { message }
              }));
              inputRef.current.value = "";
            }
          }}
          className="bg-purple-600 text-white px-6 py-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
