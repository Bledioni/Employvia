import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../index";

function RoleProtectedRoute({ children, requiredRole }) {
  const userId = localStorage.getItem("user_id");
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      api
        .get(`get-all-info/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setRole(res.data.data[0].role);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  if (role !== requiredRole) {
    if (role === "user") return <Navigate to="/user-jobs" replace />;
    if (role === "employer") return <Navigate to="/jobsdashboard" replace />;
    
  }

  return children;
}

export default RoleProtectedRoute;
