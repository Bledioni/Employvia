import React, { useEffect, useState } from "react";
import { api } from "../../..";

export default function FetchJobs(){

    const [jobs , setJobs] = useState([]);

    useEffect(() => {

        api.get('get-all-popular-jobs' , {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        })
        .then(res => {

            console.log();
            
            setJobs(res.data.all_jobs);

        })
        .catch(error => {

            console.log(error);
        })

    } , []);

    return(

        <div>
            {jobs.map((job) => (
    <h1 key={job.id}>{job.job_title}</h1>
))}
        </div>

    )

}

