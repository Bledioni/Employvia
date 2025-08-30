import React, { useState, useEffect } from "react";
import { api } from "../../../../index";

function JobRoles({ value, onChange }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    api
      .get("/jobroles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRoles(res.data); // assuming API returns an array of roles
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Roles</option>
      {roles.map((role) => (
        <option key={role.role_name} value={role.role_name}>
          {role.role_name}
        </option>
      ))}
    </select>
  );
}

export default JobRoles;
