import axios from "axios";
import react, { useEffect, useState } from "react";
import LoadingSpinner from "../../../common/LoadingSpinner";
import JobsDashboardNav from "./common/JobsDashboardNav";
import JobsDashboardSideBar from "./common/JobsDashboardSideBar";
import jobsdashboard from '../style/jobsdashboard.css';
import { api } from "../../../index.js";

function JobsDashboard(){

    const companyName = localStorage.getItem('company_name')
    const companyId = localStorage.getItem('company_id');
    const token = localStorage.getItem('token');
    
    const [jobs , setJobs] = useState([]);
    const [loading , setLoading] = useState(true);
    const [companis , setCompanies] = useState([]);

    console.log(companyId);

    useEffect(() => {

        api.get(`getalljobs/${companyId}` , {


        headers:  {
            
            "Authorization": `Bearer ${localStorage.getItem("token")}`,

        }    
    })
    .then((res) => {

        setJobs(res.data);

        if (res.data.hasCompany) {
          setCompanies(res.data.companies || []);
        } else {
          setCompanies([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err.response?.data || err.message);
        setCompanies([]);
        setLoading(false);
      });

    }, [companyId , token])

    if(loading){

        return <LoadingSpinner />

    }

    return(

        <div>
            <div>
                <JobsDashboardNav />
            </div>
            <div className="jobs-dashboard-container">

            <div className="jobs-dashboard-side-bar-container">
                <JobsDashboardSideBar/>
            </div>
            
            <h1>Hello {companyName}</h1>
            <p>Total Job Post {jobs.length}</p>
                {jobs.map((job) => {

                const expireDate = new Date(job.expiration_date);
                const today = new Date();

                const diffTime = expireDate-today;

                const daysRemaining = Math.ceil(diffTime / (1000 * 60 *60 *24));
                
                const status = daysRemaining > 0 ? 'Active' : 'Expired';
                return(

                    <div key={job.id}>
                    <h3>{job.job_title}</h3>
                    <p>{daysRemaining} days remainings</p>
                    <p>{status}</p>
                    
                </div>

                )

                })}
        </div>
        </div>

    )

}

export default JobsDashboard;