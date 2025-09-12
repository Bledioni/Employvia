import React, { useState, useEffect } from "react";
import { api } from "../..";

export default function AppliedJobs() {
  const userID = localStorage.getItem("user_id");
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  // 1. Fetch applied jobs
  useEffect(() => {
    api
      .get(`get-applied-jobs/${userID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
      });
  }, [userID]);

  // 2. Fetch unique job details
  useEffect(() => {
    if (jobs.length > 0) {
      // extract unique job_ids
      const uniqueJobIds = [...new Set(jobs.map((job) => job.job_id))];

      Promise.all(
        uniqueJobIds.map((jobId) =>
          api.get(`getjob/${jobId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        )
      )
        .then((responses) => {
          const details = responses.map((res) => res.data[0]); // API returns [ { job } ]
          setJobDetails(details);
          console.log("Unique Job details:", details);
        })
        .catch((error) => {
          console.log(error.response?.data || error.message);
        });
    }
  }, [jobs]);

  return (
    <div>
      <h2>Applied Jobs</h2>
      <ul>
        {jobDetails.map((job) => (
          <li key={job.id}>
            <strong>{job.job_title}</strong> - {job.job_role} <br />
            <small>Tags: {job.tags}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
