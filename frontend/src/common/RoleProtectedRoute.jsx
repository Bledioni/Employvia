  import { Navigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { api } from "../index";

  function RoleProtectedRoute({ children, requiredRole }) {
    const userId = localStorage.getItem("user_id");
    const [role, setRole] = useState(null);

    useEffect(() => {
      if (userId) {
        api
          .get(`get-all-info/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((res) => {
            setRole(res.data.data[0].role);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
      }
    }, [userId]);


    if (role === null) {
  return null;
}

if (role !== requiredRole) {
  if (role === "user") return <Navigate to="/user-jobs" replace />;
  if (role === "employer") return <Navigate to="/jobsdashboard" replace />;
}

return children;
  }

  export default RoleProtectedRoute;