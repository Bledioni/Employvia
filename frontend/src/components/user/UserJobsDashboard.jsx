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

  useEffect(() => {
    api
      .get("getalljobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setJobs(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response?.data || error.message);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <UserNav />
      <div className="user-dashboard-main-container">
        <UserSideBar />
        <div className="user-jobs-table-wrapper">
          {jobs.map((job) => (
          <div key={job.id}>
            <div>
              <table className="user-jobs-table">
                <thead></thead>
                <tbody>
                  <tr>
                    <td>
                      <h3>{job.job_title}</h3>
                      {<p>{job.job_role}</p>}
                    </td>
                    <td>
                      <p>{job.city}</p>
                    </td>
                    <td>
                      <p>{job.expiration_date}</p>
                    </td>
                    <td>
                      <button onClick={() => navigate(`/jobs/${job.id}`)}>
                        Job Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default UserJobsDashboard;
