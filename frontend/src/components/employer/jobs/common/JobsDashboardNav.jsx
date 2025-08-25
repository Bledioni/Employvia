import axios from "axios";
import React, { useEffect, useState } from "react";
import jobsdashboardnav from '../../style/jobsdashboardnav.css';

function JobsDashboardNav() {
    const [companies, setCompanies] = useState([]); 
    const userId = localStorage.getItem("user_id");
    const logo = localStorage.getItem('logo');


    useEffect(() => {
        axios
            .get(`check-company/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                setCompanies(data);
            })
            .catch((err) => {
                console.log("Error", err.response?.data || err.message);
            });
    }, [userId]);

    return (
        <div className="jobs-dashboard-nav-container">
            <div className="jobs-dashboard-nav-container-companyName">
                <h4>EmployVia</h4>
            </div>
            
            <div className="jobs-dashboard-nav-container-logo">
                <button>Post A Job</button>
            
            {companies.map((company, index) => (
                <img 
                key={index} 
                src={`http://localhost:8000/storage/${company.logo}`} 
                alt={`${company.name || "Company"} Logo`} 
                />

            ))}
            </div>
        </div>
    );
}

export default JobsDashboardNav;
