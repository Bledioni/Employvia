import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ResetPassword(){

    const[token , setToken] =useState('');
    const[email , setEmail] =useState('');
    const[password , setPassword] =useState('');
    const[confirmpassword , setConfirmPassword] =useState('');

    function handleSubmit(e){

        e.preventDefault();

        axios.post('/resetpassword' ,{

            token:token,
            email:email,
            password:password,
            password_confirmation:confirmpassword

        })
        .then(response => {

            console.log("Password Has benn successfully changed" , response.data);

        })
        .catch(error => {

            console.log("Error" , error.response.data);

        })

    }

    return(

        <div>
            <form onChange={handleSubmit}>
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
                <button type="submit">Submit</button>
            </form>
        </div>

    )

}

export default ResetPassword;