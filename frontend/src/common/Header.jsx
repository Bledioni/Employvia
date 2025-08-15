import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Logout from "../components/auth/Logout";
import ForgetPassword from "../components/auth/ForgetPassword";
import ResetPassword from "../components/auth/ResetPassword";

function Header(){

return(
<Router>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
    </Routes>
</Router>
    )

}

export default Header;