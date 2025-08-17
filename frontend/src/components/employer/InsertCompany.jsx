import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InsertCompany() {
    const [step, setStep] = useState(1);
    const [logo, setLogo] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [companyInfo, setCompanyInfo] = useState('');
    const [organizationType, setOrganizationType] = useState('');
    const [industryType, setIndustryType] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [yearOfEstabilshment, setYearOfEstabilshment] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [companyVision, setCompanyVision] = useState('');
    const navigate = useNavigate('');

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        const userId = localStorage.getItem("user_id");

        formData.append('user_id', userId);
        formData.append('company_name', companyName);
        formData.append('company_info', companyInfo);
        formData.append('organization_type', organizationType);
        formData.append('industry_type', industryType);
        formData.append('team_size', teamSize);
        formData.append('year_of_estabilshment', yearOfEstabilshment);
        formData.append('company_website', companyWebsite);
        formData.append('company_vision', companyVision);
        formData.append('logo', logo);


        axios.post('/insertcompany', formData, { 
            headers: { 'Content-Type': 'multipart/form-data',
                        'Authorization' : `Bearer ${localStorage.getItem('token')}`
             },
        })
        .then(response => {
            console.log('Company inserted successfully', response.data);
            alert("Company registered successfully!");

        })
        .catch(error => {
            let message = "Something went wrong.";
            if (error.response && error.response.data) {
                message = error.response.data.message || message;
            }
            console.log("Error", message);

        });
    }

    return (
        <div>
            {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
                    <input 
                        type="text"
                        placeholder="Enter Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="About Us"
                        value={companyInfo}
                        onChange={(e) => setCompanyInfo(e.target.value)} 
                    />
                    <button type="submit">Next</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Organization Type"
                        value={organizationType}
                        onChange={(e) => setOrganizationType(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Industry Types"
                        value={industryType}
                        onChange={(e) => setIndustryType(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Team Size"
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Year of Establishment"
                        value={yearOfEstabilshment}
                        onChange={(e) => setYearOfEstabilshment(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Company Website"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Company Vision"
                        value={companyVision}
                        onChange={(e) => setCompanyVision(e.target.value)} 
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default InsertCompany;
