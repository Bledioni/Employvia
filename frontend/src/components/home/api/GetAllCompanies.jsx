import React, { useState, useEffect } from "react";
import { api } from "../../..";
import '../style/statsCounter.css';

export default function GetAllJobs() {
  const [counter, setCounter] = useState("");

  useEffect(() => {
    api
      .get("get-companies", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCounter(res.data.total_companies);
        
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, []);

  return(

    <div className="employvia-stats-counters-main-container">
        <p className="employvia-stats-counter-icon"><i class="fa-solid fa-briefcase"></i></p>
        <div className="employvia-stats-counters">
          <p>{counter}</p>
          <p>Companies</p>
        </div>
        <style></style>
    </div>
    

)

}