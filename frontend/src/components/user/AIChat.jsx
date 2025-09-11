import { useState } from "react";
import { api } from "../../index";
import UserSideBar from "../user/common/UserSideBar";
import "./style/aiChat.css";
import UserNav from "./common/UserNav";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const sendMessage = () => {
    if (!input) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    api
      .post("ai-chat", { message: input })
      .then((response) => {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: response.data.reply },
        ]);

        setInput("");
        setJobIds(response.data.job_ids || []);

        if (response.data.job_ids && response.data.job_ids.length > 0) {
          Promise.all(
            response.data.job_ids.map((id) =>
              api.get(`getjob/${id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
            )
          )
            .then((results) => {
              const fetchedJobs = results.map((res) => res.data[0]);
              setJobs(fetchedJobs);

              console.log("Fetched jobs:", fetchedJobs);
            })
            .catch((err) => console.error("Error fetching jobs:", err));
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

          {/* Jobs list */}
          {jobs.length > 0 && (
            <div className="ai-chat-table-wrapper">
              <table className="user-jobs-table">
                <tbody>
                  {jobs.map((job, index) => {
                    const expireDate = new Date(job.expiration_date);
                    const today = new Date();
                    const daysRemaining = Math.ceil(
                      (expireDate - today) / (1000 * 60 * 60 * 24)
                    );
                    const status =
                      daysRemaining > 0 ? (
                        <span style={{ color: "#228B22" }}>
                          <i className="fa-solid fa-circle-check"></i> Active
                        </span>
                      ) : (
                        <span style={{ color: "#e74c3c" }}>
                          <i className="fa-solid fa-circle-xmark"></i> Expired
                        </span>
                      );

                    return (
                      <motion.tr
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <td>
                          <h3 style={{ fontSize: "20px" }}>{job.job_title}</h3>
                          {daysRemaining > 0 && (
                            <p>{daysRemaining} days remaining</p>
                          )}
                        </td>
                        <td>
                          <p>{job.job_role}</p>
                        </td>
                        <td>
                          <p>{job.city}</p>
                        </td>
                        <td>
                          <p>{status}</p>
                        </td>
                        <td>
                          <button onClick={() => navigate(`/jobs/${job.id}`)}>
                            Job Details
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
