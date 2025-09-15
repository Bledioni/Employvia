import React, { useState } from "react";
import {api} from "../../../index";
import { useNavigate } from "react-router-dom";

function FindJobApi() {
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    api.post("get-guest-job", {
      job_title: jobTitle,
      city: city,

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      console.log(res.data);
      navigate('/find-job-section', { state: { jobs: res.data } });
    });
  }

  return(
    <div>
         <form onSubmit={handleSubmit}>
            <input 
                        type="text"
                        placeholder="Enter A City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <input 
                        type="text"
                        placeholder="Enter Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />

                    <button type="submit">Submit</button>
        </form>
    </div>
  )

}

export default FindJobApi;