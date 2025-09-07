import React, { useState } from "react";
import { api } from "../../../index";
import JobsDashboardNav from "./common/JobsDashboardNav";
import JobsDashboardSideBar from "./common/JobsDashboardSideBar";
import JobRoles from "./common/JobRoles.jsx";
import CountryCitySelector from "./common/CountryCitySelector.jsx";
import '../style/postjob.css';
import Footer from "../../../common/Footer.jsx";

function PostJob() {
    const companyId = localStorage.getItem('company_id');

    const [job_title, setJobTitle] = useState('');
    const [tags, setTags] = useState('');
    const [job_role, setJobRole] = useState('');
    const [min_salary, setMinSalary] = useState('');
    const [max_salary, setMaxSalary] = useState('');
    const [salary_type, setSalaryType] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [job_type, setJobType] = useState('');
    const [vacancies, setVacancies] = useState('');
    const [expiration_date, setExpirationDate] = useState('');
    const [job_level, setJobLevel] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [job_description, setJobDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('insertjob', {
            company_id: companyId,
            job_title,
            tags,
            job_role,
            min_salary,
            max_salary,
            salary_type,
            education,
            experience,
            job_type,
            vacancies,
            expiration_date,
            job_level,
            country,
            city,
            job_description,
        })
        .then(res => {
            console.log('Job Inserted Successfully', res.data);
        })
        .catch(error => {
            console.log("Error", error.response?.data || error.message);
        });
    };

    return (
        <div>
            <JobsDashboardNav />
            <div className="post-job-main-container">
                <JobsDashboardSideBar />
                <div className="post-job-form-container">
                    <form onSubmit={handleSubmit}>
                        <h4>Post a Job</h4>

                        <label>
                            Job Title
                            <input 
                                type="text"
                                placeholder="Enter the job title, e.g. Frontend Developer"
                                value={job_title}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                            />
                        </label>

                        <div className="post-job-tags-jobrole-container">
                            <label>
                                Tags
                                <input 
                                    type="text"
                                    placeholder="Enter tags separated by commas, e.g. React, JavaScript"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Job Role
                                <JobRoles 
                                    value={job_role} 
                                    onChange={setJobRole} 
                                />
                            </label>
                        </div>

                        <div className="post-job-salary-container">
                            <h4>Salary</h4>
                            <div className="post-job-salary-input-container">
                                <label>
                                    Minimum Salary
                                    <input 
                                        type="number"
                                        placeholder="Enter minimum salary"
                                        value={min_salary}
                                        onChange={(e) => setMinSalary(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>
                                    Maximum Salary
                                    <input 
                                        type="number"
                                        placeholder="Enter maximum salary"
                                        value={max_salary}
                                        onChange={(e) => setMaxSalary(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>
                                    Salary Type
                                    <select 
                                        value={salary_type} 
                                        onChange={(e) => setSalaryType(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Salary Type</option>
                                        <option value="hourly">Hourly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                        <option value="fixed">Fixed / Contract</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className="post-job-advanced-information-container">
                            <h4>Advanced Information</h4>
                            <div className="post-job-advanced-information-first-container">
                                <label>
                                    Education
                                    <select 
                                        value={education} 
                                        onChange={(e) => setEducation(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Education</option>
                                        <option value="none">No Education Required</option>
                                        <option value="high_school">High School / Secondary</option>
                                        <option value="diploma">Diploma / Certificate</option>
                                        <option value="bachelor">Bachelor's Degree</option>
                                        <option value="master">Master's Degree</option>
                                        <option value="phd">PhD / Doctorate</option>
                                    </select>
                                </label>
                                <label>
                                    Experience
                                    <select 
                                        value={experience} 
                                        onChange={(e) => setExperience(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Experience</option>
                                        <option value="none">No Experience</option>
                                        <option value="less1">Less than 1 Year</option>
                                        <option value="1-2">1 - 2 Years</option>
                                        <option value="3-5">3 - 5 Years</option>
                                        <option value="5plus">5+ Years</option>
                                    </select>
                                </label>
                                <label>
                                    Job Type
                                    <select 
                                        value={job_type} 
                                        onChange={(e) => setJobType(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Job Type</option>
                                        <option value="full_time">Full-Time</option>
                                        <option value="part_time">Part-Time</option>
                                        <option value="freelance">Freelance</option>
                                        <option value="contract">Contract</option>
                                        <option value="internship">Internship</option>
                                        <option value="temporary">Temporary</option>
                                    </select>
                                </label>
                            </div>
                            <div className="post-job-advanced-information-second-container">
                                <label>
                                    Vacancies
                                    <input 
                                        type="number"
                                        placeholder="Enter number of vacancies"
                                        value={vacancies}
                                        onChange={(e) => setVacancies(e.target.value)}
                                        min="1"
                                        required
                                    />
                                </label>
                                <label>
                                    Expiration Date
                                    <input 
                                        type="date"
                                        value={expiration_date}
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>
                                    Job Level
                                    <select 
                                        value={job_level} 
                                        onChange={(e) => setJobLevel(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Job Level</option>
                                        <option value="entry">Entry Level</option>
                                        <option value="junior">Junior</option>
                                        <option value="mid">Mid Level</option>
                                        <option value="senior">Senior</option>
                                        <option value="lead">Lead</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className="post-job-location-container">
                            <h4>Location</h4>
                            <CountryCitySelector 
                                country={country} 
                                setCountry={setCountry} 
                                city={city} 
                                setCity={setCity} 
                            />
                        </div>

                        <label className="job-post-description-container">
                            Description
                            <textarea
                                placeholder="Enter full job description, responsibilities, and requirements"
                                value={job_description}
                                onChange={(e) => setJobDescription(e.target.value)}
                                required
                            />
                        </label>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default PostJob;
