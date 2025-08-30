import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../..";
import LoadingSpinner from "../../common/LoadingSpinner";

function JobDetails() {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get(`getjob/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {

        setJobs(res.data)
        console.log(res.data);

      }) 
      .catch((err) => console.log(err.response?.data || err.message));
  }, [id]);

  if (!jobs) return <LoadingSpinner/>;

  return (
    <div>
      {jobs.map((job) => {
        
        return(

            <div key={job.id}>

            <h1>{job.job_title}</h1>
        </div>

        )

      })}
    </div>
  );
}

export default JobDetails;
