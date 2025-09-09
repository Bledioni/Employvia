import { useState } from "react";
import axios from "axios";

export default function AIChat() {
  const [messages, setMessages] = useState([]); // chat history
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Add user message to chat
    setMessages([...messages, { sender: "user", text: input }]);

    try {
      const response = await axios.post("http://localhost:8000/api/ai-chat", {
        message: input,
      });

      // Add AI reply to chat
      setMessages(prev => [
        ...prev,
        { sender: "user", text: input },
        { sender: "ai", text: response.data.reply },
      ]);

      setInput(""); // clear input
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Job Board AI Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          minHeight: 300,
          marginBottom: 10,
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask about jobs..."
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8 }}>
        Send
      </button>
    </div>
  );
}
