import './App.css'
import { useState, useEffect, useRef } from "react";

function App() {
  const [socket, setSocket] = useState(null);
  const inputRef = useRef();

  const sendMessage = () => {
    if (!socket) return;

    const message = inputRef.current.value;
    socket.send(message);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (event) => {
      alert(event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Ping-Pong</h1>
      <input ref={inputRef} type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
