import React, { useState, useEffect } from "react";
import { api } from "../../..";
import { div } from "framer-motion/client";

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

    <div>
        <h1>{counter}</h1>
    </div>

)

}