import axios from "axios";
import React, { useEffect } from "react";

function Logout(){

    useEffect(() => {

        localStorage.removeItem('token');

    } ,[])

}

export default Logout;