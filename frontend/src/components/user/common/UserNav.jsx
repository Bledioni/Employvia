import react, { useState } from "react";
import { api, backend } from "../../../index";


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
        <div>
            <h4>EmployVia</h4>
            <img src={`${backend.defaults.baseURL}storage/${userProfile}`} alt="User Profile" />
        </div>
    )

}

export default UserNav;