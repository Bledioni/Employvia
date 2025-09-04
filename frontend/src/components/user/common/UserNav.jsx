import { useEffect, useState } from "react";
import { api, backend } from "../../../index";
import '../style/userNav.css';
import BluredProfileImage from '../../../common/BluredProfileImage';

function UserNav(){

    const userId = localStorage.getItem('user_id');
    const [userProfile , setUserProfile] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(() => {

        api.get(`get-accounts/${userId}` , {

        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then(res => {

        setUserProfile(res.data.user[0].profile_picture);
        setLoading(false);
    })
    .catch(error => {

        console.log(error);

    })

    } , [userId])

    return(
        <div className="user-nav-main-container">
            <div className="user-nav-first-container">
                <h2>EmployVia</h2>
                <input type="text" placeholder="Job title, keyword, company"/>
            </div>
            {loading ? (
                    <BluredProfileImage />

            ) :
            <img src={`${backend.defaults.baseURL}storage/${userProfile}`} alt="User Profile" /> 
            }
        </div>
    )

}

export default UserNav;