  import React, { useState, useEffect } from "react";
  import { api } from "../..";
  import { useNavigate } from "react-router-dom";
  import LoadingSpinner from "../../common/LoadingSpinner";
  import UserNav from "./common/UserNav";
  import UserSideBar from "./common/UserSideBar";
  import "./style/userDashboard.css";

  function UserJobsDashboard() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
      api
        .get("getalljobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setJobs(res.data.data);
        })
        .catch((error) => {
          console.log(error.response?.data || error.message);
        })
        .finally(() => setLoading(false));
    }, [token]);

    if (loading) {
      return <LoadingSpinner />;
    }

  return (
  <div>
    <UserNav />
    <div className="user-dashboard-main-container">
      <UserSideBar />

      <div className="user-jobs-table-wrapper">
        <table className="user-jobs-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Role</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const expireDate = new Date(job.expiration_date);
              const today = new Date();
              const daysRemaining = Math.ceil(
                (expireDate - today) / (1000 * 60 * 60 * 24)
              );
              const status =
                daysRemaining > 0 ? (
                  <span className="status-active">
                    <i className="fa-solid fa-circle-check"></i> Active
                  </span>
                ) : (
                  <span className="status-expired">
                    <i className="fa-solid fa-circle-xmark"></i> Expired
                  </span>
                );

              return (
                <tr key={job.id}>
                  <td>
                    <h3>{job.job_title}</h3>
                    {daysRemaining > 0 && (
                      <p className="days-remaining">
                        {daysRemaining} days remaining
                      </p>
                    )}
                  </td>
                  <td>{job.job_role}</td>
                  <td>{job.city}</td>
                  <td>{status}</td>
                  <td>
                    <button
                      className="user-jobs-btn"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      Job Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


  }

  export default UserJobsDashboard;
