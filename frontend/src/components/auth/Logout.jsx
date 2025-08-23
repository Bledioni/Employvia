import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(){

    const navigate = useNavigate();

    useEffect(() => {

        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');
        localStorage.removeItem('company_id');
        localStorage.removeItem('company_name');
        navigate('/login');
    } ,[])

}

export default Logout;