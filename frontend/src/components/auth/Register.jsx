import axios from "axios";
import React, { useState } from "react";
import staffTalking from '../../images/login/staffTalking.png';
import register from '../auth/style/register.css';

function Register(){

    const[role , setRole] = useState('');
    const[name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const[confirmPassword , setConfirmPassword] = useState('');

    function handleSubmit(e){

        e.preventDefault();

        axios.post('/register' ,{

            role:role,
            name:name,
            email:email,
            password:password,
            password_confirmation:confirmPassword,

        })
        .then(response => {

            console.log("Registration Succesfull" , response.data);

        })
        .catch(error => {

            console.log("Error" , error.response.data);

        })

    }

    return(

        <div className="register-form-main-container">
            <div className="register-form">
            <form onSubmit={handleSubmit}>
                    Sign In As
                    <button type="button"
                        onClick={() => setRole("user")}>
                        Candidate
                    </button>
                    <button type="button"
                        onClick={() => setRole("employer")}>Employeer</button>
                <input 
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <button type="submit" >Submit</button>
            </form>
            </div>
            <div className="register-form-image">
                <img src={staffTalking} alt="" />
            </div>
        </div>

    )

}

export default Register;