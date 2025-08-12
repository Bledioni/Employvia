import axios from "axios";
import React, { useState } from "react";


function Register(){

    const[name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const[confirmPassword , setConfirmPassword] = useState('');

    function handleSubmit(e){

        e.preventDefault();

        axios.post('register' ,{

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
            <form onClick={handleSubmit}>
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