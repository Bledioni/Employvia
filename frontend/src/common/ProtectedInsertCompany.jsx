import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InsertCompany from "../components/employer/InsertCompany";

function ProtectedInsertCompany() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/login");
      return;
    }

    axios
      .get(`/check-company/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.hasCompany) {
          navigate("/jobsdashboard");
        } else {
          setShowForm(true);
        }
      })
      .catch((err) => {
        console.error("Error checking company", err);
        navigate("/insertcompany");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (showForm) return <InsertCompany />;

  return null;
}

export default ProtectedInsertCompany;
