import react, { useState } from "react";
import { api } from "../../../index";
import JobsDashboardNav from "./common/JobsDashboardNav";
import JobsDashboardSideBar from "./common/JobsDashboardSideBar";
import '../style/postjob.css';



function PostJob(){

    const companyId = localStorage.getItem('company_id');

    const [company_id , setCompanyId] = useState('');
    const [job_title , setJobTitle] = useState('');
    const [tags , setTags] = useState('');
    const [job_role , setJobRole] = useState('');
    const [min_salary , setMinSalary] = useState('');
    const [max_salary , setMaxSalary] = useState('');
    const [salary_type , setSalaryType] = useState('');
    const [education , setEducation] = useState('');
    const [experience , setExperience] = useState('');
    const [vacancies , setVacancies] = useState('');
    const [expiration_date , setExpirationDate] = useState('');
    const [job_level , setJobLevel] = useState('');
    const [country , setCountry] = useState('');
    const [city , setCity] = useState('');
    const [job_description , setJobDescription] = useState('');

    function handleSubmit(e){

        e.preventDefault();

        api
        .post('insertjob' , {

            company_id:companyId,
            job_title:job_title,
            tags:tags,
            job_role:job_role,
            min_salary:min_salary,
            max_salary:max_salary,
            salary_type:salary_type,
            education:education,
            experience:experience,
            vacancies:vacancies,
            expiration_date:expiration_date,
            job_level:job_level,
            country:country,
            city:city,
            job_description:job_description,

        })
        .then(res => {

            console.log('Job Inserted Successfully' , res.data);

        })
        .catch(error => {

            console.log("Error" , error.res.data);

        })

    }

    return(


        <div>
            <JobsDashboardNav />
            
            <div className="post-job-main-container">
                <JobsDashboardSideBar />
            <div className="post-job-form-container">
                <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Job Title"
                    value={job_title}
                    onChange={(e) => setJobTitle(e.target.value)} 
                />
                <div className="post-job-tags-jobrole-container">
                    <input 
                        type="text"
                        placeholder="Tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Job Role"
                        value={job_role}
                        onChange={(e) => setJobRole(e.target.value)} 
                    />
                </div>
                <input 
                    type="number"
                    placeholder="Minimum Salary"
                    value={min_salary}
                    onChange={(e) => setMinSalary(e.target.value)} 
                />
                <input 
                    type="number"
                    placeholder="Max Salary"
                    value={max_salary}
                    onChange={(e) => setMaxSalary(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Salary Type"
                    value={salary_type}
                    onChange={(e) => setSalaryType(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)} 
                />
                <input 
                    type="number"
                    placeholder="Vacanies"
                    value={vacancies}
                    onChange={(e) => setVacancies(e.target.value)} 
                />
                <input 
                    type="date"
                    placeholder="Expiration Date"
                    value={expiration_date}
                    onChange={(e) => setExpirationDate(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Job Level"
                    value={job_level}
                    onChange={(e) => setJobLevel(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)} 
                />
                <input 
                    type="text"
                    placeholder="Description"
                    value={job_description}
                    onChange={(e) => setJobDescription(e.target.value)} 
                />
                <button type="Submit">Submit</button>
                
                
            </form>
            </div>
            </div>

        </div>

    )

}

export default PostJob;