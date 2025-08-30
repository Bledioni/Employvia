import React, { useState, useEffect } from "react";
import { api } from "../..";
import { useNavigate } from "react-router-dom";

function UserJobsDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("getalljobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setJobs(res.data.data);
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
      });
  }, []);

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.job_title}</h3>
          <button onClick={() => navigate(`/jobs/${job.id}`)}>Job Details</button>
        </div>
      ))}
    </div>
  );
}

export default UserJobsDashboard;
