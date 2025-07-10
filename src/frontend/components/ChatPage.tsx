import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from '../socket';
import ConnectionState from "./ConnectionState";

function ChatPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();

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
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

  }, []);

  // Function to send messages
  const sendMessage = useCallback(() => {
    if (
      isConnected &&
      inputMessage.trim() !== ''
    ) {
      socket.emit('chat message', inputMessage);

      // Clear input field after sending
      setInputMessage('');
    }
  }, [inputMessage]);

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
      <div className="input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        <button
          onClick={sendMessage}
          disabled={!isConnected || inputMessage.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;