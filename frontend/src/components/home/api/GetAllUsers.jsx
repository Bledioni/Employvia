import React, { useState, useEffect } from "react";
import { api } from "../../..";
import '../style/statsCounter.css';

export default function GetAllJobs() {
  const [counter, setCounter] = useState("");

  useEffect(() => {
    api
      .get("count-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCounter(res.data.total_users);
        
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
          <p>Candidates</p>
        </div>
        <style></style>
    </div>
    

)

}