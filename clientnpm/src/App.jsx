import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    // show user message
    setChat((prev) => [...prev, "👤 " + userMessage]);

    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: userMessage,
      });

      // show AI reply
      setChat((prev) => [...prev, "🤖 " + res.data.reply]);
    } catch (error) {
      setChat((prev) => [...prev, "🤖 Error connecting to AI"]);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>AI Chatbot 🤖</h2>

      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          padding: "10px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ padding: "10px", width: "70%" }}
      />

      <button onClick={sendMessage} style={{ padding: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default App;