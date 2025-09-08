import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, backend } from "../..";
import LoadingSpinner from "../../common/LoadingSpinner";
import "./style/jobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [companyLoading, setCompanyLoading] = useState(true);
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

    setCompanyLoading(true);
    api
      .get(`get-company/${job.company_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setCompany(res.data[0]);
      })
      .catch((err) => console.log(err.response?.data || err.message))
      .finally(() => setCompanyLoading(false));

  }, [job?.company_id]);

  const handleApply = () => {
      api
        .post(
          "jobapply",
          { user_id: userId, job_id: job.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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

    const handleAddToFavorites = () => {

      api.post('add-to-favorites' , {

        user_id:userId,
        job_id:job.id,

        headers:{

          Authorization: `Bearer ${localStorage.getItem("token")}`,

        }

      }
    )

    }

    

  // Show spinner only if job API is loading
  if (jobLoading || !job) return <LoadingSpinner />;

  return (
    <section className="job-details-main-container">
      <section className="job-details-company-header-main-container">
        {companyLoading ? (
          <section
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
              backgroundColor: "#ddd",
            }}
          />
        ) : (
          company && (
            <section className="job-details-company-header-info">
              {company.logo ? (
                <img
                  src={`${backend.defaults.baseURL}storage/${company.logo}`}
                  alt={`${company.name} Logo`}
                  width={64}
                  height={64}
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <section
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    backgroundColor: "#ddd",
                  }}
                />
              )}
              <h5>{company?.name}</h5>
            </section>
          )
        )}
        <section className="job-details-company-header-info-apply-bookmark">
          <button onClick={handleApply}>Apply</button>
          <button onClick={handleAddToFavorites}><i class="fa-solid fa-bookmark"></i></button>
        </section>
      </section>

      <h1>{job.job_title}</h1>

      <section className="job-details-job-info-main-container">
        <section className="job-details-job-info-first-container">
          <p>{job.job_description}</p>
        </section>
        <section className="job-details-job-info-second-container">
          <section className="job-detail-job-info-second-container-first-type">
            <section className="job-detail-job-info-second-container-first-type-first-half">
              <section className="job-details-job-info-text-container">
                <i class="fa-solid fa-calendar"></i>
                <p>Founded In</p>
                <h5>{company?.year_of_establishment}</h5>
              </section>
              <section className="job-details-job-info-text-container">
                <i class="fa-solid fa-stopwatch"></i>
                <p>Organization Type</p>
                <h5>{company?.organization_type}</h5>
              </section>
            </section>

            <section className="job-detail-job-info-second-container-first-type-first-half">
              <section className="job-details-job-info-text-container">
                <i class="fa-solid fa-wallet"></i>
                <p>Team Size</p>
                <h5>{company?.team_size}</h5>
              </section>
              <section className="job-details-job-info-text-container">
                <i class="fa-solid fa-industry"></i>
                <p>Industry Type</p>
                <h5>{company?.industry_type}</h5>
              </section>
            </section>
          </section>

          <section className="job-detail-job-info-second-container-second-type">
            <h3>Contact Information</h3>
            <section className="job-detail-job-info-contact-info-container">
              <i class="fa-solid fa-globe"></i>
              <section className="job-detail-info-contact-info-inner-container">
                <p>WEBSITE</p>
                <p>{company?.company_website}</p>
              </section>
            </section>
            <section className="job-detail-job-info-contact-info-container">
              <i className="fa-solid fa-phone-volume"></i>
              <section className="job-detail-info-contact-info-inner-container">
                <p>PHONE</p>
                <p>{company?.phone}</p>
              </section>
            </section>
            <section className="job-detail-job-info-contact-info-container">
              <i class="fa-solid fa-envelope"></i>
              <section className="job-detail-info-contact-info-inner-container">
                <p>EMAIL ADDRESS</p>
                <p>{company?.email}</p>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}

export default JobDetails;
