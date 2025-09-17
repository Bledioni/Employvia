import React, { useState, useEffect } from "react";
import { api } from "../../..";
import { div } from "framer-motion/client";
import '../style/statsCounter.css';

export default function GetAllJobs() {
  const [counter, setCounter] = useState("");

  useEffect(() => {
    api
      .get("getalljobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCounter(res.data.total_jobs);
        
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
          <p>Live Jobs</p>
        </div>
        <style></style>
    </div>
    

)

}