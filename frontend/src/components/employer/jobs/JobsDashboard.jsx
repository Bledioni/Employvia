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

        <div className="jobs-dashboard">
            <div>
                <JobsDashboardNav />
            </div>
            <div className="jobs-dashboard-container">

            <div className="jobs-dashboard-side-bar-container">
                <JobsDashboardSideBar/>
            </div>
            
           <div className="jobs-dashboard-main-container">
             <h5>Hello, {companyName}</h5>
             <p id="jobs-dashboard-main-container-paragraph">Here is your daily activities and applications</p>

            <div className="jobs-dashboard-main-container-jobs-counter">
                
                <div className="jobs-dashboard-counter-container">
                    <h4>{jobs.length}</h4>
                    <p>Total Job Post</p>
                </div>

                <div className="jobs-dashboard-main-container-jobs-counter-bag">
                    <i class="fa-solid fa-briefcase"></i>
                </div>
                
            </div>
            <p>Recently Job Posted</p>

                {jobs.map((job) => {

                const expireDate = new Date(job.expiration_date);
                const today = new Date();

                const diffTime = expireDate-today;

                const daysRemaining = Math.ceil(diffTime / (1000 * 60 *60 *24));
                
                const status = daysRemaining > 0 
                ? (
                    <span style={{color:'#228B22'}}>
                        <i className="fa-solid fa-circle-check"></i> Active
                    </span>
                    ) 
                : (
                    <span style={{color: '#e74c3c'}}>
                        <i className="fa-solid fa-circle-xmark"></i> Expired
                    </span>
                    );                return(

                <div key={job.id}>
                <div className="job-table-wrapper">    
                    <table className="job-table">
                        <thead>
                        <tr>
                            <th>JOBS</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                            <h3>{job.job_title}</h3>
                            <p>{daysRemaining} days remaining</p>
                            </td>
                            <td>
                            <p>{status}</p>
                            </td>
                            <td>
                            <button>View Application</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>

                    
                </div>

                )
                })}
                </div>
        </div>
        </div>

    )

}

export default JobsDashboard;