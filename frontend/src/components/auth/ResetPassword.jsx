import React, { useState } from "react";
import axios from "axios";
import { Link  , useNavigate} from "react-router-dom";
import resetpassword from './style/resetpassword.css';

function ResetPassword(){

    const[token , setToken] =useState('');
    const[email , setEmail] =useState('');
    const[password , setPassword] =useState('');
    const[confirmpassword , setConfirmPassword] =useState('');
    const[successMessage, setSuccessMessage] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e){

        e.preventDefault();

        axios.post('/resetpassword' ,{

            token:token,
            email:email,
            password:password,
            password_confirmation:confirmpassword

        })
        .then(response => {

            setSuccessMessage("Password has been successfully changed");

             setTimeout(() => {
        navigate('api/login'); // replace '/login' with your login route
    }, 2000);

        })
        .catch(error => {
            if (error.response?.data) {
                const data = error.response.data;

                // If it has message, show message
                if (data.message) {
                    setErrorMessage(data.message);
                } else {
                    // Fallback: show the whole object as string
                    setErrorMessage(JSON.stringify(data));
                }
            } else {
                setErrorMessage("Error occurred");
            }

            setSuccessMessage(''); // Clear success
        });
        

    }
    return(

        <div className="resetpassword">
            
            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Code"
                    value={token}
                    onChange={(e) => setToken(e.target.value)} 
                />
                <input 
                    type="Email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <button type="submit">Reset Password</button>
            </form>
            {successMessage && <div className="successMessage"><p>{successMessage}</p><p onClick={() =>setSuccessMessage('')} className="x">X</p></div>}
            {errorMessage && <div className="errorMessage"><p>{errorMessage}</p><p onClick={() =>setErrorMessage('')} className="x">X</p></div>}
        </div>


    )

}

export default ResetPassword;