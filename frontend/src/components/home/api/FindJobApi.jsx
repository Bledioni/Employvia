import React, { useState } from "react";
import { api } from "../../../index";
import { useNavigate } from "react-router-dom";
import "../style/findJobApi.css";
import guestImage from '../../../images/GuestPage/image.png'
import GetAllJobs from "./GetAllJobs";

function FindJobApi() {
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    api
      .post("get-guest-job", {
        job_title: jobTitle,
        city: city,

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/find-job-section", { state: { jobs: res.data } });
      });
  }

  return (
    <div className="find-job-api-main-section">
      <div className="find-job-api-find-job-main-section">
        <div className="find-job-first-section">
          <h4>Find a job that suits your interest & skills.</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Necessitatibus eaque suscipit itaque obcaecati quod animi voluptate
            id, excepturi repudiandae. Iure.
          </p>
          <div className="find-job-first-section-form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={"Enter A City"}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                type="text"
                placeholder="Enter Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <button type="submit">Find Job</button>
            </form>
          </div>
        </div>
        <div className="find-job-second-section">
          <img src={guestImage} alt="" />
        </div>
      </div>
      <div className="website-stats-main-container">
        <GetAllJobs/>
        <GetAllJobs/>
        <GetAllJobs/>
        <GetAllJobs/>
      </div>
    </div>
  );
}

export default FindJobApi;
