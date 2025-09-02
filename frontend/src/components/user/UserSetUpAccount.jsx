import React, { useState, useEffect } from "react";
import { api } from "../..";
import "./style/userSetUpAccount.css";

function UserSetUpAccount() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [personalWebsite, setPersonalWebsite] = useState("");
  const [cv, setCv] = useState(null);

  // Get user ID from localStorage
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
      })
      .catch((error) => {
        console.log(error.response?.data);
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
              <label>Full Name:
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              </label>

              <label>Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              </label>
            </div>

            <div className="user-set-up-account-basic-info-text-container-experience-education">
                <label>Experience:
                <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                />
                </label>

                <label>Education:
                <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                />
                </label>

            </div>

            <label>Personal Website:
            <input
              type="url"
              value={personalWebsite}
              onChange={(e) => setPersonalWebsite(e.target.value)}
            />
            </label>
          </div>
        </div>

        <div className="user-set-up-account-cv-container">
          <label>CV:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCv(e.target.files[0])}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserSetUpAccount;
