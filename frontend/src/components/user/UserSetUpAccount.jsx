import React, { useState } from "react";
import { api } from "../..";
import "./style/userSetUpAccount.css";

// ✅ Import Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function UserSetUpAccount() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [personalWebsite, setPersonalWebsite] = useState("");
  const [cv, setCv] = useState(null);
  const navigate = useNavigate();

  const uID = localStorage.getItem("user_id");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", uID);
    formData.append("profile_picture", profilePicture);
    formData.append("full_name", fullName);
    formData.append("title", title);
    formData.append("experience", experience);
    formData.append("education", education);
    formData.append("personal_website", personalWebsite);
    formData.append("cv", cv);

    api
      .post("user-set-up", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);

        toast.success("Profile set up successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setProfilePicture(null);
        setFullName("");
        setTitle("");
        setExperience("");
        setEducation("");
        setPersonalWebsite("");
        setCv(null);
        
        navigate('/user-jobs')

      })
      .catch((error) => {
        console.log(error.response?.data);

        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="user-set-up-account-main-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="user-set-up-account-basic-info-container">
          <div className="user-set-up-account-basic-info-image-container">
            <label>Profile Picture:</label>
            <label className="user-set-up-account-basic-info-container-custom-file-upload">
              {profilePicture ? (
                profilePicture.name
              ) : (
                <div className="user-set-up-account-basic-info-container-custom-file-placeholder">
                  <p>
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </p>
                  <p>
                    <strong>Browse photo</strong> or drop here
                  </p>
                  <p>A photo larger than 400 pixels works best. Max 5 MB.</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </label>
          </div>

          <div className="user-set-up-account-basic-info-text-container">
            <div className="user-set-up-account-basic-info-text-container-name-title">
              <label>
                Full Name:
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </label>

              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Software Engineer, Designer"
                />
              </label>
            </div>

            <div className="user-set-up-account-basic-info-text-container-experience-education">
              <label>
                Experience:
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">Select your experience</option>
                  <option value="Intern">Intern</option>
                  <option value="Junior">Junior (0–2 years)</option>
                  <option value="Mid-Level">Mid-Level (2–5 years)</option>
                  <option value="Senior">Senior (5+ years)</option>
                </select>
              </label>

              <label>
                Education:
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                >
                  <option value="">Select your education</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor’s Degree</option>
                  <option value="Master">Master’s Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <div className="user-set-up-account-basic-info-text-container-website">
              <label>
                Personal Website:
                <input
                  type="url"
                  value={personalWebsite}
                  onChange={(e) => setPersonalWebsite(e.target.value)}
                  placeholder="https://yourportfolio.com"
                />
              </label>

              <div className="user-set-up-account-basic-info-text-cv-container">
                <label>
                  CV:
                  <label className="user-set-up-account-basic-info-text-cv-container-custom-file-upload">
                    {cv ? (
                      <span>{cv.name}</span>
                    ) : (
                      <span>
                        <strong>Browse a file</strong> or drop here
                        <br />
                        <small>Accepted: PDF, DOC, DOCX</small>
                      </span>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setCv(e.target.files[0])}
                    />
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default UserSetUpAccount;
