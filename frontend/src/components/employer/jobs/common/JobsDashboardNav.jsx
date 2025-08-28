import React, { useEffect, useState } from "react";
import "../../style/jobsdashboardnav.css"; 
import "../../style/JobsDashboardNavLoader.css"; 
import BluredProfileImage from "../../../../common/BluredProfileImage";
import { backend, api } from "../../../../index.js";
import { Link } from "react-router-dom";

function JobsDashboardNav() {
  const userId = localStorage.getItem("user_id");

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    api
      .get(`check-company/${userId}`)
      .then((res) => {
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
  }, [userId]);

  return (
    <div className="jobs-dashboard-nav-main-container">
      <div className="jobs-dashboard-nav-container">  
        <h2>EmployVia</h2>

        <div className="jobs-dashboard-nav-container-logo">
          <Link to='/post-job'><button>Post A Job</button></Link>

          {loading ? (
            <BluredProfileImage />
          ) : companies.length > 0 ? (
            companies.map((company) => (
              <div key={company.id}>
                <img
                  src={`${backend.defaults.baseURL}storage/${company.logo}`}
                  alt={company.company_name || "Company Logo"}
                />
              </div>
            ))
          ) : (
            <p>No company found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsDashboardNav;
