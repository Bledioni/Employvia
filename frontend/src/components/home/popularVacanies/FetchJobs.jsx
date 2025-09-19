import React, { useEffect, useState } from "react";
import { api } from "../../..";
import '../style/fetchJobs.css';

export default function FetchJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api
      .get("get-all-popular-jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log();

        setJobs(res.data.all_jobs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="popular-vacancies-main-container">
      <h4>Most Popular Vacancies</h4>
      <div className="popular-vacancies-jobs-container">
        {jobs.map((job) => (
          <h5 key={job.id}>{job.job_title}</h5>
        ))}
      </div>
    </div>
  );
}
