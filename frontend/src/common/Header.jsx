import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Logout from "../components/auth/Logout";
import ForgetPassword from "../components/auth/ForgetPassword";
import ResetPassword from "../components/auth/ResetPassword";
import InsertCompany from "../components/employer/InsertCompany";
import ProtectedRoute from "./ProtectedRoute";
import CompanyRegistered from "../components/employer/CompanyRegistered";
import JobsDashboard from '../components/employer/jobs/JobsDashboard';
import ProtectedInsertCompany from "./ProtectedInsertCompany";
import EmployerProfile from "../components/employer/jobs/EmployerProfile";
import PostJob from "../components/employer/jobs/PostJob";
import JobRoles from "../components/employer/jobs/common/JobRoles";
import MyJobs from "../components/employer/jobs/MyJobs";
import UserJobsDashboard from '../components/user/UserJobsDashboard';
import RoleProtectedRoute from "./RoleProtectedRoute";
import JobDetails from "../components/user/JobDetails";


function Header(){

return(
<Router>
    <Routes>
        {/* ---------Authentication Routes--------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        {/* ------------------------------------------ */}

        {/* ----------Employer Routes---------- */}
        <Route path="/insertcompany" element={<ProtectedRoute><ProtectedInsertCompany><InsertCompany /></ProtectedInsertCompany></ProtectedRoute>} />
        <Route path="/jobsdashboard" element={<ProtectedRoute><RoleProtectedRoute requiredRole="employer"><JobsDashboard /></RoleProtectedRoute></ProtectedRoute>} />
        <Route path="/companyregistered" element={<ProtectedRoute><RoleProtectedRoute requiredRole="employer"><CompanyRegistered /></RoleProtectedRoute></ProtectedRoute>} />
        <Route path="/employer-profile" element={<ProtectedRoute><RoleProtectedRoute requiredRole="employer"><EmployerProfile /></RoleProtectedRoute></ProtectedRoute>} />
        <Route path="/post-job" element={<ProtectedRoute><RoleProtectedRoute requiredRole="employer"><PostJob /></RoleProtectedRoute></ProtectedRoute>} />
        <Route path="/jobroles" element={<ProtectedRoute><RoleProtectedRoute requiredRole="employer"><JobRoles /></RoleProtectedRoute></ProtectedRoute>} />
        <Route path="/my-jobs" element={<ProtectedRoute><RoleProtectedRoute requiredRole="employer"><MyJobs /></RoleProtectedRoute></ProtectedRoute>} />

        
        {/* ------------------------------------------ */}
        
        {/* ---------------User Routes--------------- */}
        
        <Route path="/user-jobs" element={<ProtectedRoute><RoleProtectedRoute requiredRole="user"><UserJobsDashboard /></RoleProtectedRoute></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<ProtectedRoute><RoleProtectedRoute requiredRole="user"><JobDetails /></RoleProtectedRoute></ProtectedRoute>} />
        {/* ------------------------------------------ */}

    </Routes>
</Router>
    )

}

export default Header;