import react, { useEffect, useState } from "react";
import JobsDashboardNav from "./common/JobsDashboardNav";
import JobsDashboardSideBar from "./common/JobsDashboardSideBar";
import "../style/myJobs.css";
import { api } from "../../../index";
import LoadingSpinner from "../../../common/LoadingSpinner";
import Footer from "../../../common/Footer";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading , setLoading] = useState(true);
  const companyId = localStorage.getItem("company_id");

  useEffect(() => {
    api
      .get(`getalljobs/${companyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if(loading){

    return(

        <LoadingSpinner/>

    )

  }

  return (
    <div>
      <JobsDashboardNav />
      <div className="my-jobs-main-container">
        <JobsDashboardSideBar />
        <div className="my-jobs-container">
          {jobs.map((job) => {
            const expireDate = new Date(job.expiration_date);
            const today = new Date();

            const diffTime = expireDate - today;

            const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const status =
              daysRemaining > 0 ? (
                <span style={{ color: "#228B22" }}>
                  <i className="fa-solid fa-circle-check"></i> Active
                </span>
              ) : (
                <span style={{ color: "#e74c3c" }}>
                  <i className="fa-solid fa-circle-xmark"></i> Expired
                </span>
              );
            return (
              <div key={job.id}>
                <div className="job-table-wrapper">
                  <table className="job-table">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td>
                          <h3>{job.job_title}</h3>
                          {daysRemaining > 0 && (
                            <p>{daysRemaining} days remaining</p>
                          )}
                        </td>
                        <td>
                          <p>{job.job_type}</p>
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
            );
          })}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MyJobs;
