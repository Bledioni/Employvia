import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, backend } from "../..";
import LoadingSpinner from "../../common/LoadingSpinner";

function JobDetails() {
  const { id } = useParams(); // job ID from URL
  const [jobs, setJobs] = useState([]);
  const [companyLogo , setCompanyLogo] = useState('');
  const userId = localStorage.getItem("user_id");
  const [companyId , setCompanyId] = useState('');
  useEffect(() => {
    api.get(`getjob/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {

        setJobs(res.data); // assuming Laravel returns array
        setCompanyId(res.data[0].company_id);
      
      })
      .catch(err => console.log(err.response?.data || err.message));
  }, [id]);

  if (jobs.length === 0) return <LoadingSpinner />;

  const handleApply = (jobId) => {
    api.post(
      "jobapply", // your backend route
      {
        user_id: userId,
        job_id: jobId
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then(res => {
      console.log("Applied successfully:", res.data);
      alert("Application submitted!");
    })
    .catch(err => {
      console.log("Error applying:", err.response?.data || err.message);
      alert("Failed to apply.");
    });
  };

  api.get(`get-company/${companyId}` , {

          headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

        })
        .then(res => {

          setCompanyLogo(res.data[0].logo);

        })

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>
          <h1>{job.job_title}</h1>
          <button onClick={() => handleApply(job.id)}>Apply</button>
          <img src={`${backend.defaults.baseURL}storage/${companyLogo}`} alt="" />
        </div>
      ))}
    </div>
  );
}

export default JobDetails;
