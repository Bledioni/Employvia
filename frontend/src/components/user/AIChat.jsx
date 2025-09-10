import { useState } from "react";
import axios from "axios";
import { api } from "../..";
import UserSideBar from '../user/common/UserSideBar'
import './style/aiChat.css';

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [jobId, setJobId] = useState(null);
  const [jobs, setJobs] = useState([]);

  const sendMessage = () => {
    if (!input) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    axios
      .post("http://localhost:8000/api/ai-chat", { message: input })
      .then((response) => {
        
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: response.data.reply },
        ]);

        setInput("");
        setJobId(response.data.job_id);

        if (response.data.job_id) {
          api
            .get(`getjob/${response.data.job_id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              console.log("Job details:", res.data);
              setJobs(res.data);
            })
            .catch((err) => console.error("Error fetching job:", err));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="ai-chat-main-container">
      <UserSideBar/>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>EmployVia AI Chat</h2>
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
    </div>
  );
}
