import axios from "axios";
import React, { useState } from "react";



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

        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Sign In As
                    <button type="button"
                        onClick={() => setRole("user")}>
                        Candidate
                    </button>
                    <button type="button"
                        onClick={() => setRole("employer")}>Employeer</button>
                </div>
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

    )

}

export default Register;