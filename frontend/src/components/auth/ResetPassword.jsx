import React, { useState } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";

function ResetPassword(){

    const[token , setToken] =useState('');
    const[email , setEmail] =useState('');
    const[password , setPassword] =useState('');
    const[confirmpassword , setConfirmPassword] =useState('');
    const[successMessage, setSuccessMessage] = useState('');
    const[errorMessage, setErrorMessage] = useState('');

    function handleSubmit(e){

        e.preventDefault();

        axios.post('/resetpassword' ,{

            token:token,
            email:email,
            password:password,
            password_confirmation:confirmpassword

        })
        .then(response => {

            setSuccessMessage("Password has been successfully changed ✅");

        })
        .catch(error => {

            if(password !== password_confirmation){

                setErrorMessage("Incorrect Password")

            }

        })
        

    }

    return(

        <div className="forgetpassword">
            
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
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>


    )

}

export default ResetPassword;