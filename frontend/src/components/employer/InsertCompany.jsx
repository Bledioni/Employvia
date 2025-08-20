import React, { useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import "./style/insertcompany.css";

// 🔹 Navigation Component
function CompanyNav({ step }) {
  return (
    <div className="insert-company-nav">
      <h4 className={step === 1 ? "active" : ""}>
        <i className="fa-solid fa-user"></i> Company Info
      </h4>
      <h4 className={step === 2 ? "active" : ""}>
        <i className="fa-solid fa-circle-info"></i> Founding Info
      </h4>
      <h4 className={step === 3 ? "active" : ""}>
        <i className="fa-solid fa-at"></i> Contact
      </h4>
    </div>
  );
}

// 🔹 Step 1
function Step1({ companyData, setCompanyData, nextStep }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
      <label className="custom-file-upload">
        <div className="company-info-image-text-container">
          <p><i className="fa-solid fa-cloud-arrow-up"></i></p>
          <p><strong>Browse photo</strong> or drop here</p>
          <p>A photo larger than 400 pixels works best. Max 5 MB.</p>
        </div>
        <input
          type="file"
          onChange={(e) =>
            setCompanyData({ ...companyData, logo: e.target.files[0] })
          }
        />
      </label>

      <input
        type="text"
        placeholder="Enter Company Name"
        value={companyData.companyName}
        onChange={(e) =>
          setCompanyData({ ...companyData, companyName: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="About Us"
        value={companyData.companyInfo}
        onChange={(e) =>
          setCompanyData({ ...companyData, companyInfo: e.target.value })
        }
        required
      />
      <button type="submit">Save & Next</button>
    </form>
  );
}

// 🔹 Step 2
function Step2({ companyData, setCompanyData, prevStep, nextStep }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
      <input
        type="text"
        placeholder="Organization Type"
        value={companyData.organizationType}
        onChange={(e) =>
          setCompanyData({ ...companyData, organizationType: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Industry Types"
        value={companyData.industryType}
        onChange={(e) =>
          setCompanyData({ ...companyData, industryType: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Team Size"
        value={companyData.teamSize}
        onChange={(e) =>
          setCompanyData({ ...companyData, teamSize: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Year of Establishment"
        value={companyData.yearOfEstablishment}
        onChange={(e) =>
          setCompanyData({ ...companyData, yearOfEstablishment: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Company Website"
        value={companyData.companyWebsite}
        onChange={(e) =>
          setCompanyData({ ...companyData, companyWebsite: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Company Vision"
        value={companyData.companyVision}
        onChange={(e) =>
          setCompanyData({ ...companyData, companyVision: e.target.value })
        }
      />
      <button type="button" onClick={prevStep}>Previous</button>
      <button type="submit">Save & Next</button>
    </form>
  );
}

// 🔹 Step 3
function Step3({ companyData, setCompanyData, prevStep, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Map Location"
        value={companyData.mapLocation}
        onChange={(e) =>
          setCompanyData({ ...companyData, mapLocation: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Phone Number"
        value={companyData.phone}
        onChange={(e) =>
          setCompanyData({ ...companyData, phone: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Set Email"
        value={companyData.email}
        onChange={(e) =>
          setCompanyData({ ...companyData, email: e.target.value })
        }
      />
      <button type="button" onClick={prevStep}>Previous</button>
      <button type="submit">Finish Editing</button>
    </form>
  );
}

// 🔹 Main Component
function InsertCompany() {
  const [step, setStep] = useState(1);
  const [companyData, setCompanyData] = useState({
    logo: null,
    companyName: "",
    companyInfo: "",
    organizationType: "",
    industryType: "",
    teamSize: "",
    yearOfEstablishment: "",
    companyWebsite: "",
    companyVision: "",
    mapLocation: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const userId = localStorage.getItem("user_id");

    formData.append("user_id", userId);
    formData.append("company_name", companyData.companyName);
    formData.append("company_info", companyData.companyInfo);
    formData.append("organization_type", companyData.organizationType);
    formData.append("industry_type", companyData.industryType);
    formData.append("team_size", companyData.teamSize);
    formData.append("year_of_establishment", companyData.yearOfEstablishment);
    formData.append("company_website", companyData.companyWebsite);
    formData.append("company_vision", companyData.companyVision);
    formData.append("map_location", companyData.mapLocation);
    formData.append("phone", companyData.phone);
    formData.append("email", companyData.email);
    formData.append("logo", companyData.logo);

    axios.post("/insertcompany", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log("Company inserted successfully", response.data);
      alert("Company registered successfully!");
      navigate("/dashboard");
    })
    .catch((error) => {
      let message = "Something went wrong.";
      if (error.response && error.response.data) {
        message = error.response.data.message || message;
      }
      console.error("Error", message);
      alert(message);
    });
  };

  return (
    <div>
      <div className="insert-company-headline">
        <h4>EmployVia</h4>
        <div className="insert-company-headline-setup-progress">
          <p>Setup Progress</p>
          <div className="insert-company-headline-setup-progress-1"></div>
        </div>
      </div>

      <CompanyNav step={step} />

      {step === 1 && (
        <Step1
          companyData={companyData}
          setCompanyData={setCompanyData}
          nextStep={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          companyData={companyData}
          setCompanyData={setCompanyData}
          prevStep={() => setStep(1)}
          nextStep={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <Step3
          companyData={companyData}
          setCompanyData={setCompanyData}
          prevStep={() => setStep(2)}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default InsertCompany;
