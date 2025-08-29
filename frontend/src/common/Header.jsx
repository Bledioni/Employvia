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
        <Route path="/insertcompany" element={<ProtectedInsertCompany><InsertCompany /></ProtectedInsertCompany>} />
        <Route path="/companyregistered" element={<ProtectedRoute><CompanyRegistered /></ProtectedRoute>} />
        <Route path="/jobsdashboard" element={<ProtectedRoute><JobsDashboard /></ProtectedRoute>} />
        <Route path="/employer-profile" element={<ProtectedRoute><EmployerProfile/></ProtectedRoute>} />
        <Route path="/post-job" element={<PostJob/>} />
        {/* ------------------------------------------ */}

    </Routes>
</Router>
    )

}

export default Header;