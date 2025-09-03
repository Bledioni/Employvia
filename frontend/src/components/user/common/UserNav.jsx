import react, { useState } from "react";
import { api, backend } from "../../../index";
import '../style/userNav.css';

function UserNav(){

    const userId = localStorage.getItem('user_id');
    const [userProfile , setUserProfile] = useState(null);

    api.get(`get-accounts/${userId}` , {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then(res => {

        setUserProfile(res.data.user[0].profile_picture);
    })

    return(
        <div className="user-nav-main-container">
            <div className="user-nav-first-container">
                <h2>EmployVia</h2>
                <input type="text" placeholder="Job title, keyword, company"/>
            </div>
            <img src={`${backend.defaults.baseURL}storage/${userProfile}`} alt="User Profile" />
        </div>
    )

}

export default UserNav;