import React, { useState, useEffect } from "react";
import { api } from "../..";
import './style/appliedJobs.css';
import { useNavigate } from "react-router-dom";
import UserSideBar from './common/UserSideBar';
import UserNav from "./common/UserNav";


export default function AppliedJobs() {
  const userID = localStorage.getItem("user_id");
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const navigate = useNavigate();

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
  <>
  <UserNav/>
  <div className="applied-jobs-main-container">
    <UserSideBar/>
    <div className="applied-jobs-table-wrapper">
      <table className="applied-jobs-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>City</th>
            <th>Tags</th>
            <th>Min Salary</th>
            <th>Max Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.map((job) => (
            <tr key={job.id}>
              <td>{job.job_title}</td>
              <td>{job.city}</td>
              <td>{job.tags}</td>
              <td>{job.min_salary}</td>
              <td>{job.max_salary}</td>
              <td>
                <button
                  className="applied-jobs-btn"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  Job Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  </>
);



}
