import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from '../socket';
import ConnectionState from "./ConnectionState";

function ChatPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const navigate = useNavigate();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // This effect runs when the component mounts
    console.log("ChatPage component mounted");

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('chat message', (msg) => {
      console.log("Received chat message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

  }, []);

  return (
    <div>
      <nav style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button onClick={() => navigate("/")}>Go to /</button>
      </nav>
      <h1>Chat Page</h1>
      <ConnectionState isConnected={isConnected} />
      <div className="message-container">
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <div className="message-text">{msg}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChatPage;