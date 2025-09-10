import { useState } from "react";
import axios from "axios";
import { api } from "../..";
import UserSideBar from "../user/common/UserSideBar";
import "./style/aiChat.css";
import UserNav from "./common/UserNav";

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
              // setJobs(res.data);
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
    <div className="ai-chat-main">
      <UserNav />
      <div className="ai-chat-main-container">
        <UserSideBar />
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <p
                key={index}
                className={`chat-message ${
                  msg.sender === "user" ? "user" : "ai"
                }`}
              >
                <strong>{msg.sender === "user" ? "You" : "AI"}:</strong>{" "}
                {msg.text}
              </p>
            ))}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about jobs..."
              className="chat-input"
            />
            <button onClick={sendMessage} className="chat-send-btn">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
