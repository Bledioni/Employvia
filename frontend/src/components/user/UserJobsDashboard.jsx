import React, { useState, useEffect } from "react";
import { api } from "../..";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";
import UserNav from "./common/UserNav";


function UserJobsDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    api.get("getalljobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setJobs(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response?.data || error.message);
      });
  }, []);

  if(loading){

    return <LoadingSpinner/>

  }

  return (
    <div>
      <UserNav/>
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
