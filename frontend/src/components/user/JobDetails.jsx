import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../..";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`getjob/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setJob(res.data))
      .catch((err) => console.log(err.response?.data || err.message));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h2>{job.job_title}</h2>
      <p>Type: {job.job_type}</p>
      <p>Description: {job.description}</p>
    </div>
  );
}

export default JobDetails;
