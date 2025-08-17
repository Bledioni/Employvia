import axios from "axios";
import React, { useEffect } from "react";

function Logout(){

    useEffect(() => {

        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');

    } ,[])

}

export default Logout;