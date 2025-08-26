import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../style/jobsdashboardnav.css"; // make sure path is correct
import BluredProfileImage from '../../../../common/BluredProfileImage';

function JobsDashboardNav() {
  const userId = localStorage.getItem("user_id");

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/check-company/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCompanies(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error", err.response?.data || err.message);
        setLoading(false);
      });
  }, [userId]);
  

  return (
    <div className="jobs-dashboard-nav-container-logo">
  {loading ? (
    <div className="profile-placeholder">
      <BluredProfileImage />
    </div>
  ) : (
    companies.map((company) => (
      <div key={company.id}>
        <img
          src={`${axios.defaults.baseURL}/storage/${company.logo}`}
          alt="Company Logo"
        />
      </div>
    ))
  )}

  <button>Post A Job</button>
</div>

  );
}

export default JobsDashboardNav;
