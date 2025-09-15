import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FindJobSection() {
  const location = useLocation();
  const jobs = location.state?.jobs || [];
  const navigate = useNavigate();

  return (
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
  );
}
