import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, backend } from "../..";
import LoadingSpinner from "../../common/LoadingSpinner";
import './style/jobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [jobLoading, setJobLoading] = useState(true); // loading for job API only
  const userId = localStorage.getItem("user_id");

  // Fetch job details
  useEffect(() => {
    setJobLoading(true);
    api
      .get(`getjob/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const jobData = res.data[0];
        setJob(jobData);
      })
      .catch((err) => console.log(err.response?.data || err.message))
      .finally(() => setJobLoading(false));
  }, [id]);

  // Fetch company details only after job is set
  useEffect(() => {
    if (!job?.company_id) return;

    api
      .get(`get-company/${job.company_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const logoUrl = res.data[0].logo;
        setCompanyName(res.data[0].company_name);

        // Preload logo
        const img = new Image();
        img.src = `${backend.defaults.baseURL}storage/${logoUrl}`;
        img.onload = () => {
          setCompanyLogo(logoUrl);
          setLogoLoaded(true);
        };
      })
      .catch((err) => console.log(err.response?.data || err.message));
  }, [job?.company_id]);

  const handleApply = () => {
    api
      .post(
        "jobapply",
        { user_id: userId, job_id: job.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        console.log("Applied successfully:", res.data);
        alert("Application submitted!");
      })
      .catch((err) => {
        console.log("Error applying:", err.response?.data || err.message);
        alert("Failed to apply.");
      });
  };

  // Show spinner only if job API is loading
  if (jobLoading || !job) return <LoadingSpinner />;

  return (
    <section className="job-details-main-container">
      <section className="job-details-company-header-main-container">
        <section className="job-details-company-header-info">
          {logoLoaded ? (
            <img
              src={`${backend.defaults.baseURL}storage/${companyLogo}`}
              alt="Company Logo"
              width={64}
              height={64}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <section
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                backgroundColor: "#ddd",
              }}
            />
          )}
          <h5>{companyName}</h5>
        </section>
        <button onClick={handleApply}>Apply</button>
      </section>
      <h1>{job.job_title}</h1>
      <section className="job-details-job-info-main-container">
        <section className="job-details-job-info-first-container">
          <p>{job.job_description}</p>
        </section>
        <section className="job-details-job-info-second-container">
          14 August
        </section>
      </section>
    </section>
  );
}

export default JobDetails;
