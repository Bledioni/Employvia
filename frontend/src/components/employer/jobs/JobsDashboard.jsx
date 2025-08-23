import axios from "axios";
import react, { useState } from "react";

function JobsDashboard(){

    const companyName = localStorage.getItem('company_name')
    const companyId = localStorage.getItem('company_id');
    const token = localStorage.getItem('token');
    const [jobsCount , setJobsCount] = useState(0);

    axios.get(`getalljobs/${companyId}` , {

        headers:  {
            
            "Authorization": `Bearer ${localStorage.getItem("token")}`,

        }    
    })
    .then(res => {

        console.log(res.data);

    })
    .catch(err => {

        console.log("Error" , err.res.data);

    })

    return(

        <div className="jobs-dashboard-container">
            <h1>Hello {companyName}</h1>
        </div>

    )

}

export default JobsDashboard;