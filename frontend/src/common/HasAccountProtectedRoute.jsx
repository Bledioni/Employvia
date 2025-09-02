import React, { useEffect, useState } from "react";
import { api } from "../index";
import { useNavigate } from "react-router-dom";
import UserSetUpAccount from "../components/user/UserSetUpAccount";
import UserJobsDashboard from "../components/user/UserJobsDashboard";



function HasAccountProtectedRoute() {
  const userId = localStorage.getItem("user_id");
  const [showForm, setShowForm] = useState(false);
  const [showJobsDashboard, setShowJobsDashboard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    api
      .get(`get-accounts/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.hasAccount) {
            navigate('/user-jobs')
          setShowJobsDashboard(true)
        } else {
            navigate('/user-set-up')
          setShowForm(true);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      })
      
  }, [userId, navigate]);

  if (showForm) return <UserSetUpAccount />;
  if (showJobsDashboard) return <UserJobsDashboard />;


  return null;
}

export default HasAccountProtectedRoute;
